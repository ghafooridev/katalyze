'use client';

import { useEffect } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Chip,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import {
  flexRender,
} from '@tanstack/react-table';

import { useTable } from '@/hooks/useTable';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import FilterColumnIcon from '@/icons/FilterColumnIcon';
import SearchIcon from '@/icons/SearchIcon';
import { cn } from '@/lib/utils';

interface BasicTableProps<TData> {
  title: string;
  columns: any[];
  data: TData[];
  rows: number;
  isHeader: boolean;
  isPagination: boolean;
  onClickRow?: (value: TData) => void;
  setPage,
  setDesc,
  setOrderBy,
  setSearch,
  setPageSize,
}

const BasicTable = <TData, >({
  columns,
  data,
  rows,
  isHeader,
  isPagination,
  onClickRow,
  setPage,
  setDesc,
  setOrderBy,
  setSearch,
  setPageSize,
  title,
}: Readonly<BasicTableProps<TData>>) => {
  const {
    table, pagination, globalFilter, sorting, setGlobalFilter, setQueryData,
  } = useTable({ data, rows, columns });

  const onClickTableRow = (value: TData) => {
    if (typeof onClickRow === 'function') onClickRow(value);
  };

  useEffect(() => {
    setPage(pagination.pageIndex + 1);
    setDesc(sorting[0]?.desc ?? false);
    setOrderBy(sorting[0]?.id ?? '');
    setSearch(globalFilter);
    setPageSize(pagination.pageSize);
  }, [pagination.pageIndex, sorting, globalFilter, pagination.pageSize]);

  useEffect(() => {
    setQueryData(data);
  }, [data]);

  const checkboxLables = {
    averageRating: 'Average Rating',
    products: 'Products',
    vendor: 'Vendor',
    category: 'Category',
    batchId: 'Batch Id',
    vendorBatchId: 'Vendor Batch Id',
    materialId: 'Material Id',
    MATERIALNAME: 'Material Name',
    rating: 'Rating',
    expireDate: 'Expires On',
    availability: 'Data Availability',
  };

  const pageCount = Math.ceil(rows / pagination.pageSize);

  return (
    <Card className='bg-gray-50'>
      {isHeader && (
        <div className='flex flex-row items-center pb-6 pt-4 lg:py-[22px] px-6
         rounded-tl-lg rounded-tr-lg border bg-white border-b-none h-[73px]'>
          <div className='flex flex-row w-full relative'>
            <h2 className='text-lg font-semibold text-gray-900 leading-7'>{title}</h2>
            <div className='relative pl-2 pr-1.5 flex justify-center items-center'>
              <Chip variant='bordered' color='primary'>
                {rows}
              </Chip>
            </div>
          </div>

          <div className='inline-flex w-full pt-4 lg:w-fit lg:py-0 lg:ml-auto justify-end items-center'>
            <div className='inline-flex  lg:flex-none relative'>
              <Input
                variant='bordered'
                size='sm'
                placeholder='Search...'
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className=' w-[200px] lg:w-[320px]'
                startContent={<SearchIcon />}
              />
            </div>

            <Popover placement='bottom'>
              <PopoverTrigger>
                <Button isIconOnly variant='light' aria-label='Filter'>
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
                          className='border-grey--300
                           data-[state=checked]:bg-purple--200-opacity-10
                           data-[state=checked]:border-purple--600 data-[state=unchecked]:bg-white
                           data-[state=unchecked]:border-grey--300
                           data-[state=checked]:text-purple--600 align-middle'
                          defaultSelected={column.getIsVisible()}
                          onChange={(event) => {
                            column.toggleVisibility(!!event.target.checked);
                          }}
                        ></Checkbox>
                        <span className='ml-1'>{checkboxLables[column.id] || column.id}</span>
                      </div>
                    </div>
                  ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      <div className='overflow-auto relative w-full'>
        <Table aria-label='Basic Table' className='simpleTable' classNames={{
          thead: cn(
            'rounded-none [&>tr]:first:rounded-none border-b-1 border-gray-200',
            '[&>tr:last-child]:!mt-0 [&>tr:last-child]:!h-0',
          ),
          tr: 'hover:bg-primary-50',
        }}>

          <TableHeader className='bg-grey-50'>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <TableColumn key={header.id} className='simpleHeader h-[44px]'>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableColumn>
            ))}
          </TableHeader>

          <TableBody className='bg-white' emptyContent={'No results to display.'}
          >
            {
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='border-b border-gray-200'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='h-[45px] text-gray-900 text-sm font-normal
                      leading-tight cursor-pointer py-0 px-3 max-w-[145px]'
                      onClick={() => onClickTableRow(row.original)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {isPagination && pageCount > 1 && (
        <div className='flex flex-row items-center justify-between px-6 py-4
         bg-white border rounded-bl-lg rounded-br-lg border-t-0'>
          <div className='flex items-center space-x-2'>
            <Button
              variant="bordered"
              size="md"
              className="p-0 border-1 hover:bg-white border-gray-300
              text-gray-700 min-w-none w-auto h-auto py-2 px-[14px]"
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ArrowLeftIcon />
              <span className="hidden lg:block">Previous</span>
            </Button>
          </div>
          <div className='flex items-center justify-center lg:text-sm font-medium'>
            <Pagination
              total={pageCount}
              color='secondary'
              initialPage={table.getState().pagination.pageIndex + 1}
              page={table.getState().pagination.pageIndex + 1}
              onChange={(e) => table.setPageIndex(e - 1)}
              classNames={{
                item: cn(
                  'bg-primary-foreground text-gray-600 shadow-none hover:bg-gray-200',
                  'data-[disabled=true]:text-default-300 data-[disabled=true]:pointer-events-none',
                  '[&[data-hover=true]:not([data-active=true])]:bg-gray-200 active:bg-gray-50',
                ),
                cursor: 'bg-gray-200 text-gray-800',
              }}
            />
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant="bordered"
              className="p-0 border-1 hover:bg-gray-50 border-gray-300 text-gray-700
              min-w-none w-auto h-auto py-2 px-[14px] data-[hover=true]:opacity-1"
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <span className="lg:block hidden">Next</span>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BasicTable;
