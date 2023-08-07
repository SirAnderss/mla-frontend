import {
  RenderHookResult,
  act,
  cleanup,
  renderHook,
} from '@testing-library/react';
import { useWindowSize } from './useWindowSize';

type HookResult = RenderHookResult<
  {
    width: number | undefined;
    height: number | undefined;
  },
  undefined
>;

describe('useWindowSize Hook', () => {
  let hook: HookResult | undefined;

  afterEach(() => {
    cleanup();
    hook = undefined;
  });

  test('should return width and height', async () => {
    await act(async () => {
      hook = renderHook(() => useWindowSize());
    });

    const { result, unmount } = hook as HookResult;

    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);

    unmount();
  });

  test('should return width and height for a large screen', async () => {
    jest.spyOn(document.body, 'getBoundingClientRect').mockReturnValue({
      width: 1024,
      height: 768,
    } as DOMRect);

    await act(async () => {
      hook = renderHook(() => useWindowSize());
    });

    const { result, unmount } = hook as HookResult;

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);

    unmount();
  });
});
