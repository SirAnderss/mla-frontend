import { render } from '@testing-library/react';
import { AppContextProvider } from './AppState';

describe('AppContextProvider', () => {
  test('renders its children', () => {
    const { getByText } = render(
      <AppContextProvider>
        <div>Test</div>
      </AppContextProvider>
    );

    expect(getByText('Test')).toBeInTheDocument();
  });
});
