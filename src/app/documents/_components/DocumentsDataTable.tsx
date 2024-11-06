'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
  TableRow,
} from '@nextui-org/react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  getDocumentsByFilter,
  getMultipleDocumentJson,
} from '@/app/documents/_services/index';
import { tableHeaderFactory } from '@/app/raw-materials/[materialId]/_components/common/tableHeaderFactory';
import ToastDownloadMultipleContent from '@/components/Toast/ToastDownloadMultiple';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import DownloadIcon from '@/icons/DownloadIcon';
import FilterColumnIcon from '@/icons/FilterColumnIcon';
import SearchIcon from '@/icons/SearchIcon';
import { cn, download } from '@/lib/utils';

type OrderByType =
  | 'status'
  | 'fileName'
  | 'createdAt'
  | 'material'
  | 'vendor'
  | undefined;
type StatusType = 'pending' | 'approved' | 'rejected' | undefined;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  docStatus: string;
}

export function DocumentsDataTable<TData, TValue>({
  columns,
  data,
  rows,
  docStatus,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const [rowCount, setRowCount] = useState(rows);
  const [queryData, setQueryData] = useState<TData[]>(data);

  useEffect(() => {
    const getSeverData = async () => {
      const [order] = sorting;
      const response = await getDocumentsByFilter({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        search: globalFilter,
        orderBy: (sorting.length > 0 ? order.id : undefined) as OrderByType,
        desc: sorting.length > 0 ? order.desc : undefined,
        status: docStatus.toLowerCase() as StatusType,
      });
      setQueryData(response.data as TData[]);
      setRowCount(response.pagination.total);
    };
    getSeverData();
  }, [
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    pagination,
    sorting,
    docStatus,
    columnFilters,
  ]);

  const table = useReactTable({
    data: queryData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount,
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
      pagination,
    },
    manualSorting: true,
    onSortingChange: setSorting,
  });

  const handleJsonDownload = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedJsonData = selectedRows.map(
      (row) => (row.original as { id: string }).id,
    );
    const responses = await Promise.all(
      selectedJsonData.map((id) => getMultipleDocumentJson(id)),
    );
    const jsonData = responses.reduce(
      (acc, current) => ({ ...acc, ...current }),
      {},
    );
    download(jsonData);
    toast.dismiss();
    toast(<ToastDownloadMultipleContent jsonData={jsonData} download={download} />, {
      closeOnClick: false,
    });
  };

  const checkboxLables = {
    documentType: 'Document Type',
    material: 'Material Name',
    vendor: 'Vendor',
    reviewedBy: 'Approved By',
    createdAt: 'Last Edited',
    status: 'Status',
  };

  return (
    <div className='px-6'>
      <Card className='bg-gray-50'>
        <div
          className="flex flex-col lg:flex-row items-center pb-6 pt-4
      lg:py-5 px-6 rounded-tl-lg rounded-tr-lg border-gray-200 border-1 bg-primary-foreground border-b-none"
        >
          <div className="flex flex-row  text-sm text-primary relative">
            <h2 className="text-gray-900 text-lg font-semibold  leading-7 mr-3">
              {docStatus === 'approved' ? 'Digitized' : 'Pending'} Documents
            </h2>
            <Chip variant='bordered' color='primary'>
              {rows}
            </Chip>
          </div>
          <div className="inline-flex w-full pt-4 lg:w-fit lg:py-0 lg:ml-auto">
            <Input
              variant='bordered'
              placeholder="Search..."
              value={globalFilter}
              className='min-w-[320px]'
              onChange={(event) => {
                setGlobalFilter(event.target.value);
              }}
              startContent={
                <SearchIcon />
              }
            />
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button
                  variant="bordered"
                  className="ml-3 border-none focus:bg-gray-50 px-0 w-10 min-w-10"
                >
                  <span className="sr-only">Columns</span>
                  <FilterColumnIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex items-start">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <div key={column.id} className="flex flex-col px-1 py-1">
                      <div>
                        <Checkbox
                          key={column.id}
                          className="border-gray-300 data-[state=checked]:bg-primary-200-opacity-10
                         data-[state=checked]:border-primary-600 data-[state=unchecked]:bg-primary-foreground
                          data-[state=unchecked]:border-gray-300 data-[state=checked]:text-pimary-600 align-middle"
                          defaultSelected={column.getIsVisible()}
                          onChange={(event) => {
                            column.toggleVisibility(!!event.target.checked);
                          }}
                        ></Checkbox>
                        <span className="ml-1">{checkboxLables[column.id] || column.id}</span>
                      </div>
                    </div>
                  ))}
              </PopoverContent>
            </Popover>

            <Button
              variant="bordered"
              className={`ml-3 border-none focus:bg-gray-50 
            px-0 w-10 min-w-10 ${table.getSelectedRowModel().rows.length === 0
      ? 'opacity-50  pointer-events-none'
      : ''
    } `}
              onClick={handleJsonDownload}
            >
              <span className="sr-only">Download</span>
              <DownloadIcon />
            </Button>
          </div>
        </div>

        {/* Table */}

        <div className='overflow-auto relative w-full'>
          <Table aria-label='Documents Table' className='simpleTable' classNames={{
            thead: cn(
              'rounded-none [&>tr]:first:rounded-none border-b-1 border-gray-200',
              '[&>tr:last-child]:!mt-0 [&>tr:last-child]:!h-0',
            ),
            tr: 'hover:bg-primary-50',
          }}>
            {tableHeaderFactory(table.getHeaderGroups())}

            <TableBody
              className="bg-primary-foreground"
              emptyContent={'No results to display.'}
            >
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-gray-200 border-b-1"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="max-h-7 text-gray-900 text-sm font-normal leading-tight"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div
          className="flex flex-col lg:flex-row items-center
       justify-between px-6 py-4 bg-primary-foreground border
       rounded-bl-lg rounded-br-lg border-t-0 border-gray-200"
        >
          <div className="flex items-center">
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
              <span className="">Previous</span>
            </Button>
          </div>

          <Pagination
            total={table.getPageCount()}
            color="secondary"
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
          <div className="flex items-center">
            <Button
              variant="bordered"
              className="p-0 border-1 hover:bg-gray-50 border-gray-300 text-gray-700
            min-w-none w-auto h-auto py-2 px-[14px] data-[hover=true]:opacity-1"
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <span className="">Next</span>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
