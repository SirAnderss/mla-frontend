'use client';

import { createContext, Dispatch } from 'react';
import { ActionType, ContextState } from './types';
import { FetchingStatus } from '../enums/Fetching';

const initialState: ContextState = {
  products: [],
  categories: [],
  isLoading: FetchingStatus.IDDLE,
};

const AppContext = createContext<{
  state: ContextState;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export { AppContext, initialState };
