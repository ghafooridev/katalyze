import { describe, expect } from '@jest/globals';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { columnsBatches, columnsMaterials } from "@/app/raw-materials/overview/_components/Columns";

const materialData = [
  {
    GMID: "GMID",
    rating: { value: "1", trend: "2" },
    vendors: [{
      id: "1",
      name: "vendor name"
    }],
    name: "name",

  },]

const batchData = [
  {
    batchId: "batchId",
    rating: { value: "1", trend: "2" },
    vendor: [{
      id: "1",
      name: "vendor name"
    }],
    material: { name: "name" },

  },]

const Table = ({ columns, data }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

describe("columns configuration", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  test("renders table with columns correctly", () => {
    render(<Table columns={columnsMaterials} data={materialData} />);

    expect(screen.getByText("GMID")).toBeInTheDocument();
  });

  test("renders table with columns correctly", () => {
    render(<Table columns={columnsBatches} data={batchData} />);

    expect(screen.getByText("batchId")).toBeInTheDocument();
  });
});

