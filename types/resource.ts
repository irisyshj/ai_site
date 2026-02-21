export type ResourceType = 'article' | 'video' | 'pdf' | 'podcast' | 'tool';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  coverImage?: string;
  tags: string[];
  datePublished: string;
  dateAdded: string;
  readingTime?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
  external?: boolean;
}

export interface ResourceFilter {
  type?: ResourceType | 'all';
  tag?: string;
  difficulty?: string;
  search?: string;
}
