import { cleanup, renderHook } from '@testing-library/react';
import { useProductDetail } from './useProductDetail';
import { useWindowSize } from '@/shared/hooks/useWindowSize';

jest.mock('../../hooks/useWindowSize');
const mockUseWindowSize = useWindowSize as jest.MockedFunction<
  typeof useWindowSize
>;

const mockProps = {
  itemCondition: 'new',
  itemPrice: {
    currency: 'ARS',
    amount: 1200,
    decimals: 0,
  },
};

describe('useProductDetail', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('returns base values', () => {
    mockUseWindowSize.mockReturnValue({ width: 0, height: 0 });
    const { result } = renderHook(() => useProductDetail(mockProps));

    expect(result.current.condition).toEqual('Nuevo');
    expect(result.current.price).toEqual('$ 1.200');
    expect(result.current.isDesktop).toEqual(false);
  });

  test('returns correct condition', () => {
    const spy = mockUseWindowSize.mockReturnValue({ width: 0, height: 0 });
    const { result } = renderHook(() =>
      useProductDetail({ ...mockProps, itemCondition: 'used' })
    );

    expect(result.current.condition).toEqual('Usado');

    spy.mockRestore();
  });

  test('returns isDesktop if when width screen is upper to 768 px', () => {
    mockUseWindowSize.mockReturnValue({ width: 1280, height: 0 });
    const { result } = renderHook(() => useProductDetail(mockProps));

    expect(result.current.isDesktop).toEqual(true);
  });

  test('should call window.open', () => {
    const { result } = renderHook(() => useProductDetail(mockProps));

    global.open = jest.fn();

    result.current.handleClick();

    expect(global.open).toHaveBeenCalledWith(
      'https://www.mercadolibre.com/',
      '_blank'
    );
  });
});
