'use client';

import { Home, ShoppingCart, Store } from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';

export function BaseSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className='text-xl font-bold'>Price Buddy</h1>
      </SidebarHeader>
      <SidebarContent>
        <nav className='flex flex-col gap-2'>
          <Link
            href='/'
            className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent'
          >
            <Home className='h-4 w-4' />
            Accueil
          </Link>
          <Link
            href='/supermarkets'
            className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent'
          >
            <Store className='h-4 w-4' />
            Supermarchés
          </Link>
          <Link
            href='/products'
            className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent'
          >
            <ShoppingCart className='h-4 w-4' />
            Produits
          </Link>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
