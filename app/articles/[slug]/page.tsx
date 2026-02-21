import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import fs from 'fs';
import path from 'path';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { slug: 'claude-agent-team-guide' }
  ];
}

async function getArticleContent(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'articles', `${slug}.md`);
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const articles: Record<string, { title: string; description: string }> = {
    'claude-agent-team-guide': {
      title: '10分钟弄懂Claude Agent Team实战指南',
      description: '深入了解Claude Code的Agent Teams功能：三种工作模式对比、TMUX分屏配置、Token成本控制、Skills流程固化等实战技巧。'
    }
  };

  const article = articles[params.slug] || {
    title: 'Article',
    description: 'AI Literacy Coach Article'
  };

  return {
    title: `${article.title} | AI Literacy Coach`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const content = await getArticleContent(params.slug);

  // Simple frontmatter and content extraction
  const lines = content.split('\n');
  let title = 'Article';
  let description = '';
  let bodyContent = content;
  let frontmatterEnd = 0;

  // Extract frontmatter if exists
  if (lines[0].startsWith('---')) {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].startsWith('---')) {
        frontmatterEnd = i + 1;
        break;
      }
      if (lines[i].startsWith('title:')) {
        title = lines[i].match(/title:\s*["']?([^"']+)["']?/)?.[1] || title;
      }
      if (lines[i].startsWith('description:')) {
        description = lines[i].match(/description:\s*["']([^"']+)["']/)?.[1] || '';
      }
    }
    bodyContent = lines.slice(frontmatterEnd).join('\n');
  }

  // Process markdown content - convert to HTML-like structure
  const processedContent = bodyContent
    // Handle headings
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-8 mb-4">$1</h1>')
    // Handle bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Handle italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Handle links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Handle images - convert Obsidian-style and regular markdown images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
      // Check if it's a data URI (invalid SVG placeholder)
      if (src.startsWith('data:')) {
        return `<img src="/images/placeholder.png" alt="${alt}" class="rounded-lg my-4 max-w-full h-auto" />`;
      }
      // Convert Obsidian-style paths
      const cleanSrc = src.replace(/^.*\\(Pasted image.+)$/, '/images/$1');
      return `<img src="${cleanSrc}" alt="${alt}" class="rounded-lg my-4 max-w-full h-auto" />`;
    })
    // Handle blockquotes
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">$1</blockquote>')
    // Handle code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code>$2</code></pre>')
    // Handle inline code
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    // Handle horizontal rules
    .replace(/^---$/gim, '<hr class="my-8 border-border" />')
    // Handle line breaks and paragraphs
    .split('\n\n')
    .map(para => {
      if (para.startsWith('<h') || para.startsWith('<blockquote') || para.startsWith('<pre') || para.startsWith('<hr') || para.startsWith('<img')) {
        return para;
      }
      if (para.trim()) {
        return `<p class="my-4 leading-7">${para.replace(/\n/g, '<br />')}</p>`;
      }
      return '';
    })
    .join('\n');

  return (
    <main className="min-h-screen">
      <article>
        {/* Header */}
        <div className="bg-muted/50 border-b border-border">
          <Container>
            <div className="py-8">
              <Link
                href="/resources"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {title}
              </h1>

              {description && (
                <p className="text-xl text-muted-foreground mb-6">
                  {description}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>February 18, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>15 min read</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Content */}
        <Container>
          <div
            className="prose prose-lg max-w-none py-12"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </Container>
      </article>
    </main>
  );
}
