import { FC } from 'react';
import { ResponsiveLine } from '@nivo/line';

import { renderTick } from './ChartAxis';

type LineChartProps = {
  chartData: any,
  color: string | string[]
  chartTooltip?: FC,
  enableArea: boolean
  axisBottom?: any,
  axisLeft?: any,
  xScale?: any
}

export const LineChart: FC<LineChartProps> = (props) => {
  const {
    chartData, color, chartTooltip, enableArea, axisBottom, axisLeft, xScale,
  } = props;

  const minValue = Math.min(...chartData.map((d) => Math.min(...d.data.map((point) => point.y))));
  const maxValue = Math.max(...chartData.map((d) => Math.max(...d.data.map((point) => point.y))));
  const range = maxValue - minValue;
  const numberOfSteps = 5; // Adjust this based on how many steps you want
  const step = range / numberOfSteps;

  return (
    <ResponsiveLine

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
      }}

      data={chartData}
      enableGridY={true}
      enableGridX={false}
      margin={{
        top: 10, right: 10, bottom: 80, left: 50,
      }}
      colors={color}
      enableArea={enableArea}
      enablePoints={false}
      useMesh={true}
      tooltip={chartTooltip}
      isInteractive={!!chartTooltip}
      fill={[
        {
          id: 'gradientA',
          match: '*',
        },
      ]}
      defs={[
        {
          colors: [
            {
              color: 'inherit',
              offset: 0,
            },
            {
              color: 'inherit',
              offset: 100,
              opacity: 0,
            },
          ],
          id: 'gradientA',
          type: 'linearGradient',
        },
      ]}
      xScale={xScale}
      yScale={{
        type: 'linear',
        min: minValue - step,
        max: maxValue + step,
      }}
      axisBottom={axisBottom ?? {
        legend: 'Months',
        legendPosition: 'middle',
        legendOffset: 35,
        tickSize: 2,
        renderTick,
      }}
      axisLeft={axisLeft ?? {
        legend: 'Rating',
        legendPosition: 'middle',
        legendOffset: -40,
        tickSize: 0,
        tickValues: 6,
        renderTick,
      }}
    />
  );
};
