'use client';

import { AppLogo } from '@/shared/components/AppLogo';
import { InputField } from '@/shared/components/InputField';
import { useAppHeader } from './useAppHeader';

import styles from './AppHeader.module.scss';

export function AppHeader() {
  const { handleClickQuery, handleKeyPress, setQuery, query } = useAppHeader();

  return (
    <header className={styles['app-header']} data-testid='app-header'>
      <div className={styles['app-header__container']}>
        <AppLogo />
        <InputField
          value={query}
          placeholder='Ingrese su búsqueda'
          setValue={setQuery}
          iconClick={handleClickQuery}
          onKeyUp={handleKeyPress}
          icon
        />
      </div>
    </header>
  );
}
