import { Resource } from '@/types/resource';

export const resources: Resource[] = [
  {
    id: 'claude-agent-team-guide',
    title: '10分钟弄懂Claude Agent Team实战指南',
    description: '深入了解Claude Code的Agent Teams功能：三种工作模式对比、TMUX分屏配置、Token成本控制、Skills流程固化等实战技巧。',
    type: 'article',
    url: '/articles/claude-agent-team-guide',
    tags: ['claude', 'agent-team', 'ai-development', 'tutorial'],
    datePublished: '2025-02-18',
    dateAdded: '2025-02-21',
    readingTime: 15,
    difficulty: 'intermediate',
    featured: true,
    external: false
  },
  {
    id: 'getting-started-with-chatgpt',
    title: 'Getting Started with ChatGPT',
    description: 'A comprehensive guide for beginners to effectively use ChatGPT for productivity and learning.',
    type: 'article',
    url: '/articles/getting-started-with-chatgpt',
    tags: ['llm', 'chatgpt', 'basics'],
    datePublished: '2024-01-15',
    dateAdded: '2024-01-20',
    readingTime: 8,
    difficulty: 'beginner',
    featured: false,
    external: false
  },
  {
    id: 'prompt-engineering-video',
    title: 'Advanced Prompt Engineering Techniques',
    description: 'Video tutorial covering advanced prompting strategies for better AI outputs.',
    type: 'video',
    url: 'https://youtube.com/watch?v=xxx',
    tags: ['prompting', 'advanced'],
    datePublished: '2024-02-01',
    dateAdded: '2024-02-05',
    readingTime: 15,
    difficulty: 'advanced',
    featured: false,
    external: true
  },
  {
    id: 'ai-literacy-guide',
    title: 'AI Literacy Guide for Professionals',
    description: 'PDF guide covering essential AI concepts for modern professionals.',
    type: 'pdf',
    url: '/assets/pdfs/ai-literacy-guide.pdf',
    tags: ['ai', 'literacy', 'guide'],
    datePublished: '2024-01-20',
    dateAdded: '2024-01-25',
    readingTime: 20,
    difficulty: 'intermediate',
    featured: false,
    external: false
  }
];
