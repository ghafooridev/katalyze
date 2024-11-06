'use client';

import { Button } from '@nextui-org/react';
import { Column } from '@tanstack/react-table';

import ArrowDownIcon from '@/icons/ArrowDownIcon';
import ArrowSortIcon from '@/icons/ArrowSortIcon';

interface ColumnHeaderSortButtonProps<T> {
  column: Column<T>;
  children: string;
}

const ColumnHeader = <T, >({
  column,
  children,
}: ColumnHeaderSortButtonProps<T>) => {
  const renderIcons = () => {
    const sortedType = column.getIsSorted();
    switch (sortedType) {
      case 'desc': {
        return <ArrowDownIcon className='ml-2 h-4 w-4' />;
      }
      case 'asc': {
        return <ArrowDownIcon className='ml-2 h-4 w-4 rotate-180' />;
      }
      default:
        return <ArrowSortIcon className='ml-0 h-4 w-4' />;
    }
  };

  return (
    <Button
      variant='light'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className='p-0 hover:bg-grey--50 hover:text-grey--900'
    >
      {children}
      {renderIcons()}
    </Button>
  );
};

export default ColumnHeader;
