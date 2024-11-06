import React from "react";
import { describe, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import { ColumnDef } from "@tanstack/react-table";
import BasicTable from "@/components/BasicTable";


describe('Table component', () => {
  const mockData = [
    {
      name: 'name',
      value: 'value',
      unit: 'unit',
      method: 'method',
      source: 'source',
      range: 'range',
    },
  ];

  const mockColumns: ColumnDef<typeof mockData[0]>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <div>Name</div>,
      cell: ({ row }) => <div>{row.original.name}</div>,
      enableSorting: true,
    },
    {
      accessorKey: 'value',
      header: ({ column }) => <div>Value</div>,
      cell: ({ row }) => <div>{row.original.value}</div>,
      enableSorting: true,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders table headers and cells correctly', () => {
    const mockSetPage = jest.fn();
    const mockSetSearch = jest.fn();
    const mockSetOrderBy = jest.fn();
    const mockSetDesc = jest.fn();
    const mockSetPageSize = jest.fn();


    const props = {
      columns: mockColumns,
      data: mockData,
      rows: 10,
      isHeader: true,
      isPagination: true,
      title: 'Test Table',
      setPage: mockSetPage,
      setSearch: mockSetSearch,
      setOrderBy: mockSetOrderBy,
      setDesc: mockSetDesc,
      setPageSize: mockSetPageSize,
    };

    const { getAllByRole } = render(
      <BasicTable {...props} />
    );

    const headerCells = getAllByRole('columnheader');
    expect(headerCells.length).toBe(mockColumns.length);
    expect(headerCells[0]).toHaveTextContent('Name');
    expect(headerCells[1]).toHaveTextContent('Value');

    expect(getAllByRole('rowheader')[0]).toHaveTextContent('name');
    expect(getAllByRole('gridcell')[0]).toHaveTextContent('value');
  });
});