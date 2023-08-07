'use client';

import { memo } from 'react';
import { useInputField } from './useInputField';
import { SearchIcon } from '@/shared/components/Icons/Search';
import { InputFieldProps } from './types';

import styles from './InputField.module.scss';

const Input = (props: InputFieldProps) => {
  const {
    placeholder,
    icon,
    value,
    setValue,
    iconClick,
    type = 'text',
  } = props;

  const { handleInputChange, hanldeIconClick } = useInputField({
    value,
    setValue,
    iconClick,
  });

  return (
    <div className={styles['input-field']} data-testid='input-field'>
      <input
        type={type}
        placeholder={placeholder}
        className={styles['input-field__input']}
        value={value}
        onChange={handleInputChange}
      />
      {icon && (
        <SearchIcon
          className={styles['input-field__icon']}
          onClick={hanldeIconClick}
        />
      )}
    </div>
  );
};

const InputField = memo(Input);

export { InputField };
