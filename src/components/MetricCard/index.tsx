'use client';

import { useEffect, useState } from 'react';
import {
  Card, CardBody, CardFooter, CardHeader, Chip,
  Skeleton,
} from '@nextui-org/react';

import TrendDownArrow from '@/icons/TrendDownArrow';
import TrendUpArrow from '@/icons/TrendUpArrow';

interface MetricCardProps {
  title: string;
  value?: number | string;
  rate?: number;
  className?: string;
  testid?: string
}

const Loader = ({ load }) => {
  if (load) {
    return <Skeleton className="before:!duration-1000 w-[50px] rounded-lg skeleton flex">
      <div className="h-5 rounded-lg bg-default-300"></div>
    </Skeleton>;
  } return <div className='w-full text-center pb-2' data-testid="noData">No Data available</div>;
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  rate,
  className,
  testid,
}) => {
  const rateColor = () => {
    if (rate) {
      if (rate > 0) return 'success';
      if (rate < 0) return 'danger';
      return 'secondary';
    }
    return 'default';
  };

  const chipStyle = {
    success: {
      component: <span className='mr-1'><TrendUpArrow /></span>,
      textColor: 'text-success-700',
    },
    danger: {
      component: <span><TrendDownArrow /></span>,
      textColor: 'text-danger-700',
    },
    secondary: {
      component: <></>,
      textColor: 'text-secondary-700',
    },
    default: {
      component: <></>,
      textColor: 'text-secondary-700',
    },
  };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={`rounded-xl min-w-[180px] ${className}`} data-testid={testid}>
      <CardHeader className="flex flex-row items-start justify-between pb-0">
        <p className="text-sm text-gray-600">{title}</p>
        <p title={title}></p>
      </CardHeader>
      <CardBody className='p-0' />
      <CardFooter className="flex justify-between items-center  flex-row">
        {value || value === 0 ? <div className="text-2xl text-gray-900 font-semibold leading-9">
          {value}
        </div> : <Loader load={loading} />
        }

        {rate || rate === 0 ? (
          <Chip
            variant='bordered'
            color={`${rateColor()}`}
            classNames={{
              base: `border-[1.5px] border-${rateColor()}-600 px-0 h-6`,
            }}>
            <span className="flex items-center">
              {chipStyle[rateColor()].component}
              <span className={`text-sm ${chipStyle[rateColor()].textColor}`}>{rate}%</span>
            </span>
          </Chip>
        ) : null}
      </CardFooter>
    </Card>
  );
};
