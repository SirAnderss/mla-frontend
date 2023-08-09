'use client';

import { IFetchingStatus, IProductItem } from '@/shared/types/types';
import { ActionType, ContextState } from './types';

const actionTypes = {
  products: 'products',
  categories: 'categories',
  isLoading: 'isLoading',
};

function reducer(state: ContextState, action: ActionType): ContextState {
  if (!state || !action) {
    throw new Error('Reducer params has not been provided');
  }

  const { type, payload } = action;

  switch (type) {
    case actionTypes.products:
      return {
        ...state,
        products: payload as IProductItem[],
      };

    case actionTypes.isLoading:
      return {
        ...state,
        isLoading: payload as IFetchingStatus,
      };

    case actionTypes.categories:
      return {
        ...state,
        categories: payload as string[],
      };

    default:
      return state;
  }
}

export { actionTypes, reducer };
