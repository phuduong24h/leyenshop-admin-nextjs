'use client';

import { NotFound as NotFoundComponent } from 'components/common';
import { Routes } from 'routes';

export default function NotFound() {
  return <NotFoundComponent title={'Back to home admin'} href={Routes.TRANG_CHU} />;
}
