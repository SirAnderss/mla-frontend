import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { AppHeader } from '.';
import { useAppHeader } from './useAppHeader';

jest.mock('./useAppHeader');

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return <></>;
  },
}));

const mockHook = {
  query: 'query',
  setQuery: jest.fn(),
  handleClickQuery: jest.fn(),
};

const mockUseAppHeader = useAppHeader as jest.MockedFunction<
  typeof useAppHeader
>;

describe('AppHeader Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('should render correctly', async () => {
    mockUseAppHeader.mockReturnValue(mockHook);

    const { getByTestId } = render(<AppHeader />);

    expect(getByTestId('app-header')).toBeTruthy();
  });

  test('should call handleQueryChange when input change', async () => {
    mockUseAppHeader.mockReturnValue(mockHook);

    const { getByRole } = render(<AppHeader />);

    const input = getByRole('textbox');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    expect(mockHook.setQuery).toBeCalledWith('test');
  });

  test('should call handleClickQuery when input change', async () => {
    mockUseAppHeader.mockReturnValue(mockHook);

    const { getByTestId } = render(<AppHeader />);

    const icon = getByTestId('search-icon');

    await act(async () => {
      fireEvent.click(icon);
    });

    expect(mockHook.handleClickQuery).toBeCalledWith('query');
  });
});
