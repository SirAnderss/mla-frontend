import type { Metadata } from 'next';
import '@/theme/global.scss';
import { AppHeader } from '@/shared/components/AppHeader';
import { AppContextProvider } from '@/shared/context/AppState';

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
        <AppContextProvider>
          <AppHeader />
          <main>{children}</main>
        </AppContextProvider>
      </body>
    </html>
  );
}
