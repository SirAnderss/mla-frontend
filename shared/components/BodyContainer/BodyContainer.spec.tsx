import { cleanup, render } from '@testing-library/react';
import { BodyContainer } from '.';

jest.mock('next/navigation', () => require('next-router-mock'));

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
};

const mockProps = {
  categories: ['Category 1', 'Category 2', 'Category 3'],
  items: [mockProduct],
};

describe('BodyContainer Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<BodyContainer {...mockProps} />);

    expect(getByTestId('app-products')).toBeInTheDocument();
  });

  it('renders the CategorySlug and ProductsSection components when categories and products are present', () => {
    const { getByTestId } = render(<BodyContainer {...mockProps} />);

    expect(getByTestId('app-categories')).toBeInTheDocument();
    expect(getByTestId('products-section')).toBeInTheDocument();
  });

  it('renders the CategorySlug components when categories are provided and products are not present', () => {
    const { getByTestId, queryByTestId } = render(
      <BodyContainer items={[]} categories={mockProps.categories} />
    );

    expect(getByTestId('app-categories')).toBeInTheDocument();
    expect(queryByTestId('products-section')).toBeNull();
  });

  it('renders the CategorySlug components when categories are not provided and products are present', () => {
    const { getByTestId, queryByTestId } = render(
      <BodyContainer items={mockProps.items} categories={[]} />
    );

    expect(queryByTestId('app-categories')).toBeNull();
    expect(getByTestId('products-section')).toBeInTheDocument();
  });
});
