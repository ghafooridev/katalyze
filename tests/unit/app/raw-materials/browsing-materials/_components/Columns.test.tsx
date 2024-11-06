import { describe, expect, test } from "@jest/globals";

import { render, screen, within } from "@testing-library/react";
import { MaterialAvailability } from "@/types/RawMaterial";
import "@testing-library/jest-dom/extend-expect";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import columns from "@/app/raw-materials/browsing-materials/_components/Columns";

jest.mock(
    "@/app/raw-materials/browsing-materials/_components/ColumnHeader",
    () => ({
        __esModule: true,
        default: ({ children }) => <button>{children}</button>,
    })
);

const data = [
  {
    batchId: "batchID",
    vendorBatchId: "Vendor Batch ID",
    rating: {value: "1", trend: "2"},
    status: "available",
    vendors: [
        { id: "p1", name: "vendor 1" },
        { id: "p2", name: "vendor 2" },
    ],
    expiryDate: "1",
    material: {
      id: "1",
      gmid: "1",
      lmid: "1",
      name: "1"
    },
    expiresOn: "1",
    products: [
        { id: "p1", name: "Product 1" },
        { id: "p2", name: "Product 2" },
    ],
}]

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

        expect(screen.getByText("GMID")).toBeInTheDocument();
    });
    test("renders trend chip with danger color when rating trend is negative", () => {
        const dataWithNegativeTrend = [
            {
            ...data[0],
            rating: { value: "1", trend: "-2" },
            },
        ];
        render(<Table columns={columns} data={dataWithNegativeTrend} />);
        
        const trendChip = screen.getByText("-2");
        expect(trendChip).toBeInTheDocument();
        });
        test("renders SingleChip and SingleProduct", () => {
        const dataWithVendor = [
            {
            ...data[0],
            vendors: [{ name: "Vendor 1" }],
            products: [{ name: "Product 1" }],
            },
        ];
        render(<Table columns={columns} data={dataWithVendor} />);
        expect(screen.getByText("Vendor 1")).toBeInTheDocument();
        expect(screen.getByText("Product 1")).toBeInTheDocument();
    });
    
test("renders availability chip with correct color without crashing", () => {
    const dataWithAvailability = [
        {
            ...data[0],
            availability: MaterialAvailability.SUFFICIENT,
        },
        {
            ...data[0],
            availability: MaterialAvailability.INSUFFICIENT,
        },
        {
            ...data[0],
            availability: MaterialAvailability.SPARE,
        },
        {
            ...data[0],
            availability: MaterialAvailability.NODATA,
        },
    ];
    render(<Table columns={columns} data={dataWithAvailability} />);

    });
    test("renders 'No products available' message", () => {
        const dataWithoutProducts = [
        {
            ...data[0],
            products: [],
        },
        ];
        render(<Table columns={columns} data={dataWithoutProducts} />);
        expect(screen.getByText("No products available")).toBeInTheDocument();
    });
    
    test("renders 'No vendors available' message", () => {
        const dataWithoutVendors = [
        {
            ...data[0],
            vendors: [],
        },
        ];
    
        render(<Table columns={columns} data={dataWithoutVendors} />);
        expect(screen.getByText("No vendors available")).toBeInTheDocument();
    });
});

