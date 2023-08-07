import { IProductItem } from '@/shared/types/types';

type ContextState = {
  products: IProductItem[];
  isLoading: boolean;
};

type ActionType = {
  payload: unknown;
  type: string;
};

export type { ContextState, ActionType };
