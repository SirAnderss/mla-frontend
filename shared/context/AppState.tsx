'use client';

import { useReducer } from 'react';
import { reducer } from './AppReducer';
import { AppContext, initialState } from './AppContext';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };
