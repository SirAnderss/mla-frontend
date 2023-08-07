'use client';

import { useState } from 'react';
import { AppLogo } from '@/shared/components/AppLogo';
import { InputField } from '@/shared/components/InputField';

import styles from './AppHeader.module.scss';

export default function AppHeader() {
  const [query, setQuery] = useState('');

  return (
    <header className={styles['app-header']}>
      <div className={styles['app-header__container']}>
        <AppLogo />
        <InputField
          value={query}
          placeholder='Ingrese su búsqueda'
          setValue={setQuery}
          iconClick={() => console.log({ query })}
          icon
        />
      </div>
    </header>
  );
}
