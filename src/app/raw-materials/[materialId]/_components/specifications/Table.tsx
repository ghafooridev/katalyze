'use client';

import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@nextui-org/react';
import {
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

import { useTable } from '@/hooks/useTable';
import FilterColumnIcon from '@/icons/FilterColumnIcon';

import { tableHeaderFactory } from '../common/tableHeaderFactory';

interface BrowsingBatchesDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows?: number;
  isHeader?: boolean;
  isPagination?: boolean;
  onClickRow?: (value: TData) => void
}

const BrowsingBatchesDataTable = <TData, TValue>({
  columns,
  data,
  rows,
  isHeader,
  onClickRow,
}: Readonly<BrowsingBatchesDataTableProps<TData, TValue>>) => {
  const { table } = useTable({ data, rows, columns });
  const onClickTableRow = (value) => {
    if (typeof onClickRow === 'function') onClickRow(value);
  };

  return (
    <Card className='bg-gray-50 rounded-b-none'>
      {
        isHeader && <div className='flex flex-col lg:flex-row items-center
       pb-6 pt-4 lg:py-4 px-6 rounded-tl-lg rounded-tr-lg border bg-white border-b-none'>
          <div className='flex flex-row relative'>
            <h2 className='text-lg font-semibold'>Material Specifications</h2>
          </div>

          <div className='inline-flex w-full pt-4 lg:w-fit lg:py-0 lg:ml-auto'>
            <Popover placement='bottom'>
              <PopoverTrigger>
                <Button isIconOnly variant="light" aria-label="Like">
                  <FilterColumnIcon />
                </Button>

              </PopoverTrigger>
              <PopoverContent className='flex items-start'>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <div key={column.id} className='flex flex-col px-1 py-1'>
                      <div>
                        <Checkbox
                          key={column.id}
                          className='border-grey--300 data-[state=checked]:bg-purple--200-opacity-10
                         data-[state=checked]:border-purple--600 data-[state=unchecked]:bg-white
                          data-[state=unchecked]:border-grey--300 data-[state=checked]:text-purple--600 align-middle'
                          defaultSelected={column.getIsVisible()}
                          onChange={(event) => {
                            column.toggleVisibility(!!event.target.checked);
                          }}
                        ></Checkbox>
                        <span className='ml-1'>{column.id}</span>
                      </div>
                    </div>
                  ))}
              </PopoverContent>
            </Popover>

          </div>
        </div>
      }

      <div className='overflow-auto relative w-full'>
        <Table className='simpleTable'>
          {tableHeaderFactory(table.getHeaderGroups())}
          <TableBody className='bg-white'>
            {
              table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='border-b border-gray-200'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="max-h-7 text-gray-900 text-sm font-normal leading-tight cursor-pointer"
                        onClick={() => onClickTableRow(row.original)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
export default BrowsingBatchesDataTable;
