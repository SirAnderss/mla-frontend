import { cleanup, render } from '@testing-library/react';
import { Shipping } from '.';

describe('Search Component', () => {
  afterEach(cleanup);

  test('should render correctly', async () => {
    const component = render(<Shipping />);

    expect(component.getByTestId('shipping-icon')).toBeInTheDocument();
  });

  test('should render correctly with width and height', async () => {
    const size = 128;

    const component = render(<Shipping width={size} height={size} />);

    const result = component.getByTestId('shipping-icon');

    expect(result).toHaveAttribute('width', `${size}`);
    expect(result).toHaveAttribute('height', `${size}`);
  });

  test('should render correctly with custom color', async () => {
    const color = '#ff0000';

    const component = render(<Shipping color={color} />);

    const result = component.getByTestId('shipping-icon');

    const paths = result.querySelectorAll('path');

    const hasColor = Array.from(paths).some(path => path.hasAttribute('fill'));

    expect(hasColor).toBeTruthy();
  });
});
