import { useCallback, useContext, useState } from 'react';

import { AppContext } from '@/shared/context/AppContext';
import { actionTypes } from '@/shared/context/AppReducer';
import { FetchingStatus } from '@/shared/enums/Fetching';
import { getDataFromAPI } from '@/shared/api/apiService';
import { IQuery } from '@/shared/types/types';

export function useAppHeader() {
  const [query, setQuery] = useState('');
  const { dispatch } = useContext(AppContext);

  const searchItems = useCallback(
    async (searchQuery: string) => {
      dispatch({
        type: actionTypes.isLoading,
        payload: FetchingStatus.FETCHING,
      });

      try {
        const data = await getDataFromAPI<IQuery>({
          url: `http://localhost:3000/api/items?q=${searchQuery}`,
        });

        if (data.items.length) {
          dispatch({
            type: actionTypes.products,
            payload: data.items,
          });
        }

        if (data.categories.length) {
          dispatch({
            type: actionTypes.categories,
            payload: data.categories,
          });
        }
      } catch (err) {
        dispatch({
          type: actionTypes.isLoading,
          payload: FetchingStatus.ERROR,
        });
      } finally {
        dispatch({
          type: actionTypes.isLoading,
          payload: FetchingStatus.IDDLE,
        });
      }
    },
    [dispatch]
  );

  const handleClickQuery = () => {
    searchItems(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchItems(query);
    }
  };

  return { query, setQuery, handleClickQuery, handleKeyPress };
}
