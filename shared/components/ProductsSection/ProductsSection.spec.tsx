import { cleanup, render } from '@testing-library/react';
import { ProductsSection } from '.';

jest.mock('next/navigation', () => require('next-router-mock'));

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

describe('ProductsSection', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<ProductsSection products={mockProducts} />);

    expect(getByTestId('products-section')).toBeInTheDocument();
  });
});
