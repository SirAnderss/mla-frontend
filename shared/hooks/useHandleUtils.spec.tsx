import { cleanup, renderHook } from '@testing-library/react';
import { useHandleUtils } from './useHandleUtils';

const categories = ['Category 1', 'Category 2', 'Category 3'];
const mockProducts = [
  {
    id: 'MLA123',
    title: 'Product 1',
    price: {
      currency: 'ARS',
      amount: 1200,
      decimals: 0,
    },
    picture: 'https://http2.mlstatic.com/D_728833-MLA45774482741_052021-I.jpg',
    condition: 'new',
    free_shipping: true,
  },
  {
    id: 'MLA456',
    title: 'Product 2',
    price: {
      currency: 'ARS',
      amount: 1500,
      decimals: 0,
    },
    picture: 'https://http2.mlstatic.com/D_728833-MLA45774482741_052021-I.jpg',
    condition: 'new',
    free_shipping: false,
  },
  {
    id: 'MLA789',
    title: 'Product 3',
    price: {
      currency: 'ARS',
      amount: 2000,
      decimals: 0,
    },
    picture: 'https://http2.mlstatic.com/D_728833-MLA45774482741_052021-I.jpg',
    condition: 'used',
    free_shipping: true,
  },
];

describe('useHandleUtils', () => {
  afterEach(cleanup);

  test('returns base values', () => {
    const { result } = renderHook(() => useHandleUtils({}));

    expect(result.current.breadcrumbs).toHaveLength(0);
    expect(result.current.price).toEqual('');
    expect(result.current.condition).toEqual('Usado');
  });

  test('returns the correct breadcrumbs', () => {
    const { result } = renderHook(() => useHandleUtils({ categories }));

    expect(result.current.breadcrumbs).toHaveLength(3);
    expect(result.current.breadcrumbs[0].props).toEqual({
      text: 'Category 1',
      isMiddle: true,
    });
    expect(result.current.breadcrumbs[1].props).toEqual({
      text: 'Category 2',
      isMiddle: true,
    });
    expect(result.current.breadcrumbs[2].props).toEqual({
      text: 'Category 3',
      isMiddle: false,
    });
  });

  test('returns fomated price', () => {
    const { result } = renderHook(() =>
      useHandleUtils({
        productPrice: {
          currency: 'ARS',
          amount: 1200,
          decimals: 0,
        },
      })
    );

    expect(result.current.price).toEqual('$ 1.200');
  });

  test('returns fomated condition', () => {
    const { result } = renderHook(() =>
      useHandleUtils({ productCondition: 'new' })
    );

    expect(result.current.condition).toEqual('Nuevo');
  });

  it('returns the correct productList', () => {
    const { result } = renderHook(() =>
      useHandleUtils({ items: mockProducts })
    );

    expect(result.current.productList).toHaveLength(3);
    expect(result.current.productList[0].props.product.title).toEqual(
      'Product 1'
    );
    expect(result.current.productList[0].props.isMiddle).toEqual(true);
    expect(result.current.productList[1].props.product.title).toEqual(
      'Product 2'
    );
    expect(result.current.productList[1].props.isMiddle).toEqual(true);
    expect(result.current.productList[2].props.product.title).toEqual(
      'Product 3'
    );
    expect(result.current.productList[2].props.isMiddle).toEqual(false);
  });
});
