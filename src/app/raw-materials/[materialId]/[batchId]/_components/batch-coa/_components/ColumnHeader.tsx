'use client';

import { Button } from '@nextui-org/react';
import { Column } from '@tanstack/react-table';

import ArrowDownIcon from '@/icons/ArrowDownIcon';
import ArrowSortIcon from '@/icons/ArrowSortIcon';
import { BatchCharacteristicSpecification } from '@/types/RawMaterial';

interface ColumnHeaderSortButtonProps {
  column: Column<BatchCharacteristicSpecification>;
  children: string;
}

const ColumnHeader: React.FC<ColumnHeaderSortButtonProps> = ({
  column,
  children,
}) => {
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
        return <ArrowSortIcon className='ml-2 h-4 w-4' />;
    }
  };

  return (
    <Button
      variant='light'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className='p-0 hover:bg-grey-50 hover:text-grey-900 text-gray-600 text-xs font-medium'
    >
      {children}
      {renderIcons()}
    </Button>
  );
};

export default ColumnHeader;
