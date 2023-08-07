import {
  RenderHookResult,
  cleanup,
  renderHook,
  act,
} from '@testing-library/react';

import { useWindowSize } from '@/shared/hooks/useWindowSize';
import { useAppLogo } from './useAppLogo';

jest.mock('../../hooks/useWindowSize');

type HookResult = RenderHookResult<
  {
    src: string;
    alt: string;
    width: number;
    height: number;
    isLoading: boolean;
  },
  {}
>;

const mockUseWindowSize = useWindowSize as jest.MockedFunction<
  typeof useWindowSize
>;

describe('AppLogo Hook', () => {
  let hook: HookResult | undefined;

  afterEach(() => {
    cleanup();
    hook = undefined;
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('should return default values', async () => {
    const spy = mockUseWindowSize.mockReturnValue({
      width: undefined,
      height: undefined,
    });

    await act(async () => {
      hook = renderHook(() => useAppLogo());
    });

    const { result, unmount } = hook as HookResult;

    expect(result.current).toEqual({
      src: '/assets/logo__small.png',
      alt: 'Mercado Libre',
      width: 44,
      height: 32,
      isLoading: true,
    });

    spy.mockRestore();
    unmount();
  });

  test('should return default loading false when exists width and height', async () => {
    const spy = mockUseWindowSize.mockReturnValue({ width: 0, height: 0 });

    await act(async () => {
      hook = renderHook(() => useAppLogo());
    });

    const { result, unmount } = hook as HookResult;

    expect(result.current).toEqual({
      src: '/assets/logo__small.png',
      alt: 'Mercado Libre',
      width: 44,
      height: 32,
      isLoading: false,
    });

    spy.mockRestore();
    unmount();
  });

  test('should return props fr large screens', async () => {
    const spy = mockUseWindowSize.mockReturnValue({ width: 1280, height: 768 });

    await act(async () => {
      hook = renderHook(() => useAppLogo());
    });

    const { result, unmount } = hook as HookResult;

    expect(result.current).toEqual({
      src: '/assets/logo__large.png',
      alt: 'Mercado Libre',
      width: 114,
      height: 32,
      isLoading: false,
    });

    spy.mockRestore();
    unmount();
  });
});
