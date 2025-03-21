'use client';

import { WifiOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { OfflineLayoutProvider } from '@/lib/providers/offline-layout-provider';

export default function OfflinePage() {
  const router = useRouter();

  return (
    <OfflineLayoutProvider>
      <div className='flex h-screen flex-col items-center justify-center gap-4'>
        <WifiOffIcon className='h-16 w-16 text-yellow-500' />
        <h1 className='text-2xl font-bold'>Vous êtes hors ligne</h1>
        <p className='text-muted-foreground'>
          Vérifiez votre connexion internet et réessayez.
        </p>
        <Button onClick={() => router.refresh()}>Réessayer</Button>
      </div>
    </OfflineLayoutProvider>
  );
}
