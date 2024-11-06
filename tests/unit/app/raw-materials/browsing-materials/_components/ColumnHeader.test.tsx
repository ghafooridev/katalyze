import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ColumnHeader from "@/app/raw-materials/browsing-materials/_components/ColumnHeader";


const mockColumn = {
    getIsSorted: jest.fn(),
    toggleSorting: jest.fn(),
} as any;

describe("ColumnHeader", () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
    test("renders children correctly", () => {
        mockColumn.getIsSorted.mockReturnValue(null);
        render(<ColumnHeader column={mockColumn}>Column Title</ColumnHeader>);
        expect(screen.getByText("Column Title")).toBeInTheDocument();
    });

    test("displays ArrowDownIcon when sorted descending", () => {
        mockColumn.getIsSorted.mockReturnValue("desc");
        render(<ColumnHeader column={mockColumn}>Column Title</ColumnHeader>);
    });

    test("displays rotated ArrowDownIcon when sorted ascending", () => {
        mockColumn.getIsSorted.mockReturnValue("asc");
        render(<ColumnHeader column={mockColumn}>Column Title</ColumnHeader>);
    });

    test("calls toggleSorting when clicked", () => {
        mockColumn.getIsSorted.mockReturnValue(null);
        render(<ColumnHeader column={mockColumn}>Column Title</ColumnHeader>);
        fireEvent.click(screen.getByRole("button"));
        expect(mockColumn.toggleSorting).toHaveBeenCalledWith(false);
    });

    test("toggles sorting direction when clicked", () => {
        mockColumn.getIsSorted.mockReturnValue("asc");
        render(<ColumnHeader column={mockColumn}>Column Title</ColumnHeader>);
        fireEvent.click(screen.getByRole("button"));
        expect(mockColumn.toggleSorting).toHaveBeenCalledWith(true);
    });
});
