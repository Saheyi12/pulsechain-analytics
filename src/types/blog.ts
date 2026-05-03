export type BlogCategory = 
  | 'MARKET_ANALYSIS' 
  | 'TECHNICAL_ANALYSIS' 
  | 'DEFI' 
  | 'NFT' 
  | 'TUTORIAL' 
  | 'NEWS' 
  | 'PREDICTION';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  category: BlogCategory;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
  publishedAt: string | null;
  authorId: string;
  authorName?: string;
  viewCount: number;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  author?: string;
}

export interface GenerateBlogInput {
  category?: BlogCategory;
  coinId?: string;
  publishImmediately?: boolean;
}

export interface BlogContent {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  readingTime: number;
  generatedAt: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}