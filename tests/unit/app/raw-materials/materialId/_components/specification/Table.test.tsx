import React from "react";
import { describe, expect } from "@jest/globals";
import { ColumnDef } from "@tanstack/react-table";
import { BatchCharacteristicSpecification } from "@/types/RawMaterial";
import ColumnHeader from '@/app/raw-materials/[materialId]/_components/specifications/ColumnHeader';
import BrowsingBatchesDataTable from '@/app/raw-materials/[materialId]/_components/specifications/Table';


import { render, screen, fireEvent } from '@testing-library/react';

// Mock data for the tests
const columns: ColumnDef<any, any>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => row.original.name,
    },
    {
        accessorKey: 'age',
        header: 'Age',
        cell: ({ row }) => row.original.age,
    },
];

const mockData = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
];

// Mock onClickRow function
const mockOnClickRow = jest.fn();

describe('BrowsingBatchesDataTable', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the table with correct columns and rows', () => {
        render(<BrowsingBatchesDataTable columns={columns} data={mockData} isHeader={true} />);

        // Check if the header is rendered
        expect(screen.getByText('Material Specifications')).toBeInTheDocument();

        // Check if the columns are rendered
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();

        // Check if the rows are rendered
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    test('calls onClickRow when a row is clicked', () => {
        render(
            <BrowsingBatchesDataTable
                columns={columns}
                data={mockData}
                onClickRow={mockOnClickRow}
                isHeader={true}
            />
        );

        // Find and click the first row
        fireEvent.click(screen.getByText('John Doe'));

        // Expect onClickRow to be called with the correct data
        expect(mockOnClickRow).toHaveBeenCalledWith(mockData[0]);
    });

    test('toggles column visibility', () => {
        render(<BrowsingBatchesDataTable columns={columns} data={mockData} isHeader={true} />);

        // Open the popover to toggle column visibility
        const filterButton = screen.getByLabelText('Like');
        fireEvent.click(filterButton);

        // Toggle the visibility of the "Name" column
        const nameCheckbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(nameCheckbox);

        // Verify that the "Name" column is hidden
        expect(screen.queryByText('Name')).not.toBeInTheDocument();
    });
});
