'use client';

import { ReactNode } from 'react';

import { BarChart } from '@/components/Chart/BarChart';
import ChartCard from '@/components/ChartCard';
import ChartNoData from '@/icons/ChartNoData';
import { getAllMonths } from '@/lib/utils';
import { Deviations } from '@/types/RawMaterial';

const getProperDataForCharts = (key, values: Deviations[] = []) => {
  const result: { month: string, value: number }[] = [];
  if (Array.isArray(values)) {
    values.forEach((item) => result.push({ month: item.month, value: item[key].total }));
  }

  return getAllMonths(result);
};

const processBatchAndDeviationChartTooltip = (data: any) => <div>
  <div className='speech-bubble flex items-center gap-2 relative z-50'
  >
    <div className='rounded-full w-3 h-3' style={{ backgroundColor: data.color }} />
    <div className='flex flex-col'>
      <span>
        {data.data.value as ReactNode}
      </span>
      <span>
        {data.data.month as ReactNode}
      </span>
    </div>
  </div>
</div>;

const NoData = () => <div className='flex flex-col items-center justify-center w-full'>
  <ChartNoData />
  <p className='text-md text-semibold font-medium text-gray-400'>No data available</p>
</div>;

export const ProcessBatchChart = ({ process }) => (
  <ChartCard title='Processed Batches' className='flex-1 min-h-[280px]'
    data-testid="chart-card">
    {process?.length ? <BarChart
      chartData={getAllMonths(process)}
      keys={['value']}
      color={'#B692F6'}
      indexBy='month'
      chartTooltip={processBatchAndDeviationChartTooltip} />
      : <NoData />}
  </ChartCard>
);

export const DeviationChart = ({ deviations }) => (
  <ChartCard
    title='Deviations involved in'
    className='flex-1 min-h-[280px]'
    data-testid="chart-card"
  >

    {getProperDataForCharts('deviation', deviations).length ? <BarChart
      chartData={getProperDataForCharts('deviation', deviations)}
      keys={['value']}
      color={'#F97066'}
      indexBy='month'
      chartTooltip={processBatchAndDeviationChartTooltip} />
      : <NoData />}
  </ChartCard>
);
