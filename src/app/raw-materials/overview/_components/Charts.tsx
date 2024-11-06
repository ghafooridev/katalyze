'use client';

import {
  ReactNode,
} from 'react';

import { BarChart } from '@/components/Chart/BarChart';
import ChartCard from '@/components/ChartCard';
import ChartNoData from '@/icons/ChartNoData';
import { getAllMonths } from '@/lib/utils';

const processChartTooltip = (data: any) => <div className='speech-bubble flex items-center gap-2 relative z-50'>
  <div className='rounded-full w-3 h-3' style={{ backgroundColor: data.color }} />
  <div className='flex flex-col'>
    <span>
      {data.data.value as ReactNode}
    </span>
    <span>
      {data.data.month as ReactNode}
    </span>
  </div>
</div>;

const batchDeviationChartTooltip = (data: any) => <div
  className='speech-bubble flex items-center gap-2'
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
</div>;

export const ProcessBatchChart = ({ process }) => (<ChartCard
  title='Processed Raw Material Batches'
  className='flex-1 min-h-[280px]'>
  {process?.length ? <BarChart
    chartData={getAllMonths(process)}
    keys={['value']}
    color={'#B692F6'}
    indexBy='month'
    chartTooltip={processChartTooltip} />
    : <div className='flex flex-col items-center justify-center w-full' data-testid="chart-no-data">
      <ChartNoData />
      <p className='text-md text-semibold font-medium text-gray-400'>No data available</p>
    </div>}
</ChartCard>);

export const BatchDeviationChart = ({ deviations }) => {
  const getProperDataForCharts = (
    values:
      { month: string, [key: string]: { total: number } | string }[],
    key: string,
  ) => {
    const result = values?.map((item) => ({
      month: item.month,
      value: (item[key] as { total: number }).total || 0,
    }));

    return getAllMonths(result);
  };

  return (
    <ChartCard
      title='Batched involved in Deviations'
      className='flex-1 min-h-[280px]'
    >
      {getProperDataForCharts(deviations, 'deviation').length ? <BarChart
        chartData={getProperDataForCharts(deviations, 'deviation')}
        keys={['value']}
        color={'#F97066'}
        indexBy='month'
        chartTooltip={batchDeviationChartTooltip} />
        : <div className='flex flex-col items-center justify-center w-full' data-testid="chart-no-data">
          <ChartNoData />
          <p className='text-md text-semibold font-medium text-gray-400'>No data available</p>
        </div>}
    </ChartCard>);
};
