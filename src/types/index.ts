export * from './coin';
export * from './prediction';
export * from './alert';
export * from './portfolio';
export * from './affiliate';
export * from './blog';
export * from './user';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
  icon?: string;
}

export type Theme = 'dark' | 'light';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';
export type SortDirection = 'asc' | 'desc';
export type ViewMode = 'grid' | 'list' | 'table';