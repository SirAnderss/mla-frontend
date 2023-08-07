import { cleanup, render } from '@testing-library/react';
import { AppLogo } from '.';
import { useAppLogo } from './useAppLogo';

jest.mock('./useAppLogo');
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return <></>;
  },
}));

const mockHook = {
  src: '/assets/logo__small.png',
  alt: 'alt-text',
  width: 44,
  height: 32,
  isLoading: false,
};

const mockUseAppLogo = useAppLogo as jest.MockedFunction<typeof useAppLogo>;

describe('AppLogo Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('should render correctly', async () => {
    mockUseAppLogo.mockReturnValue(mockHook);

    const { getByTestId } = render(<AppLogo />);

    const logo = getByTestId('logo-image');

    expect(logo).toBeTruthy();
  });

  test('should return null if isLoading is true', async () => {
    mockUseAppLogo.mockReturnValue({ ...mockHook, isLoading: true });

    const { queryByTestId } = render(<AppLogo />);

    const logo = queryByTestId('logo-image');

    expect(logo).toBeNull();
  });
});
