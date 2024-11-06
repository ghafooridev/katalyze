import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ColumnHeaderSortButton from '@/app/documents/_components/columnHeader';
import { Column } from '@tanstack/react-table';
import { Digitalization } from '@/types/Digitalization.schema';

jest.mock('@/icons/ArrowDownIcon', () => ({
  __esModule: true,
  default: () => <svg data-testid='arrow-down-icon' />,
}));

jest.mock('@/icons/ArrowUpIcon', () => ({
  __esModule: true,
  default: () => <svg data-testid='arrow-up-icon' />,
}));

jest.mock('@/icons/CaretSortIcon', () => ({
  __esModule: true,
  default: () => <svg data-testid='caret-sort-icon' />,
}));

const mockColumn = {
  getIsSorted: jest.fn(),
  toggleSorting: jest.fn(),
} as any;

describe('ColumnHeaderSortButton', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  test('renders children correctly', () => {
    mockColumn.getIsSorted.mockReturnValue(null);
    render(
      <ColumnHeaderSortButton column={mockColumn}>
        Column Title
      </ColumnHeaderSortButton>
    );
    expect(screen.getByText('Column Title')).toBeInTheDocument();
    expect(screen.getByTestId('caret-sort-icon')).toBeInTheDocument();
  });

  test('displays ArrowDownIcon when sorted descending', () => {
    mockColumn.getIsSorted.mockReturnValue('desc');
    render(
      <ColumnHeaderSortButton column={mockColumn}>
        Column Title
      </ColumnHeaderSortButton>
    );
    expect(screen.getByTestId('arrow-down-icon')).toBeInTheDocument();
  });

  test('displays ArrowUpIcon when sorted ascending', () => {
    mockColumn.getIsSorted.mockReturnValue('asc');
    render(
      <ColumnHeaderSortButton column={mockColumn}>
        Column Title
      </ColumnHeaderSortButton>
    );
    expect(screen.getByTestId('arrow-up-icon')).toBeInTheDocument();
  });

  test('calls toggleSorting when clicked', () => {
    mockColumn.getIsSorted.mockReturnValue(null);
    render(
      <ColumnHeaderSortButton column={mockColumn}>
        Column Title
      </ColumnHeaderSortButton>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockColumn.toggleSorting).toHaveBeenCalledWith(false);
  });

  test('toggles sorting direction when clicked', () => {
    mockColumn.getIsSorted.mockReturnValue('asc');
    render(
      <ColumnHeaderSortButton column={mockColumn}>
        Column Title
      </ColumnHeaderSortButton>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockColumn.toggleSorting).toHaveBeenCalledWith(true);
  });
});
