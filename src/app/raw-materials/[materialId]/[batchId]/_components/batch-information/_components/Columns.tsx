'use client';

import { ColumnDef } from '@tanstack/react-table';

import ColumnHeaderSortButton from './ColumnHeader';

type Column = {
  title: string,
  value: string
};

const columns: ColumnDef<Column>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Title</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div>{row.original.title}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'value',
    header: () => (
      <span className='font-normal min-w-20 h-10 text-small'>Value</span>
    ),
    cell: ({ row }) => <div className=''>{row.original.value}</div>,
    enableSorting: true,
  },

];

export default columns;
