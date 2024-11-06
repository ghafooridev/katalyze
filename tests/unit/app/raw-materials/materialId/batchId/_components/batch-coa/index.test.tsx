import { render } from '@testing-library/react';
import BatchCoa from '@/app/raw-materials/[materialId]/[batchId]/_components/batch-coa';
import { describe, expect } from '@jest/globals';

jest.mock("@/lib/auth", () => ({
  getAuthSession: jest.fn(),
}));

jest.mock('@/components/Skeleton/TableSkeleton', () => () => <div data-testid="table-skeleton">Mock TableSkeleton</div>);

describe('BatchCoa', () => {
  it('should render BatchCoaTable when item prop is provided', () => {
    const mockItem = [
      {
        name: 'name',
        value:'value',
        unit: 'unit',
        method: 'method',
        source: 'source',
        range: 'range',
      },

    ];

    const { getByText } = render(<BatchCoa item={mockItem} />);
    expect(getByText('name')).toBeInTheDocument();
    expect(getByText('value')).toBeInTheDocument();
    expect(getByText('unit')).toBeInTheDocument();
    expect(getByText('method')).toBeInTheDocument();
  });

  it('should render TableSkeleton when item prop is not provided', () => {
    const { getByTestId } = render(<BatchCoa />);
    const tableSkeleton = getByTestId('table-skeleton');
    expect(tableSkeleton).toBeInTheDocument();
  });

});