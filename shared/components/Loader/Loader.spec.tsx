import { render } from '@testing-library/react';
import { Loader } from '.';

describe('Loader Component', () => {
  test('should render the Loader component', () => {
    const { getByTestId } = render(<Loader />);

    expect(getByTestId('loader')).toBeTruthy();
  });
});
