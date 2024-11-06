import { render, waitFor } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import PendingReviewLayout from '@/app/documents/tasks/[id]/layout';
import { getDocumentById, getPendingDocuments, getMetrics } from '@/app/documents/_services';
import { ModalProvider } from '@/app/documents/_modals/ModalContext';

jest.mock('@/app/documents/_services', () => ({
  getDocumentById: jest.fn(),
  getPendingDocuments: jest.fn(),
  getMetrics: jest.fn(),
}));

// jest.mock('@/app/documents/_modals/ModalContext', () => ({
//   useModal: () => ({
//     setOpenModal: jest.fn(),
//     setEdits: jest.fn(),
//   }),
// }));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  redirect: jest.fn(),
}));

describe('PendingReviewLayout Component', () => {
  beforeEach(() => {
    (getDocumentById as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Document 1',
      file: { name: 'File 1' },
    });

    (getPendingDocuments as jest.Mock).mockResolvedValue([
      { id: '1', name: 'Document 1', file: { name: 'File 1' } },
      { id: '2', name: 'Document 2', file: { name: 'File 2' } },
    ]);
    (getMetrics as jest.Mock).mockResolvedValue({ pending: 2 });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('fetches and renders document data correctly', async () => {
    const Component = await PendingReviewLayout({ params: { id: '1' } });

    await waitFor(() => {
      expect(getDocumentById).toHaveBeenCalledWith('1');
      expect(getPendingDocuments).toHaveBeenCalled();
    });
  });

  test('renders "Pending Approval" status correctly', async () => {
    (getDocumentById as jest.Mock).mockResolvedValue({
      id: '1',
      file: { name: 'File 1' },
      status: 'pending',
    });

    const Component = await PendingReviewLayout({ params: { id: '1' } });
    const { getByText } = render(Component);

    await waitFor(() => {
      expect(getByText('Pending Approval')).toBeInTheDocument();
    });
  });
  
  test('renders "Approved" status correctly', async () => {
    (getDocumentById as jest.Mock).mockResolvedValue({
      id: '1',
      file: { name: 'File 1' },
      status: 'approved',
    });

    const Component = await PendingReviewLayout({ params: { id: '1' } });
    const { getByText } = render(Component);

    await waitFor(() => {
      expect(getByText('Approved')).toBeInTheDocument();
    });
  });
  test('calculates prevId correctly when currIndex is not the first index', async () => {
    (getPendingDocuments as jest.Mock).mockResolvedValue([
      { id: '1', name: 'Document 1', file: { name: 'File 1' } },
      { id: '2', name: 'Document 2', file: { name: 'File 2' } },
    ]);

    const Component = await PendingReviewLayout({ params: { id: '2' } });
    const { getByText } = render(Component);

    await waitFor(() => {
      expect(getByText('File 1')).toBeInTheDocument();
    });
  });
});