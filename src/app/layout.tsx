import './globals.css';
import { Open_Sans } from 'next/font/google';

import TodoProvider from './_components/context/TodoContext';
import { Analytics } from '@vercel/analytics/react';

const openSansFont = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'A New Next.js Project',
  description: 'A New Next.js project made by @daryllreillo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSansFont.className}>
        <TodoProvider>{children}</TodoProvider>
        <Analytics />
      </body>
    </html>
  );
}
