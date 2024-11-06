import React from 'react';
import { Card, Skeleton } from '@nextui-org/react';

export default function MetricCardSkeleton() {
  return (
    <Card className="w-full" radius="lg" data-testid="metric-card-skeleton">
      <div className="bg-default-100 h-10 flex items-center justify-between  px-2">
        <Skeleton className="before:!duration-1000 w-full rounded-lg skeleton flex">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="before:!duration-1000 w-full rounded-lg skeleton flex">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
