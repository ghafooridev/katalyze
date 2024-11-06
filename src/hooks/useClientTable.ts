import { useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

export const useClientTable = <TData, TValue>({
  data,
  columns,
  rows,
}: {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  rows?: number;
}) => {
  const [rowCount] = useState(rows);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    rowCount,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });
  return {
    table,
    sorting,
  };
};
