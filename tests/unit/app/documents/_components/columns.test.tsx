import { describe, expect, test } from '@jest/globals';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { columns } from '@/app/documents/_components/columns';

jest.mock('@/icons/ApprovalStatusIcon', () => ({
  __esModule: true,
  default: () => <svg data-testid='approval-status-icon' />,
}));
jest.mock('@/icons/FolderIcon', () => ({
  __esModule: true,
  default: () => <svg data-testid='folder-icon' />,
}));
jest.mock('@/icons/PdfIcon', () => ({
  __esModule: true,
  default: () => <svg data-testid='pdf-icon' />,
}));
jest.mock('@/icons/PendingStatusIcon', () => ({
  __esModule: true,
  default: () => <svg data-testid='pending-status-icon' />,
}));

jest.mock('@/app/documents/_components/columnHeader', () => ({
  __esModule: true,
  default: ({ children }) => <button>{children}</button>,
}));

const data = [
  {
    id: 1,
    file: { name: 'Document 1' },
    documentType: 'Type 1',
    material: { name: 'Material 1' },
    vendor: { name: 'Vendor 1' },
    reviewedBy: 'Reviewer 1',
    createdAt: '2023-06-20T12:00:00Z',
    status: 'approved',
  },
  {
    id: 2,
    file: { name: 'Document 2' },
    documentType: 'Type 2',
    material: { name: 'Material 2' },
    vendor: { name: 'Vendor 2' },
    reviewedBy: 'Reviewer 2',
    createdAt: '2023-06-21T12:00:00Z',
    status: 'pending',
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

describe('columns configuration', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  test('renders table with columns correctly', () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText('File Name')).toBeInTheDocument();
    expect(screen.getByText('Original File')).toBeInTheDocument();
    expect(screen.getByText('Document Type')).toBeInTheDocument();
    expect(screen.getByText('Material Name')).toBeInTheDocument();
    expect(screen.getByText('Vendor')).toBeInTheDocument();
    expect(screen.getByText('Approved By')).toBeInTheDocument();
    expect(screen.getByText('Last Edited')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    expect(screen.getAllByText('Document 1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Document 2').length).toBeGreaterThan(0);
    expect(screen.getByText('Type 1')).toBeInTheDocument();
    expect(screen.getByText('Type 2')).toBeInTheDocument();
    expect(screen.getByText('Material 1')).toBeInTheDocument();
    expect(screen.getByText('Material 2')).toBeInTheDocument();
    expect(screen.getByText('Vendor 1')).toBeInTheDocument();
    expect(screen.getByText('Vendor 2')).toBeInTheDocument();
    expect(screen.getByText('Reviewer 1')).toBeInTheDocument();
    expect(screen.getByText('Reviewer 2')).toBeInTheDocument();
    expect(screen.getByText('6/20/2023')).toBeInTheDocument();
    expect(screen.getByText('6/21/2023')).toBeInTheDocument();
    expect(screen.getByTestId('approval-status-icon')).toBeInTheDocument();
    expect(screen.getByTestId('pending-status-icon')).toBeInTheDocument();
  });
  test('renders table with columns correctly when names are empty', () => {
    const page = render(<Table columns={columns} data={[{
      id: 3,
      file: { name: 'Document 3' },
      documentType: 'Type 3',
      material: {},
      vendor: {}
    }]} />);
    const mat = page.getByTestId('empty-material')
    const ven = page.getByTestId('empty-vendor')
    expect(mat).toBeInTheDocument();
    expect(ven).toBeInTheDocument();
  })

  test('renders table with columns correctly when names are long', () => {
    const page = render(<Table columns={columns} data={[{
      id: 3,
      file: { name: 'Document 3' },
      documentType: 'Type 3',
      material: { name: 'Material Name is longer than 24 characters' },
      vendor: { name: 'Vendor Name is longer than 16 characters' }
    }]} />);
    const ven = page.getByText('Vendor Name is longer than 16 characters')
    const mat = page.getByText('Material Name is longer than 24 characters')
    expect(ven).toHaveClass('truncate')
    expect(mat).toHaveClass('truncate')
  })
});
