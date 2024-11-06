import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import Script from 'next/script';
import { getServerSession } from 'next-auth';

import Navbar from '@/components/Nav/Navbar';
import { polyfillPromiseWithResolvers } from '@/components/OriginalDocumentViewer/PromiseWithResolvers';
import ToastContainerShell from '@/components/Toast/ToastContainerShell';
import { QueryProvider } from '@/providers/Query';

import '@/styles/index.scss';

const inter = Inter({ subsets: ['latin'] });
polyfillPromiseWithResolvers();

export const metadata: Metadata = {
  title: 'RMC Digitalization',
  description: 'Katalyze AI RMC application',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-gray-200 h-[100vh]`}>
        <QueryProvider>
          <Navbar />
          <main className='relative top-[60px]'>{children}</main>
          <ToastContainerShell />
          <script src='/app/__env.js' />
          <Script src='/app/scripts/hotjar.js' strategy='beforeInteractive' />
        </QueryProvider>
      </body>
    </html>
  );
}
