'use client';

import { Chip, Tooltip } from '@nextui-org/react';
import { ColumnDef } from '@tanstack/react-table';

import TrendDownArrow from '@/icons/TrendDownArrow';
import TrendUpArrow from '@/icons/TrendUpArrow';
import { Material, MaterialBatch } from '@/types/RawMaterial';

import { MultipleChips, SingleChip } from '../../_components/DynamicChips';

const maxChar = 14;

export const columnsMaterials: ColumnDef<Material>[] = [
  {
    accessorKey: 'materialName',
    header: () => (
      <div className='p-0 hover:bg-grey--50 hover:text-grey--900'>
        Material Name
      </div>
    ),
    cell: ({ row }) => {
      const name = row.original.name || '';
      const showTooltip = name.length > maxChar;

      if (!name) return null;

      return (
        showTooltip ? (
          <Tooltip showArrow={true} color="foreground" content={name}>
            <div className='w-[140px] md:w-[200px] lg:w-[250px] xl:w-[140px]
            flex items-center text-sm h-full text-gray-900 font-medium'>
              <p className='truncate'>{name}</p>
            </div>
          </Tooltip>
        ) : (
          <div className='h-full flex items-center text-gray-900 font-medium text-sm'>{name}</div>
        )
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'GMID',
    header: () => (
      <div className='p-0 hover:bg-grey--50 hover:text-grey--900'>GMID</div>
    ),
    cell: ({ row }) => <div>{row.original.gmid}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'averageRating',
    header: () => (
      <div className='p-0 hover:bg-grey--50 hover:text-grey--900'>
        Average Rating
      </div>
    ),
    cell: ({ row }) => {
      const { trend, value } = row.original.rating;
      if (!value || !trend) return null;

      return (
        <div className='flex gap-3 items-center justify-start'>
          <p>{value}</p>
          <Chip
            size='sm'
            variant='bordered'
            color={trend > 0 ? 'success' : 'danger'}
            classNames={{
              base: `border-[1.5px] border-${trend > 0 ? 'success' : 'danger'}-600`,
            }}
            startContent={trend > 0
              ? <span><TrendUpArrow /></span> : <span className='rotate-180'><TrendDownArrow /></span>}
          >
            <p className={`font-medium text-${trend > 0 ? 'success' : 'danger'}-700`}> {trend}</p>
          </Chip>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'vendors',
    header: () => (
      <div className='p-0 hover:bg-grey--50 hover:text-grey--900'>Vendors</div>
    ),
    cell: ({ row }) => {
      if (row.original.vendors.length) {
        if (row.original.vendors.length > 1) {
          return <>
            <div className='hidden 2xl:flex'><MultipleChips chipData={row.original.vendors} width={'110'}/></div>
            <div className='2xl:hidden'><MultipleChips chipData={row.original.vendors} width={''}/></div>
          </>;
        }
        return row.original.vendors[0].name
        && <>
          <div className='hidden 2xl:flex'><SingleChip chipData={row.original.vendors[0].name} width={'140'}/></div>
          <div className='2xl:hidden'><SingleChip chipData={row.original.vendors[0].name} width={''}/></div>
        </>;
      } return <div>No vendors available</div>;
    },
    enableSorting: false,
  },
];

export const columnsBatches: ColumnDef<MaterialBatch>[] = [

  {
    accessorKey: 'batchId',
    header: () => (
      <div className='p-0 hover:bg-grey--50 hover:text-grey--900'>Batch ID</div>
    ),
    cell: ({ row }) => <div className='text-gray-900 font-medium text-sm'>{row.original.batchId}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'materialName',
    header: () => (
      <div className='p-0 hover:bg-grey--50 hover:text-grey--900'>
        Material Name
      </div>
    ),
    cell: ({ row }) => (
      row.original.material.name
        ? <Chip
          classNames={{ base: 'border-[1.5px] border-gray-600', content: 'font-medium text-xs text-gray-700' }}
          variant='bordered' size='sm'>
          <p className='font-medium'>{row.original.material.name}</p>
        </Chip> : ''
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'score',
    header: () => (
      <div className='p-0 hover:bg-grey--50 hover:text-grey--900'>
        Score
      </div>
    ),
    cell: ({ row }) => <div className='text-start'>{row.original.rating.value}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'vendor',
    header: () => (
      <div className='p-0 hover:bg-grey--50 hover:text-grey--900'>Vendor</div>
    ),
    cell: ({ row }) => (
      row.original.vendor.name
        ? <>
          <div className='hidden 2xl:flex'><SingleChip chipData={row.original.vendor.name} width={110}/></div>
          <div className='2xl:hidden'><SingleChip chipData={row.original.vendor.name} width={''}/></div>
        </>
        : ''
    ),
    enableSorting: false,
  },
];
