import { FC } from 'react';
import { ResponsiveBar } from '@nivo/bar';

import { renderTick } from './ChartAxis';

type LineChartProps = {
  chartData: any,
  color: string
  chartTooltip: FC
  keys: string[],
  indexBy: string
}

export const BarChart: FC<LineChartProps> = (props) => {
  const {
    chartData, color, keys, chartTooltip, indexBy,
  } = props;
  return (
    <ResponsiveBar
      theme={{
        axis: {
          legend: {
            text: {
              fontSize: 16,
              fontWeight: 500,
              fill: '#101828',
            },
          },
        },
        grid: {
          line: {
            stroke: '#F2F4F7',
          },
        },
      }}
      data={chartData}
      keys={keys}
      borderRadius={5}
      enableGridY={true}
      enableLabel={false}
      indexBy={indexBy}
      gridYValues={8}
      margin={{
        top: 10, right: 10, bottom: 50, left: 50,
      }}
      tooltip={chartTooltip}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={color}
      axisBottom={{
        legend: 'Months',
        legendPosition: 'middle',
        legendOffset: 35,
        tickSize: 0,
        renderTick,
      }}
      axisLeft={{
        legend: 'Number of Batches',
        legendPosition: 'middle',
        legendOffset: -40,
        tickSize: 0,
        tickValues: 6,
        renderTick,
      }}
    />
  );
};
