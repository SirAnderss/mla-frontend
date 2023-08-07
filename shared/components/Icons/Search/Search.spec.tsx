import { cleanup, render } from '@testing-library/react';
import { SearchIcon } from '.';

describe('Search Component', () => {
  afterEach(cleanup);

  test('should render correctly', async () => {
    const component = render(<SearchIcon />);

    expect(component.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('should render correctly with width and height', async () => {
    const size = 128;

    const component = render(<SearchIcon width={size} height={size} />);

    const result = component.getByTestId('search-icon');

    expect(result).toHaveAttribute('width', `${size}`);
    expect(result).toHaveAttribute('height', `${size}`);
  });

  test('should render correctly with custom color', async () => {
    const color = '#ff0000';

    const component = render(<SearchIcon color={color} />);

    const result = component.getByTestId('search-icon');

    const circle = result.querySelector('circle');
    const paths = result.querySelectorAll('path');

    const hasColor = Array.from(paths).some(path => path.hasAttribute('fill'));

    expect(hasColor).toBeTruthy();
    expect(circle).toHaveAttribute('stroke', `${color}`);
  });
});
