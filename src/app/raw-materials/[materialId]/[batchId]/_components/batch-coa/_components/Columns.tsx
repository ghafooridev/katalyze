'use client';

import { ColumnDef } from '@tanstack/react-table';

import { BatchCharacteristicSpecification } from '@/types/RawMaterial';

import ColumnHeaderSortButton from './ColumnHeader';

const columns: ColumnDef<BatchCharacteristicSpecification>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Characteristics Name</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className='text-gray-900 text-sm font-medium'>{row.original.name}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'result',
    header: () => (
      <div className='text-gray-600 text-xs font-medium'>Result</div>
    ),
    cell: ({ row }) => <div>{row.original.value}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'UoM',
    header: () => (
      <div className='text-gray-600 text-xs font-medium'>UoM</div>
    ),
    cell: ({ row }) => <div>{row.original.unit}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'range',
    header: () => (
      <div className='text-gray-600 text-xs font-medium'>Specification</div>
    ),
    cell: ({ row }) => <div>{row.original.range}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'testMethod',
    header: () => (
      <div className='text-gray-600 text-xs font-medium'>Test Method</div>
    ),
    cell: ({ row }) => <div>{row.original.method}</div>,
    enableSorting: false,
  },
];

export default columns;
