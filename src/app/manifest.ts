import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Price Buddy',
    short_name: 'PriceBuddy',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#007bff',
    description: 'Un comparateur de prix simple et efficace.',
    icons: [
      {
        src: '/icons/ic_price_buddy_192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/ic_price_buddy_500.png',
        sizes: '500x500',
        type: 'image/png',
      },
      {
        src: '/icons/ic_price_buddy_512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
