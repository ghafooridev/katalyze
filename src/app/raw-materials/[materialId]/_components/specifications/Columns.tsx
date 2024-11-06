'use client';

import { ColumnDef } from '@tanstack/react-table';

import ColumnHeaderSortButton from './ColumnHeader';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Characteristic Name</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'uom',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>UoM</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className=''>{row.original.uom}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'range',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Range</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className=''>{row.original.range}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'testMethod',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Test Method</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className=''>{row.original.testMethod}</div>,
    enableSorting: true,
  },
];

export default columns;
