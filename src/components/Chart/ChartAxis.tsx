import { FC } from 'react';

export const ChartAxisLabel: FC<any> = ({ options }) => {
  const {
    x, y, textAnchor, textX, textY, value,
  } = options;
  return (<g transform={`translate(${x},${y})`}>
    <text
      textAnchor={textAnchor}
      transform={`translate(${textX},${textY})`}
      style={{ fontSize: 12, lineHeight: 18, fill: '#475467' }}
    >
      {value}
    </text>
  </g>);
};

export const renderTick = ({
  x, y, textAnchor, textX, textY, value,
}) => (
  <ChartAxisLabel
    options={{
      x, y, textX, textY: textY + 10, textAnchor, value,
    }}
  />
);
