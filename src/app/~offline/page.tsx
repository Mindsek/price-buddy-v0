'use client';

import { RefreshCcwIcon, WifiOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { OfflineLayoutProvider } from '@/lib/providers/offline-layout-provider';
import { cn } from '@/lib/utils';

export default function OfflinePage() {
  const router = useRouter();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      router.refresh();
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <OfflineLayoutProvider>
      <div className='flex h-screen flex-col items-center justify-center gap-4'>
        <WifiOffIcon className='h-16 w-16 text-yellow-500' />
        <h1 className='text-2xl font-bold'>Vous êtes hors ligne</h1>
        <p className='text-muted-foreground'>
          Vérifiez votre connexion internet et réessayez.
        </p>
        <Button
          onClick={handleRefresh}
          className={cn(isRefreshing && 'animate-pulse')}
        >
          Réessayer
          <RefreshCcwIcon
            className={cn(
              'ml-2 h-4 w-4 transition-transform',
              isRefreshing && 'animate-spin'
            )}
          />
        </Button>
      </div>
    </OfflineLayoutProvider>
  );
}
