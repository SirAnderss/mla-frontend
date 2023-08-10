import { cleanup, renderHook, act } from '@testing-library/react';
import { useAppHeader } from './useAppHeader';
import { useRouter } from 'next/navigation';

jest.mock('../../api/apiService');
jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

const push = jest.fn();

describe('AppHeader hook', () => {
  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      push,
      prefetch: jest.fn(),
    }));
  });

  afterEach(cleanup);

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

  test('should call push', async () => {
    const { result } = renderHook(() => useAppHeader());

    act(() => {
      result.current.handleClickQuery();
    });

    expect(push).toBeCalledWith('/items?q=');
  });

  test('calls searchItems when handleClickQuery is called', async () => {
    const { result } = renderHook(() => useAppHeader());

    act(() => {
      result.current.setQuery('test');
    });

    act(() => {
      result.current.handleClickQuery();
    });

    expect(push).toBeCalledWith('/items?q=test');
  });

  test('calls searchItems when handleKeyPress is called with Enter key', async () => {
    const { result } = renderHook(() => useAppHeader());

    act(() => {
      result.current.setQuery('test');
    });

    act(() => {
      result.current.handleKeyPress({
        key: 'Enter',
      } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(push).toBeCalledWith('/items?q=test');
  });
});
