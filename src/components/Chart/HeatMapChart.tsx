import { FC } from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';

import { renderTick } from './ChartAxis';

type HeatMapChartProps = {
  chartData: any,
  colors: [string, string, string]
  axisLeftLabel: string,
  axisBottomLabel: string
}
const HeatMapChart: FC<HeatMapChartProps> = (props) => {
  const {
    chartData, colors,
    axisLeftLabel, axisBottomLabel,
  } = props;
  return (
    <ResponsiveHeatMap
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
      xInnerPadding={0.01}
      yInnerPadding={0.04}
      borderRadius={5}
      animate={false}
      hoverTarget='cell'
      margin={{
        top: 70,
        right: 90,
        bottom: 60,
        left: 150,
      }}

      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: axisLeftLabel,
        legendPosition: 'middle',
        legendOffset: -120,
        truncateTickAt: 10,
      }}

      axisBottom={{
        tickSize: 0,
        tickPadding: 20,
        tickRotation: 0,
        legend: axisBottomLabel,
        legendOffset: 46,
        legendPosition: 'middle',
        truncateTickAt: 10,
        renderTick,
      }}

      axisTop={{
        tickSize: 0,
        tickPadding: 20,
        tickRotation: 0,
        legendOffset: 0,
        truncateTickAt: 20,
        renderTick,
      }}

      colors={{
        type: 'diverging',
        divergeAt: 0.5,
        minValue: -1.0,
        maxValue: 1.0,
        colors,
      }}
      emptyColor="#555555"
      legends={[
        {
          anchor: 'top',
          translateX: 0,
          translateY: -50,
          length: 900,
          thickness: 8,
          direction: 'row',
          tickPosition: 'before',
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          titleAlign: 'start',
          titleOffset: 4,

        },
      ]}
    />);
};

export default HeatMapChart;
