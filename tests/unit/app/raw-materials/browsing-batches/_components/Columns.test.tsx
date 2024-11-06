import { describe, expect, test } from "@jest/globals";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import columns from "@/app/raw-materials/browsing-batches/_components/Columns";

jest.mock(
    "@/app/raw-materials/browsing-batches/_components/ColumnHeader",
    () => ({
        __esModule: true,
        default: ({ children }) => <button>{children}</button>,
    })
);

jest.mock('@/icons/MissingIcon', () => ({
    __esModule: true,
    default: () => <div data-testid="missing-icon" />,
  }));

const data = [
  {
    batchId: "batchID",
    vendorBatchId: "Vendor Batch ID",
    rating: {value: "1", trend: "2"},
    status: "available",
    vendor: {
      id: "1",
      name: "vendor name"
    },
    expiryDate: "1",
    material: {
      id: "1",
      gmid: "1",
      lmid: "1",
      name: "1"
    },
    expiresOn: "1",
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
        render(<Table columns={columns} data={data} />);

        expect(screen.getByText("Batch ID")).toBeInTheDocument();
    });

    test("renders MissingIcon with danger color when expiry date is missing", () => {
        const dataWithMissingExpiryDate = [
            {
            ...data[0],
            expiryDate: "",
            },
        ];
        render(<Table columns={columns} data={dataWithMissingExpiryDate} />);

        const missingIcon = screen.getByTestId('missing-icon');
        expect(missingIcon).toBeInTheDocument();
    });
});

