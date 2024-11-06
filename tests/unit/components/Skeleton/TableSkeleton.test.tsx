
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import TableSkeleton from '../../../../src/components/Skeleton/TableSkeleton';

describe('TableSkeleton', () => {
  it('renders without crashing', () => {
    render(<TableSkeleton numberOfColumns={3} numberOfRows={2} />);
    const skeletonElement = screen.getByTestId('table-skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('renders correct number of rows and columns', () => {
    render(<TableSkeleton numberOfColumns={3} numberOfRows={2} />);
    const rows = screen.getAllByTestId('skeleton-row');
    const columns = screen.getAllByTestId('skeleton-column');
    expect(rows.length).toBe(2);
    expect(columns.length).toBe(6); 
  });
});