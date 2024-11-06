'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TrendsValue } from '@/types/RawMaterial';

import ColumnHeaderSortButton from './ColumnHeader';

const columns: ColumnDef<TrendsValue>[] = [
  {
    accessorKey: 'batchId',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Batch ID</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div>{row.original.batchId}</div>,
  },
  {
    accessorKey: 'Material',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        material
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className=''>{row.original.material}</div>,
  },
  {
    accessorKey: 'process',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Process
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className=''>{row.original.process}</div>,
  },

];

export default columns;
