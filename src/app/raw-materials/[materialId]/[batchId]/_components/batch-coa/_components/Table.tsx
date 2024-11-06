'use client';

import { toast } from 'react-toastify';
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@nextui-org/react';
import {
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

import { tableHeaderFactory } from '@/app/raw-materials/[materialId]/_components/common/tableHeaderFactory';
import ToastDownloadContent from '@/components/Toast/ToastDownload';
import { useClientTable } from '@/hooks/useClientTable';
import DownloadIcon from '@/icons/DownloadIcon';

interface BatchCoaProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows?: number;
  isHeader?: boolean;
}

export const handleDownload = (_id: string) => {
  try {
    const json = _id;
    const blob = new Blob([json], { type: 'application/json' });
    const download = document.createElement('a');
    download.setAttribute('href', URL.createObjectURL(blob));
    download.setAttribute('download', 'Digitized_CofA.json');
    document.body.appendChild(download);
    download.click();
    toast.dismiss();
    toast(<ToastDownloadContent id={_id} download={handleDownload} />, {
      closeOnClick: false,
    });
    download.remove();
  } catch (error) {
    throw new Error('Error downloading JSON data:', error);
  }
};

const BatchCoaTable = <TData, TValue>({
  columns,
  data,
  rows,
  isHeader,
}: Readonly<BatchCoaProps<TData, TValue>>) => {
  const { table } = useClientTable({ data, rows, columns });
  return (
    <Card className="bg-gray-50 rounded-b-none h-full">
      {isHeader && (
        <div
          className="flex flex-col lg:flex-row justify-between
       items-center pb-6 pt-4 lg:py-4 px-6 rounded-tl-lg rounded-tr-lg border bg-primary-foreground border-b-none"
        >
          <div className="flex flex-row relative">
            <h2 className="text-lg font-semibold">
              Digitized Certificate of Analysis
            </h2>
          </div>
          <div className=" flex items-center justify-start">
            <Button
              className="ml-2 bg-primary-foreground border-none hover:bg-primary-200
            hover:bg-opacity-50 min-w-5 h-5 px-0 rounded-none"
              onClick={() => {
                handleDownload(JSON.stringify(data));
              }}
            >
              <span className="sr-only">Download</span>
              <DownloadIcon />
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-auto relative h-full w-full">
        <Table
          aria-label="Batch C of A Table"
          className="simpleTable h-full bg-gray-50"
          classNames={{ wrapper: 'h-full bg-gray-50' }}
        >
          {tableHeaderFactory(table.getHeaderGroups())}

          <TableBody className="bg-primary-foreground">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b border-gray-200 bg-primary-foreground"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
export default BatchCoaTable;
