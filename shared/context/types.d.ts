import { IFetchingStatus, IProductItem } from '@/shared/types/types';

type ContextState = {
  products: IProductItem[];
  categories: string[];
  isLoading: IFetchingStatus;
};

type ActionType = {
  payload: unknown;
  type: string;
};

export type { ContextState, ActionType };
