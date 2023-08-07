import type { Metadata } from 'next';
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
        <header>
          <h1>Im header</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
