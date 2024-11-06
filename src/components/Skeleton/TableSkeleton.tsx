import React, { FC } from 'react';
import { Card, Divider, Skeleton } from '@nextui-org/react';

const TableSkeleton: FC<{ numberOfColumns: number, numberOfRows: number }> = (props) => {
  const { numberOfColumns, numberOfRows } = props;

  return (
    <Card className="w-full" radius="lg" data-testid="table-skeleton">
      <div className="bg-default-100 h-10 flex items-center justify-between gap-10 px-2">
        {[...Array(numberOfColumns)].map((el, index) => (
          <Skeleton key={`${index}-${+new Date()}`} className="before:!duration-1000 w-full rounded-lg skeleton flex">
            <div className="h-5 rounded-lg bg-default-300"></div>
          </Skeleton>
        ))}
      </div>

      <div className="space-y-3">
        {[...Array(numberOfRows)].map((el, rowIndex) => (
          <div key={`${rowIndex}-${+new Date()}`} data-testid="skeleton-row">
            <div className="h-9 flex items-center justify-start gap-10 px-2" >
              {[...Array(numberOfColumns)].map((element, index) => (
                <Skeleton key={`header-${index}-${+new Date()}`}
                  data-testid="skeleton-column"
                  className="before:!duration-1000 w-full rounded-lg skeleton flex items-center justify-start mr-5">
                  <div className="h-3 rounded-lg bg-default-300 "></div>
                </Skeleton>
              ))}
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TableSkeleton;
