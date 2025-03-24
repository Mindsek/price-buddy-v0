import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Price Buddy',
    description: 'Un comparateur de prix simple et efficace.',
    short_name: 'PriceBuddy',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#007bff',
    orientation: 'portrait',
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
        src: '/icons/maskable_192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/maskable_512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/screenshot_540x960.png',
        sizes: '540x960',
        type: 'image/png',
        form_factor: 'narrow',
      },
      {
        src: '/screenshots/screenshot_1440x900.png',
        sizes: '1440x900',
        type: 'image/png',
        form_factor: 'wide',
      },
    ],
  };
}
