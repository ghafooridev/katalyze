'use client';

import { Chip } from '@nextui-org/react';
import { ColumnDef } from '@tanstack/react-table';

import TrendDownArrow from '@/icons/TrendDownArrow';
import TrendUpArrow from '@/icons/TrendUpArrow';
import { Material, MaterialAvailability } from '@/types/RawMaterial';

import { MultipleChips, SingleChip } from '../../_components/DynamicChips';

import ColumnHeaderSortButton from './ColumnHeader';

const setAvailabilityColor = (value) => {
  if (value === MaterialAvailability.SUFFICIENT) return { text: 'text-success-700', border: 'border-success-700' };
  if (value === MaterialAvailability.INSUFFICIENT) return { text: 'text-danger-700', border: 'border-danger-700' };
  if (value === MaterialAvailability.SPARE) return { text: 'text-warning-700', border: 'border-warning-700' };
  return { text: 'text-gray-700', border: 'border-gray-700' };
};

const columns: ColumnDef<Material>[] = [
  {
    accessorKey: 'MATERIALNAME',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Material Name
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'materialId',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>material Id</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div>{row.original.id}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'GMID',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>GMID</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className='text-sm font-medium'>{row.original.gmid}</div>,
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'LMID',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>LMID</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className=''>{row.original.lmid}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'DigitizedVendorBatches',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Digitized Vendor Batches</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className=''>{row.original.digitizedVendorBatches}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'AVAILABILITY',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Process Data Availability</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      <span
        className={`border-[1.5px] rounded-xl py-1 px-2 
          ${setAvailabilityColor(row.original.availability).border} 
          font-medium text-xs 
          ${setAvailabilityColor(row.original.availability).text}`}
      >
        {row.original.availability}
      </span >
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'averageRating',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Average Rating
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => (
      <div className='flex gap-4  items-center'>
        <p>{row.original.rating.value}</p>
        <Chip
          size='sm'
          variant='bordered'
          color={row.original.rating.trend > 0 ? 'success' : 'danger'}
          classNames={{
            base: `border - [1.5px] border - ${row.original.rating.trend > 0 ? 'success' : 'danger'} - 600
            text - ${row.original.rating.trend > 0 ? 'success' : 'danger'} - 700`,
          }}
          startContent={row.original.rating.trend > 0
            ? <span><TrendUpArrow /></span> : <span className='rotate-180'><TrendDownArrow /></span>}
        >
          {row.original.rating.trend}
        </Chip>
      </div>
    ),
    enableSorting: true,
  },

  {
    accessorKey: 'products',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Products</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => {
      if (row.original.products.length) {
        if (row.original.products.length > 1) {
          return <MultipleChips chipData={row.original.products} width={'90'} />;
        }
        return row.original.products[0].name && <SingleChip chipData={row.original.products[0].name} width={120} />;
      } return <div>No products available</div>;
    },
    enableSorting: true,
  },

  {
    accessorKey: 'vendor',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Vendors</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => {
      if (row.original.vendors.length) {
        if (row.original.vendors.length > 1) {
          return <MultipleChips chipData={row.original.vendors} width={'90'} />;
        }
        return row.original.vendors[0].name && <SingleChip chipData={row.original.vendors[0].name} width={120} />;
      } return <div>No vendors available</div>;
    },
    enableSorting: true,
  },

];

export default columns;
