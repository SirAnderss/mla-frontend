'use client';

import { createContext, Dispatch } from 'react';
import { ActionType, ContextState } from './types';

const initialState: ContextState = {
  products: [],
  isLoading: false,
};

const AppContext = createContext<{
  state: ContextState;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export { AppContext, initialState };
