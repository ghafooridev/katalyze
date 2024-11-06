import { FC, ReactNode } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

interface MetricCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  style?: any
  bodyClassName?: string;
}

const ChartCard: FC<MetricCardProps> = ({
  title, children, className, bodyClassName, style,
}) => (
  <Card className={className} data-testid="chart-card" style={style}>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <p className='text-md font-medium'>{title}</p>

    </CardHeader>
    <CardBody className={`flex justify-between items-center pb-4 flex-row overflow-visible ${bodyClassName}`}>
      {children}
    </CardBody>
  </Card>
);

export default ChartCard;
