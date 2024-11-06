import { DocumentsDataTable } from "@/app/documents/_components/DocumentsDataTable";
import { getDocumentsByFilter, getMultipleDocumentJson } from '@/app/documents/_services/index';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import userEvent from '@testing-library/user-event';

jest.mock("@/lib/auth", () => ({
  getAuthSession: jest.fn(),
}));
jest.mock('@/icons/ArrowLeftIcon', () => ({
    __esModule: true,
    default: () => <svg data-testid='arrow-left-icon' />,
  }));

jest.mock('@/icons/ArrowRightIcon', () => ({
__esModule: true,
default: () => <svg data-testid='arrow-right-icon' />,
}));

jest.mock('@/icons/DownloadIcon', () => ({
__esModule: true,
default: () => <svg data-testid='download-icon' />,
}));

jest.mock('@/icons/FilterColumnIcon', () => ({
__esModule: true,
default: () => <svg data-testid='filter-column-icon' />,
}));

jest.mock('@/icons/SearchIcon', () => ({
__esModule: true,
default: () => <svg data-testid='search-icon' />,
}));

jest.mock('@/app/documents/_services/index');

jest.mock('@/lib/utils', () => ({
  download: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classNames) => classNames.filter(Boolean).join(' ')), // Mock cn function
  download: jest.fn(),
}));


describe('DocumentsDatatable', () => {
    const mockColumns = [
        {
            id: 'fileName',
            header: 'fileName',
            accessorFn: (row) => row.name,
          },
          {
            id: 'originalFile',
            header: 'originalFile',
            accessorFn: (row) => row.status,
          },
    ]

    const mockData = [
        { id: '1', name: 'BACTO', status: 'pending'},
        { id: '2', name: 'COA', status: 'approved' },
      ];
      const mockRows = 2;
      const mockDocStatus = 'pending';

    beforeEach(() => {
        (getDocumentsByFilter as jest.Mock).mockResolvedValue({
            data: mockData,
            pagination: { total: mockRows },
          });
        (getMultipleDocumentJson as jest.Mock).mockResolvedValue({});
    })

  it('renders table correctly', () => {
      render(<DocumentsDataTable columns={mockColumns} data={mockData} rows={mockRows} docStatus={mockDocStatus} />);

      expect(screen.getByText('fileName')).toBeInTheDocument();
      expect(screen.getByText('originalFile')).toBeInTheDocument(); 

      expect(screen.getByText('BACTO')).toBeInTheDocument();
      expect(screen.getByText('COA')).toBeInTheDocument();
  })


  it('updates global filter state and fetches new data', async () => {
    render(<DocumentsDataTable columns={mockColumns} data={mockData} rows={mockRows} docStatus={mockDocStatus} />);

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'BACTO' } });

    await waitFor(() => expect(getDocumentsByFilter).toHaveBeenCalledWith(expect.objectContaining({ search: 'BACTO' })));
  });

  it('handles pagination controls', () => {
    render(<DocumentsDataTable columns={mockColumns} data={mockData} rows={mockRows} docStatus={mockDocStatus} />);

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    expect(getDocumentsByFilter).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }));
  });

  it('handles search input correctly', async () => {
    render(
      <DocumentsDataTable
        columns={mockColumns}
        data={mockData}
        rows={mockRows}
        docStatus="approved"
      />
    );

    await userEvent.type(screen.getByPlaceholderText('Search...'), 'test');

    expect(screen.getByPlaceholderText('Search...')).toHaveValue('test');
  });
    
})



