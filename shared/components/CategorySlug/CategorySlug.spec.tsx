import { cleanup, render } from '@testing-library/react';
import { CategorySlug } from '.';

const mockPorps = {
  categories: ['Category 1', 'Category 2', 'Category 3'],
};

describe('CategorySlug Component', () => {
  afterEach(cleanup);
  test('should render correctly', () => {
    const { getByTestId } = render(<CategorySlug {...mockPorps} />);

    expect(getByTestId('app-categories')).toBeTruthy();
  });

  test('should render categories with > connector', () => {
    const { getByText } = render(<CategorySlug {...mockPorps} />);

    expect(getByText('Category 1 >')).toBeTruthy();
    expect(getByText('Category 2 >')).toBeTruthy();
    expect(getByText('Category 3')).toBeTruthy();
  });
});
