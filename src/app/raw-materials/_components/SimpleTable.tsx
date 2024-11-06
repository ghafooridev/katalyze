'use client';

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@nextui-org/react';
import {
  flexRender,
} from '@tanstack/react-table';

import { useClientTable } from '@/hooks/useClientTable';
import { useTable } from '@/hooks/useTable';

import { tableHeaderFactory } from '../[materialId]/_components/common/tableHeaderFactory';

interface SimpleTableProps<TData, TValue> {
  title?: string;
  columns: any[];
  data: TData[];
  rows?: number;
  isHeader?: boolean
  isClient?: boolean
  onClickRow?: (value: TData) => void;
}

const SimpleTable = <TData, TValue>({
  columns,
  data,
  rows,
  isHeader,
  title,
  isClient,
  onClickRow,
}: Readonly<SimpleTableProps<TData, TValue>>) => {
  const hook = isClient ? useClientTable : useTable;

  const { table } = hook({
    data,
    rows,
    columns,
  });
  const onClickTableRow = (value: TData) => {
    if (typeof onClickRow === 'function') onClickRow(value);
  };
  return (
    <Card className='bg-gray-50 rounded-s-none rounded-e-lg'>
      {isHeader && <div className='flex flex-col lg:flex-row
       items-center pb-6 pt-4 lg:py-4 px-6 rounded-tl-lg rounded-tr-lg border bg-white border-b-none h-[73px]'>
        <div className='flex flex-row relative'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <div className='relative pl-1.5 pr-1.5 flex justify-center items-center'>

          </div>
        </div>
      </div>}

      <Table className="simpleTable overflow-auto " isHeaderSticky aria-label="Simple Table">
        {tableHeaderFactory(table.getHeaderGroups())}

        <TableBody className='bg-white'>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='border-b border-gray-200'
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    onClick={() => onClickTableRow(row.original)}
                    key={cell.id}
                    className="max-h-7 text-gray-900 text-sm font-normal leading-tight"
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
          )}
        </TableBody>
      </Table>
    </Card>
  );
};
export default SimpleTable;
