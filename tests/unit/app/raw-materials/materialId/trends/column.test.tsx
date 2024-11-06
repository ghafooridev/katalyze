import { describe, expect, test } from "@jest/globals";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import columns from "@/app/raw-materials/[materialId]/trends/_components/Columns";

jest.mock(
    "@/app/raw-materials/[materialId]/trends/_components/ColumnHeader",
    () => ({
        __esModule: true,
        default: ({ children }) => <button>{children}</button>,
    })
);

const data = [
    {
        CharacteristicName: "CharacteristicName",
        averageValue: "averageValue",
        range: "range",
    },
];

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
        expect(screen.getByText("material")).toBeInTheDocument();
        expect(screen.getByText("Process")).toBeInTheDocument();
    });
});
