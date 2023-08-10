import type { Metadata } from 'next';
import { AppHeader } from '@/shared/components/AppHeader';

import '@/theme/global.scss';

export const metadata: Metadata = {
  title: 'Mercado Libre',
  description: 'Bienvenidos a Mercado Libre',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AppHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
