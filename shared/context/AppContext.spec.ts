import { useContext } from 'react';
import { AppContext } from './AppContext';
import { act, renderHook } from '@testing-library/react';
import { FetchingStatus } from '../enums/Fetching';

describe('App Context', () => {
  test('should return state and dispatcher', () => {
    const { result } = renderHook(() => useContext(AppContext));

    expect(result.current.state).toEqual({
      products: [],
      categories: [],
      isLoading: FetchingStatus.IDDLE,
    });
    expect(result.current.dispatch).toBeInstanceOf(Function);
  });

  test('should dispatch action from app context', async () => {
    const { result } = renderHook(() => useContext(AppContext));

    await act(async () => {
      result.current.dispatch({ type: 'TEST_ACTION', payload: 'test' });
    });

    expect(result.current.state).toEqual({
      products: [],
      categories: [],
      isLoading: FetchingStatus.IDDLE,
    });
  });
});
