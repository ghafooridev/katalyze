import { render, screen } from '@testing-library/react';
import columns from '@/app/raw-materials/[materialId]/_components/specifications/Columns';  // Adjust the path as needed
import { MaterialSpecification } from '@/types/RawMaterial';
import { describe, expect } from '@jest/globals';


import "@testing-library/jest-dom/extend-expect";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";

jest.mock(
    "@/app/raw-materials/[materialId]/_components/specifications/ColumnHeader",
    () => ({
        __esModule: true,
        default: ({ children }) => <button>{children}</button>,
    })
);

const data = [
    {
        CharacteristicName: "CharacteristicName",
        averageValue: "averageValue",
        UoM: "UoM",
        range: "range",
        testMethod: "testMethod"
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

        expect(screen.getByText("Characteristic Name")).toBeInTheDocument();
        // expect(screen.getByText("Average Value")).toBeInTheDocument();
        expect(screen.getByText("UoM")).toBeInTheDocument();
        expect(screen.getByText("Range")).toBeInTheDocument();
        expect(screen.getByText("Test Method")).toBeInTheDocument();
    });
});
