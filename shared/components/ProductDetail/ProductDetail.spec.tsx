import { cleanup, render } from '@testing-library/react';
import { ProductDetail } from './index';
import { useWindowSize } from '@/shared/hooks/useWindowSize';

jest.mock('../../hooks/useWindowSize');
const mockUseWindowSize = useWindowSize as jest.MockedFunction<
  typeof useWindowSize
>;

const mockProduct = {
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
  sold_quantity: 10,
  description: 'This is a product description',
};
const categories = ['Electrónica', 'Computación', 'Laptops y Accesorios'];

describe('ProductDetail', () => {
  beforeEach(() => {
    mockUseWindowSize.mockReturnValue({ width: 0, height: 0 });
  });

  afterEach(cleanup);

  it('renders the product title and description', () => {
    const { getByText } = render(
      <ProductDetail categories={[]} item={mockProduct} />
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('This is a product description')).toBeInTheDocument();
  });

  it('renders the product condition and sold quantity', () => {
    const { getByText } = render(
      <ProductDetail categories={[]} item={mockProduct} />
    );

    expect(getByText('Nuevo | +10 Vendidos')).toBeInTheDocument();
  });

  it('renders the product image', () => {
    const { getByAltText } = render(
      <ProductDetail categories={[]} item={mockProduct} />
    );

    const imageElement = getByAltText('Product 1');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src');
  });

  it('renders the product price', () => {
    const { getByText } = render(
      <ProductDetail categories={[]} item={mockProduct} />
    );

    expect(getByText('$ 1.200')).toBeInTheDocument();
  });

  it('renders the product categories', () => {
    const { getByText } = render(
      <ProductDetail categories={categories} item={mockProduct} />
    );

    expect(getByText('Electrónica >')).toBeInTheDocument();
    expect(getByText('Computación >')).toBeInTheDocument();
    expect(getByText('Laptops y Accesorios')).toBeInTheDocument();
  });

  it('renders correctly if window width is upper to 768 px', () => {
    mockUseWindowSize.mockReturnValue({ width: 1280, height: 0 });

    const { getByText, getByAltText } = render(
      <ProductDetail categories={[]} item={mockProduct} />
    );
    expect(getByAltText('Product 1')).toBeInTheDocument();
    expect(getByText('Nuevo | +10 Vendidos')).toBeInTheDocument();
    expect(getByText('$ 1.200')).toBeInTheDocument();
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('This is a product description')).toBeInTheDocument();
  });
});
