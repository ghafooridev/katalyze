'use client';

import { Chip } from '@nextui-org/react';
import { ColumnDef } from '@tanstack/react-table';

import {
  availabilityColumn,
  batchIdColumn,
  vendorBatchIdColumn,
} from '@/app/raw-materials/browsing-batches/_components/Columns';
import { MaterialBatch } from '@/types/RawMaterial';

import ColumnHeaderSortButton from './ColumnHeader';

const chipStyle = { base: 'border-[1.5px] border-gray-600', content: 'font-medium text-xs text-gray-700' };

const columns: ColumnDef<MaterialBatch>[] = [
  batchIdColumn, vendorBatchIdColumn,
  {
    accessorKey: 'materialId',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Material ID</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      <div className='text-gray-600'>{row.original.material.id}</div>
    ),
    enableSorting: true,
  },

  {
    accessorKey: 'materialName',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Material Name
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      <Chip variant='bordered' size='sm' classNames={chipStyle}>
        {row.original.material.name}
      </Chip>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Rating</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => {
      switch (row.original.rating) {
        case undefined:
        case null:
          return <div></div>;
        default:
          return <div>{row.original.rating.value}</div>;
      }
    },
    enableSorting: true,
  },
  {
    accessorKey: 'vendor',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Vendor</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      <Chip size='sm' variant='bordered' classNames={chipStyle}>
        {row.original.vendor.name}
      </Chip>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'expiresOn',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Expires on
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.expiresOn);
      const formattedDate = date.toLocaleDateString('en-US');
      return <div>{formattedDate}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'expireDate',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Expires On
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      <div className='relative flex justify-center align-center'>
        {row.original.expiryDate}
      </div>
    ),
    enableSorting: true,
  },
  availabilityColumn,
];

export default columns;
