import { render, fireEvent } from '@testing-library/react';
import { Button } from '.';

const onClick = jest.fn();

describe('Button', () => {
  it('renders the button with the correct label text', () => {
    const { getByTestId } = render(
      <Button labelText='Click me' onClick={onClick} />
    );

    const button = getByTestId('input-button');

    expect(button).toHaveTextContent('Click me');
  });

  it('calls the onClick function when the button is clicked', () => {
    const { getByTestId } = render(
      <Button labelText='Click me' onClick={onClick} />
    );

    const button = getByTestId('input-button');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('renders the button with the correct button type', () => {
    const { getByTestId } = render(
      <Button labelText='Click me' buttonType='secondary' onClick={onClick} />
    );

    const button = getByTestId('input-button');

    expect(button).toHaveClass('btn secondary');
  });
});
