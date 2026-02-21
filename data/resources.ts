import { Resource } from '@/types/resource';

export const resources: Resource[] = [
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
    featured: true,
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
    featured: true,
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
    featured: true,
    external: false
  }
];
