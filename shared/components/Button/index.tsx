'use client';

import styles from './Button.module.scss';

interface InputButtonProps extends React.HTMLProps<HTMLButtonElement> {
  labelText: string;
  onClick: () => void;
  buttonType?: 'primary' | 'secondary';
}

export function Button({
  labelText,
  onClick,
  buttonType = 'primary',
}: InputButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[buttonType]}`}
      data-testid='input-button'
    >
      {labelText}
    </button>
  );
}
