import { Dispatch, SetStateAction } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: boolean;
  iconClick?: (value: string) => void;
}

interface UseInputFieldProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  iconClick?: (value: string) => void;
}

export type { InputFieldProps, UseInputFieldProps };
