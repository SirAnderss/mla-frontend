import { render, fireEvent, cleanup, act } from '@testing-library/react';
import { ProductCard } from '.';

import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { useHandleUtils } from '@/shared/hooks/useHandleUtils';

jest.mock('../../hooks/useHandleUtils');

const product = {
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
};

const mockProps = {
  product,
  isMiddle: false,
};

const mockUseHandleUtils = useHandleUtils as jest.MockedFunction<
  typeof useHandleUtils
>;

describe('ProductCard', () => {
  beforeEach(() => {
    mockUseHandleUtils.mockReturnValue({
      breadcrumbs: [],
      condition: 'Nuevo',
      price: '$ 1.200',
      productList: [],
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('renders the product card correctly', () => {
    const { getByTestId, getByRole, getByText } = render(
      <ProductCard {...mockProps} />
    );

    const productCard = getByTestId('product-card');
    expect(productCard).toBeInTheDocument();

    const productImage = getByRole('img');
    expect(productImage).toBeInTheDocument();

    const productTitle = getByText('Product 1');
    expect(productTitle).toBeInTheDocument();

    const productPrice = getByText('$ 1.200');
    expect(productPrice).toBeInTheDocument();

    const productCondition = getByText('Nuevo');
    expect(productCondition).toBeInTheDocument();

    const productShipping = getByTestId('shipping-icon');
    expect(productShipping).toBeInTheDocument();
  });

  it('calls push to product detail when the product card is clicked', async () => {
    const { getByTestId } = render(<ProductCard {...mockProps} />, {
      wrapper: MemoryRouterProvider,
    });

    const productCard = getByTestId('product-card');

    fireEvent.click(productCard);

    expect(mockRouter.asPath).toEqual('/items/MLA123');
  });
});
