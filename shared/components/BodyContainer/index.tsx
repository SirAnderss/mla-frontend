'use client';

import { AppContext } from '@/shared/context/AppContext';
import { useContext } from 'react';
import { Loader } from '../Loader';
import { FetchingStatus } from '@/shared/enums/Fetching';

export default function BodyContainer() {
  const {
    state: { isLoading },
  } = useContext(AppContext);

  if (isLoading === FetchingStatus.FETCHING) {
    return <Loader />;
  }

  return <div>BodyContainer</div>;
}
