import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { InputField } from '.';

const mockProps = {
  value: '',
  setValue: jest.fn(),
};

describe('InputField Component', () => {
  afterEach(cleanup);

  test('should render correctly', () => {
    const { getByTestId } = render(
      <InputField setValue={mockProps.setValue} value={mockProps.value} />
    );

    expect(getByTestId('input-field')).toBeTruthy();
  });

  test('should render correctly with icon', () => {
    const { getByTestId } = render(
      <InputField setValue={mockProps.setValue} value={mockProps.value} icon />
    );

    expect(getByTestId('search-icon')).toBeTruthy();
  });

  test('should call setValue when input change', async () => {
    const { getByRole } = render(
      <InputField setValue={mockProps.setValue} value={mockProps.value} />
    );

    const input = getByRole('textbox');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    expect(mockProps.setValue).toHaveBeenCalledWith('test');
  });

  test('should call iconClick when input change', async () => {
    const iconClick = jest.fn();

    const { getByTestId } = render(
      <InputField
        setValue={mockProps.setValue}
        value='test'
        iconClick={iconClick}
        icon
      />
    );

    const icon = getByTestId('search-icon');

    await act(async () => {
      fireEvent.click(icon);
    });

    expect(iconClick).toHaveBeenCalledWith('test');
  });

  test('should can not call iconClick when icon is false', async () => {
    const iconClick = jest.fn();

    const { queryByTestId } = render(
      <InputField
        setValue={mockProps.setValue}
        value='test'
        iconClick={iconClick}
      />
    );

    const icon = queryByTestId('search-icon');

    expect(icon).toBeNull();
  });
});
