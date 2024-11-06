'use client';

import { MetricCard } from '@/components/MetricCard';
import { MaterialMetrics } from '@/types/RawMaterial';
import { FC } from 'react';

const MetricsMaterial: FC<{ materialMetrics: MaterialMetrics[] }> = (props) => {
  const { materialMetrics } = props;
  const getMetricData = (type: string) => materialMetrics.find((item) => item.type === type);
  return (
    <div className='w-full gap-4 flex flex-col lg:flex-row'>
      <MetricCard
        testid='Active Materials'
        className='w-full'
        title='Active Materials'
        value={getMetricData('active_materials')?.value}
        rate={getMetricData('active_materials')?.rate}
      />
      <MetricCard
        testid='Number of Processed Batches'
        className='w-full'
        title='Number of Processed Batches'
        value={getMetricData('processed_batches')?.value}
        rate={getMetricData('processed_batches')?.rate}
      />
      <MetricCard
        testid='Lab Test Coverage'
        className='w-full'
        title='Lab Test Coverage'
        value={0}
        rate={0}
      />
      <MetricCard
        testid='Digital COA Coverage'
        className='w-full'
        title='Digital COA Coverage'
        value={getMetricData('coa_coverage')?.value}
        rate={getMetricData('coa_coverage')?.rate}
      />
    </div>
  );
};

export default MetricsMaterial