import {
  RenderHookResult,
  cleanup,
  renderHook,
  act,
} from '@testing-library/react';

import { useInputField } from './useInputField';
import { UseInputFieldProps } from './types';

const hookResult = {
  handleInputChange: jest.fn(),
  hanldeIconClick: jest.fn(),
};

const hookProps: UseInputFieldProps = {
  iconClick: jest.fn(),
  setValue: jest.fn(),
  value: 'test',
};

type InputFieldResult = typeof hookResult;

type HookResult = RenderHookResult<InputFieldResult, UseInputFieldProps>;

describe('InputField Hook', () => {
  let hook: HookResult | undefined;

  afterEach(() => {
    cleanup();
    hook = undefined;
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('should return default values', async () => {
    await act(async () => {
      // @ts-ignore
      hook = renderHook(() => useInputField(hookProps));
    });

    const { result, unmount } = hook as HookResult;

    expect(result.current.handleInputChange).toBeInstanceOf(Function);
    expect(result.current.hanldeIconClick).toBeInstanceOf(Function);

    unmount();
  });

  test('should act setValue function', async () => {
    await act(async () => {
      // @ts-ignore
      hook = renderHook(() => useInputField(hookProps));
    });

    const { result, unmount } = hook as HookResult;
    const { current } = result;
    const { handleInputChange } = current;
    const event = {
      target: {
        value: 'test',
      },
    };

    handleInputChange(event);

    expect(hookProps.setValue).toBeCalledWith('test');

    unmount();
  });

  test('should act iconClick function', async () => {
    await act(async () => {
      // @ts-ignore
      hook = renderHook(() => useInputField({ ...hookProps, value: 'test' }));
    });

    const { result, unmount } = hook as HookResult;
    const { current } = result;
    const { hanldeIconClick } = current;

    hanldeIconClick();

    expect(hookProps.iconClick).toBeCalledWith('test');

    unmount();
  });
});
