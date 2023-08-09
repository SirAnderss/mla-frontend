import { cleanup, renderHook, act } from '@testing-library/react';
import { useAppHeader } from './useAppHeader';
import { AppContext } from '@/shared/context/AppContext';
import { FetchingStatus } from '@/shared/enums/Fetching';
import * as api from '@/shared/api/apiService';

jest.mock('../../api/apiService');

const mockDispatch = jest.fn();
const initialState = {
  isLoading: FetchingStatus.IDDLE,
  products: [],
  categories: [],
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppContext.Provider value={{ state: initialState, dispatch: mockDispatch }}>
    {children}
  </AppContext.Provider>
);

describe('AppHeader hook', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('should return default values', async () => {
    const { result, unmount } = renderHook(() => useAppHeader());

    const { current } = result;
    const { handleClickQuery, setQuery, query } = current;

    expect(handleClickQuery).toBeInstanceOf(Function);
    expect(setQuery).toBeInstanceOf(Function);
    expect(query).toBe('');

    unmount();
  });

  test('should change query', async () => {
    const { result } = renderHook(() => useAppHeader());

    act(() => {
      result.current.setQuery('test');
    });

    expect(result.current.query).toEqual('test');
  });

  test('should calls the searchItems function when handleClickQuery is called', () => {
    jest
      .spyOn(api, 'getDataFromAPI')
      .mockImplementation(() => Promise.resolve({ items: [], categories: [] }));

    const { result } = renderHook(() => useAppHeader(), { wrapper });

    act(() => {
      result.current.setQuery('test');
      result.current.handleClickQuery();
    });

    expect(mockDispatch).toBeCalledWith({
      payload: FetchingStatus.FETCHING,
      type: 'isLoading',
    });
  });

  test('should calls the searchItems function when handleKeyPress is called', () => {
    jest
      .spyOn(api, 'getDataFromAPI')
      .mockImplementation(() => Promise.resolve({ items: [], categories: [] }));

    const { result } = renderHook(() => useAppHeader(), { wrapper });

    act(() => {
      result.current.setQuery('test');
      result.current.handleKeyPress({ key: 'Enter' } as any);
    });

    expect(mockDispatch).toBeCalledWith({
      payload: FetchingStatus.FETCHING,
      type: 'isLoading',
    });
  });

  test('should set products when api call returns some product', () => {
    const items = [
      { id: 'MLA123', title: 'Product 1' },
      { id: 'MLA223', title: 'Product 2' },
      { id: 'MLA323', title: 'Product 3' },
    ];
    jest.spyOn(api, 'getDataFromAPI').mockImplementation(() =>
      Promise.resolve({
        items,
        categories: [],
      })
    );

    const { result } = renderHook(() => useAppHeader(), { wrapper });

    act(() => {
      result.current.setQuery('test');
      result.current.handleClickQuery();
    });

    expect(mockDispatch).toBeCalled();
  });

  test('should set categories when api call returns some category', () => {
    const categories = ['Category 1', 'Category 2', 'Category 3'];

    jest.spyOn(api, 'getDataFromAPI').mockImplementation(() =>
      Promise.resolve({
        items: [],
        categories,
      })
    );

    const { result } = renderHook(() => useAppHeader(), { wrapper });

    act(() => {
      result.current.setQuery('test');
      result.current.handleClickQuery();
    });

    expect(mockDispatch).toBeCalled();
  });

  test('should dispatch error if api call throw', async () => {
    jest
      .spyOn(api, 'getDataFromAPI')
      .mockImplementation(() => Promise.reject(new Error('Error')));

    const { result } = renderHook(() => useAppHeader(), { wrapper });

    await act(async () => {
      result.current.setQuery('test');
      result.current.handleClickQuery();
    });

    expect(mockDispatch).toBeCalled();
  });
});
