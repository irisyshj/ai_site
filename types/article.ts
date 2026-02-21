export interface ArticleFrontmatter {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  category: 'tutorial' | 'opinion' | 'guide' | 'news';
  draft: boolean;
  featured: boolean;
  coverImage?: string;
  readingTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
