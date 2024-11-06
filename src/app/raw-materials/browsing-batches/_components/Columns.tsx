'use client';

import { Chip } from '@nextui-org/react';
import { ColumnDef } from '@tanstack/react-table';

import CheckIcon from '@/icons/CheckIcon';
import MissingIcon from '@/icons/MissingIcon';
import { MaterialBatch } from '@/types/RawMaterial';

import { SingleChip } from '../../_components/DynamicChips';

import ColumnHeaderSortButton from './ColumnHeader';

const chipStyle = { base: 'border-[1.5px] border-gray-600', content: 'font-medium text-xs text-gray-700' };

export const availabilityColumn: ColumnDef<MaterialBatch> = {
  accessorKey: 'availability',
  header: ({ column }) => (
    <ColumnHeaderSortButton column={column}>
      Data Availability
    </ColumnHeaderSortButton>
  ),
  cell: ({ row }) => (
    <div className='relative flex justify-center align-center'>
      <Chip
        startContent={row.original.expiryDate.length > 0 ? <CheckIcon /> : <MissingIcon />}
        variant='bordered'
        color={row.original.expiryDate.length > 0 ? 'success' : 'danger'}
        classNames={{
          base: `border-[1.5px] border-${row.original.expiryDate.length > 0 ? 'success' : 'danger'}-600
          text-${row.original.expiryDate.length > 0 ? 'success' : 'danger'}-700`,
        }}
        size='sm'
      >
        {row.original.expiryDate.length > 0 ? 'Available' : 'Missing'}
      </Chip>
    </div>
  ),
  enableSorting: true,
};
export const batchIdColumn: ColumnDef<MaterialBatch> = {
  accessorKey: 'batchId',
  header: ({ column }) => (
    <ColumnHeaderSortButton column={column}>Batch ID</ColumnHeaderSortButton>
  ),
  cell: ({ row }) => <div className='font-medium text-sm'>{row.original.batchId}</div>,
  enableSorting: true,
  enableHiding: false,
};
export const vendorBatchIdColumn: ColumnDef<MaterialBatch> = {
  accessorKey: 'vendorBatchId',
  header: ({ column }) => (
    <ColumnHeaderSortButton column={column}>
      Vendor Batch ID
    </ColumnHeaderSortButton>
  ),
  cell: ({ row }) => <div className=''>{row.original.vendorBatchId}</div>,
  enableSorting: true,
};
export const columns: ColumnDef<MaterialBatch>[] = [
  batchIdColumn,
  vendorBatchIdColumn,
  {
    accessorKey: 'GMId',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>GMID</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      <Chip variant='bordered' size='sm' classNames={chipStyle}>
        {row.original.material.gmid}
      </Chip>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'LMId',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>LMID</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      <Chip variant='bordered' size='sm' classNames={chipStyle}>
        {row.original.material.lmid}
      </Chip>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'materialId',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Material ID</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className=''>{row.original.material.id}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'materialName',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Material Name
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      row.original.material.name ? <SingleChip chipData={row.original.material.name} width={100}/> : ''
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Rating</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className='ml-2'>{row.original.rating.value}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'score',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Score
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div>{row.original.rating.value}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'vendor',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Vendor</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      row.original.vendor.name
        ? <SingleChip chipData={row.original.vendor.name} width={90}/>
        : ''
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'expireDate',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Expires on
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div>{row.original.expiryDate}</div>,
    enableSorting: true,
  },
  availabilityColumn,
];

export default columns;
