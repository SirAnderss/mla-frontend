'use client';

import { useMemo, useReducer } from 'react';
import { reducer } from './AppReducer';
import { AppContext, initialState } from './AppContext';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContextProvider };
