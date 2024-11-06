'use client';

import { Chip, Tooltip } from '@nextui-org/react';
import { BoxPlot } from '@nivo/boxplot';
import { ColumnDef } from '@tanstack/react-table';

import { BatchCharacteristicSpecification } from '@/types/RawMaterial';

import ColumnHeaderSortButton from './ColumnHeader';

const chipStyle = { base: 'border-[1.5px] border-gray-600', content: 'font-medium text-xs text-gray-700' };

const columns: ColumnDef<BatchCharacteristicSpecification>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Characteristics Name</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'result',
    header: () => (
      <span className='font-normal min-w-20 h-10 text-small'>Result</span>
    ),
    cell: ({ row }) => <div>{row.original.value}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'unit',
    header: () => (
      <span className='font-normal min-w-20 h-10 text-small'>UoM</span>
    ),
    cell: ({ row }) => <div>{row.original.unit}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'quartiles',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Historical Comparison</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <div className='w-full'>
      {row.original.quartiles ? <div className='relative'>
        <Tooltip
          className='absolute right-full mr-[-100px] xl:left-full xl:ml-[100px]
          top-1/2 transform -translate-x-1/2 -translate-y-1/2'
          color={'foreground'}
          shouldFlip={true}
          placement={window.innerWidth < 1400 ? 'left' : 'right'}
          showArrow={true}
          classNames={{
            base: '',
            content: 'p-3 py-3 px-3 min-w-[200px]',
          }}
          content={
            <ul className='flex flex-col gap-2 justify-between w-full list-disc list-inside'>
              <div className='flex'>
                <li className="max-w-[15px]"></li>
                <div className="flex w-full gap-4">
                  <span className={`${row.original.value as number >= row.original.quartiles[1]
                  && row.original.value as number <= row.original.quartiles[3]
                    ? 'text-success-400'
                    : 'text-danger-400'}`}>
                    {row.original.value} {row.original.unit}
                  </span>
                  <span className='flex ml-auto text-primary-foreground text-right'>Result</span>
                </div>
              </div>
              <div className='flex'>
                <li className="max-w-[15px]"></li>
                <div className="flex w-full gap-4">
                  <span>{row.original.quartiles[0]} {row.original.unit}</span>
                  <span className='flex ml-auto text-primary-foreground text-right'>Minimum</span>
                </div>
              </div>
              <div className='flex'>
                <li className="max-w-[15px]"></li>
                <div className="flex w-full gap-4">
                  <span>{row.original.quartiles[1]} {row.original.unit}</span>
                  <span className='flex ml-auto text-primary-foreground text-right'>1st Quartile</span>
                </div>
              </div>
              <div className='flex'>
                <li className="max-w-[15px]"></li>
                <div className="flex w-full gap-4">
                  <span>{row.original.quartiles[2]} {row.original.unit}</span>
                  <span className='flex ml-auto text-primary-foreground text-right'>Median</span>
                </div>
              </div>
              <div className='flex'>
                <li className="max-w-[15px]"></li>
                <div className="flex w-full gap-4">
                  <span>{row.original.quartiles[3]} {row.original.unit}</span>
                  <span className='flex ml-auto text-primary-foreground text-right'>3rd Quartile</span>
                </div>
              </div>
              <div className='flex'>
                <li className="max-w-[15px]"></li>
                <div className="flex w-full gap-4">
                  <span>{row.original.quartiles[4]} {row.original.unit}</span>
                  <span className='flex ml-auto text-primary-foreground text-right'>Maximum</span>
                </div>
              </div>
            </ul>
          }
        >
          <div>
            <BoxPlot
              width={150}
              height={30}
              layout='horizontal'
              enableGridY={false}
              enableGridX={false}
              subGroups={[]}
              padding={0.6}
              isInteractive={false}
              colors={row.original.value as number - row.original.quartiles[1] >= 0
                && row.original.value as number - row.original.quartiles[3] <= 0 ? '#47CD89' : '#F97066'}
              data={[{
                group: 'A',
                subGroup: '',
                quantiles: row.original.quartiles as any,
                values: row.original.quartiles as any,
                extrema: [0, 10] as any,
                mean: 4,
                n: 100,
              }]} /></div>
        </Tooltip>
      </div> : <div />}
    </div>,

    enableSorting: true,
  },
  {
    accessorKey: 'source',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Source</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => <Chip classNames={chipStyle} size='sm' variant='bordered'>
      {row.original.source}</Chip>,
    enableSorting: true,
  },
  {
    accessorKey: 'range',
    header: () => (
      <span className='font-normal min-w-20 h-10 text-small'>Range</span>
    ),
    cell: ({ row }) => <div>{row.original.range}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'method',
    header: () => (
      <span className='font-normal min-w-20 h-10 text-small'>Test Method</span>
    ),
    cell: ({ row }) => <div>{row.original.method}</div>,
    enableSorting: true,
  },
];

export default columns;
