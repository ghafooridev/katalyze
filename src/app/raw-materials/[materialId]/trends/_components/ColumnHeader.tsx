'use client';

import { Button } from '@nextui-org/react';
import { Column } from '@tanstack/react-table';

import { TrendsValue } from '@/types/RawMaterial';

interface ColumnHeaderSortButtonProps {
  column: Column<TrendsValue>;
  children: string;
}

const ColumnHeader: React.FC<ColumnHeaderSortButtonProps> = ({
  column,
  children,
}) => (
  <Button
    variant='light'
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    className='p-0 hover:bg-grey--50 hover:text-grey--900'
  >
    {children}
  </Button>
);

export default ColumnHeader;
