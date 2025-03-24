'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Analytics } from './analytics';
import { PriceComparisons } from './price-comparisons';
import { RecentProducts } from './recent-products';
import { StatsCards } from './stats-cards';

import { DashboardData } from '@/app/actions/dashboard';

type DashboardPageProps = {
  data: DashboardData;
};

export default function DashboardPage({ data }: DashboardPageProps) {
  return (
    <div className='flex-1 space-y-4 p-8 pt-6 @container'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Tableau de bord</h2>
      </div>
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value='analytics'>Analytiques</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <StatsCards
            totalSavings={data.totalSavings}
            totalProducts={data.totalProducts}
            totalStores={data.totalStores}
            bestSavingPercentage={data.bestSavingPercentage}
          />
          {/* max-md:flex-col */}
          <div className='flex gap-4 flex-col @[50rem]:flex-row'>
            <PriceComparisons
              className='w-full @[50rem]:w-2/3'
              priceComparisons={data.priceComparisons}
            />
            <RecentProducts
              className='w-full @[50rem]:w-1/3'
              recentProducts={data.recentProducts}
            />
          </div>
        </TabsContent>
        <TabsContent value='analytics' className='space-y-4'>
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
