'use client';

import { Button } from '@nextui-org/react';
import { Column } from '@tanstack/react-table';

import ArrowDownIcon from '@/icons/ArrowDownIcon';
import ArrowUpIcon from '@/icons/ArrowUpIcon';
import CaretSortIcon from '@/icons/CaretSortIcon';
import { Digitalization } from '@/types/Digitalization.schema';

interface ColumnHeaderSortButtonProps {
  column: Column<Digitalization>;
  children: string;
}

const ColumnHeaderSortButton: React.FC<ColumnHeaderSortButtonProps> = ({
  column,
  children,
}) => {
  const renderIcons = () => {
    const sortedType = column.getIsSorted();
    switch (sortedType) {
      case 'desc': {
        return <ArrowDownIcon />;
      }
      case 'asc': {
        return <ArrowUpIcon />;
      }
      default:
        return <CaretSortIcon />;
    }
  };

  return (
    <Button
      variant="light"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="p-0 data-[hover=true]:bg-gray-100 text-gray-600 text-xs
      font-medium leading-[18px] gap-1"
    >
      {children}
      {renderIcons()}
    </Button>
  );
};

export default ColumnHeaderSortButton;
