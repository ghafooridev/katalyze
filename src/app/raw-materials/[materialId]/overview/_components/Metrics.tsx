'use client';

import { MetricCard } from '@/components/MetricCard';

export const Metrics = ({ materialMetrics }) => {
  const getMetricData = (type: string) => materialMetrics.find((item) => item.type === type);
  return (
    <div className='flex w-full justify-between gap-3 flex-col lg:flex-row'>
      <MetricCard
        className='w-full'
        title='Number of Processed Batches'
        value={getMetricData('processed_batches')?.value}
        rate={getMetricData('processed_batches')?.rate}
        data-testid="metric-card"
      />
      <MetricCard
        className='w-full'
        title='Number of Vendors'
        value={getMetricData('vendors_num')?.value}
        rate={getMetricData('vendors_num')?.rate}
        data-testid="metric-card"
      />
      <MetricCard
        className='w-full'
        title='Digital COA Coverage'
        value={getMetricData('coa_coverage')?.value + '%'}
        rate={getMetricData('coa_coverage')?.rate}
        data-testid="metric-card"
      />
    </div>);
};
