export type SortOrder = 'asc' | 'desc';

export interface AppSort {
  key: string;
  orderBy: string;
  value: string;
  displayName: string;
  name?: string;
}
