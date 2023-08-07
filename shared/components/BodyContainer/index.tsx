'use client';

import { AppContext } from '@/shared/context/AppContext';
import { useContext } from 'react';
import { Loader } from '../Loader';

export default function BodyContainer() {
  const {
    state: { isLoading },
  } = useContext(AppContext);

  if (isLoading) {
    return <Loader />;
  }

  return <div>BodyContainer</div>;
}
