'use client';

import { UseInputFieldProps } from './types';

export function useInputField(props: UseInputFieldProps) {
  const { iconClick, setValue, value } = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const hanldeIconClick = () => {
    iconClick?.(value);
  };

  return { handleInputChange, hanldeIconClick };
}
