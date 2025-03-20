import type { Metadata } from 'next';

import './globals.css';

import AppProvider from '@/lib/providers/AppProvider';

export const metadata: Metadata = {
  title: {
    default: 'Price Buddy',
    template: '%s | Price Buddy',
  },
  description: 'Un comparateur de prix simple et efficace.',
  generator: 'Next.js',
  keywords: [
    'nextjs',
    'pwa',
    'next-pwa',
    'price-comparator',
    'price-buddy',
    'supermarkets',
    'price-comparison',
  ],
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/ic_price_buddy_192.png' },
    { rel: 'icon', url: '/icons/ic_price_buddy_192.png' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className='dark h-full'>
      <body suppressHydrationWarning className='h-full'>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
