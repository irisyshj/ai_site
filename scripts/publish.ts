#!/usr/bin/env node
/**
 * Content Publishing Script
 *
 * This script automates the content publishing workflow:
 * 1. Checks git status for uncommitted changes
 * 2. Validates content files
 * 3. Prompts for commit message
 * 4. Commits and pushes changes
 * 5. Provides deployment status
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// Logging utilities
const log = {
  info: (message: string) => console.log(`${colors.blue}${message}${colors.reset}`),
  success: (message: string) => console.log(`${colors.green}${message}${colors.reset}`),
  warning: (message: string) => console.log(`${colors.yellow}${message}${colors.reset}`),
  error: (message: string) => console.log(`${colors.red}${message}${colors.reset}`),
  header: (message: string) => console.log(`\n${colors.bright}${colors.cyan}${message}${colors.reset}\n`),
};

// CLI prompt utility
function prompt(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${question}${colors.reset} `, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Execute command and return output
function exec(command: string, options?: { silent?: boolean }): string {
  try {
    const output = execSync(command, {
      encoding: 'utf-8',
      stdio: options?.silent ? 'pipe' : 'inherit',
    });
    return output;
  } catch (error) {
    if (options?.silent) {
      throw error;
    }
    throw error;
  }
}

// Check if git is initialized
function checkGitInitialized(): boolean {
  try {
    exec('git rev-parse --git-dir 2>/dev/null', { silent: true });
    return true;
  } catch {
    return false;
  }
}

// Get git status
function getGitStatus(): {
  hasChanges: boolean;
  staged: string[];
  unstaged: string[];
  untracked: string[];
} {
  try {
    const statusOutput = exec('git status --porcelain', { silent: true });
    const lines = statusOutput.trim().split('\n').filter(Boolean);

    const staged: string[] = [];
    const unstaged: string[] = [];
    const untracked: string[] = [];

    for (const line of lines) {
      const statusCode = line.slice(0, 2);
      const filePath = line.slice(3);

      if (statusCode === '??') {
        untracked.push(filePath);
      } else if (statusCode.startsWith(' ') || statusCode[1] === 'M') {
        unstaged.push(filePath);
      } else {
        staged.push(filePath);
      }
    }

    return {
      hasChanges: lines.length > 0,
      staged,
      unstaged,
      untracked,
    };
  } catch {
    return {
      hasChanges: false,
      staged: [],
      unstaged: [],
      untracked: [],
    };
  }
}

// Validate article frontmatter
function validateArticle(filePath: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!filePath.endsWith('.md') && !filePath.endsWith('.mdx')) {
    return { valid: true, errors: [] };
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);

    if (!frontmatterMatch) {
      errors.push(`Missing frontmatter in ${filePath}`);
      return { valid: false, errors };
    }

    const frontmatter = frontmatterMatch[1];
    const requiredFields = ['title', 'slug', 'date', 'description'];

    for (const field of requiredFields) {
      if (!frontmatter.includes(`${field}:`)) {
        errors.push(`Missing required field: ${field} in ${filePath}`);
      }
    }

    // Check for draft articles
    if (frontmatter.includes('draft: true')) {
      errors.push(`Article is still marked as draft: ${filePath}`);
    }

    return { valid: errors.length === 0, errors };
  } catch {
    errors.push(`Could not read file: ${filePath}`);
    return { valid: false, errors };
  }
}

// Stage all content changes
function stageContentChanges(): void {
  log.info('Staging content changes...');
  try {
    exec('git add content/');
    log.success('Content changes staged successfully.');
  } catch {
    log.error('Failed to stage content changes.');
    throw new Error('Git add failed');
  }
}

// Stage all changes
function stageAllChanges(): void {
  log.info('Staging all changes...');
  try {
    exec('git add -A');
    log.success('All changes staged successfully.');
  } catch {
    log.error('Failed to stage changes.');
    throw new Error('Git add failed');
  }
}

// Create commit
function createCommit(message: string): void {
  log.info('Creating commit...');
  try {
    exec(`git commit -m "$(cat <<'EOF'
${message}
EOF
)"`);
    log.success('Commit created successfully.');
  } catch {
    log.error('Failed to create commit.');
    throw new Error('Git commit failed');
  }
}

// Push changes
function pushChanges(branch?: string): void {
  log.info('Pushing changes to remote...');
  try {
    const currentBranch = branch || exec('git rev-parse --abbrev-ref HEAD', { silent: true }).trim();
    exec(`git push origin ${currentBranch}`);
    log.success(`Changes pushed to origin/${currentBranch}.`);
  } catch {
    log.error('Failed to push changes.');
    throw new Error('Git push failed');
  }
}

// Get current branch
function getCurrentBranch(): string {
  try {
    return exec('git rev-parse --abbrev-ref HEAD', { silent: true }).trim();
  } catch {
    return 'main';
  }
}

// Check if Vercel is configured
function checkVercelConfigured(): boolean {
  try {
    exec('vercel --version 2>/dev/null', { silent: true });
    return true;
  } catch {
    return false;
  }
}

// Main publishing workflow
async function publish() {
  log.header('Content Publishing Workflow');

  // Check if git is initialized
  if (!checkGitInitialized()) {
    log.error('Git is not initialized in this directory.');
    log.info('Run: git init');
    process.exit(1);
  }

  // Get current branch
  const currentBranch = getCurrentBranch();
  log.info(`Current branch: ${colors.bright}${currentBranch}${colors.reset}`);

  // Check git status
  log.info('Checking git status...');
  const status = getGitStatus();

  if (!status.hasChanges) {
    log.warning('No changes detected. Nothing to publish.');
    process.exit(0);
  }

  // Display changes
  if (status.staged.length > 0) {
    log.info('Staged changes:');
    status.staged.forEach((file) => console.log(`  ${colors.green}✓${colors.reset} ${file}`));
  }

  if (status.unstaged.length > 0) {
    log.info('Modified but unstaged files:');
    status.unstaged.forEach((file) => console.log(`  ${colors.yellow}~${colors.reset} ${file}`));
  }

  if (status.untracked.length > 0) {
    log.info('Untracked files:');
    status.untracked.forEach((file) => console.log(`  ${colors.cyan}?${colors.reset} ${file}`));
  }

  // Validate content files
  const contentFiles = [...status.staged, ...status.unstaged, ...status.untracked].filter(
    (f) => f.startsWith('content/') && (f.endsWith('.md') || f.endsWith('.mdx'))
  );

  if (contentFiles.length > 0) {
    log.info('Validating content files...');
    let hasErrors = false;

    for (const file of contentFiles) {
      const validation = validateArticle(file);
      if (!validation.valid) {
        hasErrors = true;
        log.error(`\nErrors in ${file}:`);
        validation.errors.forEach((error) => console.log(`  - ${error}`));
      }
    }

    if (hasErrors) {
      log.warning('\nSome content files have validation errors.');
      const continueAnyway = await prompt('Continue anyway? (y/N):');
      if (continueAnyway.toLowerCase() !== 'y') {
        log.info('Publishing cancelled.');
        process.exit(0);
      }
    } else {
      log.success('All content files validated successfully.');
    }
  }

  // Prompt for staging
  console.log('');
  const stageChoice = await prompt('Stage changes? (content only / all / none):');

  if (stageChoice.toLowerCase() === 'content') {
    stageContentChanges();
  } else if (stageChoice.toLowerCase() === 'all') {
    stageAllChanges();
  } else {
    log.info('Skipping staging.');
  }

  // Prompt for commit message
  console.log('');
  let commitMessage = await prompt('Enter commit message:');

  if (!commitMessage) {
    commitMessage = 'docs: update content';
    log.warning(`Using default commit message: "${commitMessage}"`);
  }

  // Create commit
  console.log('');
  const confirmCommit = await prompt('Create commit and push? (Y/n):');

  if (confirmCommit.toLowerCase() === 'n') {
    log.info('Publishing cancelled.');
    process.exit(0);
  }

  createCommit(commitMessage);

  // Push changes
  console.log('');
  const confirmPush = await prompt('Push to remote? (Y/n):');

  if (confirmPush.toLowerCase() === 'n') {
    log.success('Changes committed locally. Push manually when ready.');
    process.exit(0);
  }

  pushChanges(currentBranch);

  // Vercel deployment info
  console.log('');
  log.header('Deployment Information');

  if (checkVercelConfigured()) {
    log.success('Vercel CLI detected.');
    log.info('Your changes will be automatically deployed.');
    log.info('Check deployment status at: https://vercel.com/dashboard');

    console.log('');
    const deployNow = await prompt('Trigger deployment now? (y/N):');

    if (deployNow.toLowerCase() === 'y') {
      try {
        log.info('Triggering Vercel deployment...');
        exec('vercel --prod');
        log.success('Deployment triggered successfully.');
      } catch {
        log.warning('Could not trigger deployment. It may deploy automatically.');
      }
    }
  } else {
    log.info('Vercel CLI not detected.');
    log.info('If using Vercel with GitHub integration, deployment will start automatically.');
    log.info('Check your Vercel dashboard for deployment status.');
  }

  // Summary
  console.log('');
  log.header('Publishing Complete!');
  log.success(`Branch: ${currentBranch}`);
  log.success(`Commit: ${commitMessage}`);
  log.info('Monitor deployment status in your Vercel dashboard.');
}

// Run the script
publish().catch((error) => {
  log.error(`Publishing failed: ${error.message}`);
  process.exit(1);
});
