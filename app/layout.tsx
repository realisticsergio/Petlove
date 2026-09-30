import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import type { ReactNode } from 'react';
import AppProviders from '@/components/providers/AppProviders';
import Header from '@/components/layout/Header/Header';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: {
    default: 'Petlove',
    template: '%s | Petlove',
  },
  description:
    'Petlove helps pets find loving families and brings pet lovers together.',
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk">
      <body className={manrope.variable}>
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
