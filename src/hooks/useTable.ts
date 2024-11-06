import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

export const useTable = <TData, TValue>({
  data,
  rows,
  columns,
}: {
  data: TData[];
  rows?: number;
  columns: ColumnDef<TData, TValue>[];
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowCount] = useState(rows);
  const [queryData, setQueryData] = useState<TData[]>(data);

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

  return {
    table,
    pagination,
    sorting,
    globalFilter,
    setQueryData,
    setGlobalFilter,
  };
};
