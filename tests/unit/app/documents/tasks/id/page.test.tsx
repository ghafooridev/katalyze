import { render, waitFor } from '@testing-library/react';
import Page from '@/app/documents/tasks/[id]/page';
import { describe, expect, test } from '@jest/globals';
import { getDocumentById, getMetadata, getPendingDocuments, getMetrics } from '@/app/documents/_services';
import { DualDocumentContainer } from '@/app/documents/tasks/[id]/_components/DualDocumentContainer';

jest.mock('@/app/documents/_services', () => ({
  getDocumentById: jest.fn(),
  getMetadata: jest.fn(),
  getPendingDocuments: jest.fn(),
  getMetrics: jest.fn(),
}));

jest.mock('@/app/documents/tasks/[id]/_components/DualDocumentContainer', () => ({
  DualDocumentContainer: jest.fn(() => <div>Mocked DualDocumentContainer</div>),
}));

describe('Page Component', () => {
  beforeEach(() => {
    (getDocumentById as jest.Mock).mockResolvedValue({
      json: { id: 1, name: 'Document 1' },
      flattenJson: [{ id: 1, name: 'Document 1' }],
    });

    (getMetadata as jest.Mock).mockResolvedValue({
      materials: [{ id: 1, name: 'Material 1' }],
      vendors: [{ id: 1, name: 'Vendor 1' }],
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

  test('renders correctly with fetched data', async () => {
    const Component = await Page({ params: { id: '1' } });
    const { getByText } = render(Component);

    await waitFor(() => {
      expect(getByText('Mocked DualDocumentContainer')).toBeInTheDocument();
    });

    expect(getDocumentById).toHaveBeenCalledWith('1');
    expect(getMetadata).toHaveBeenCalled();
    expect(getPendingDocuments).toHaveBeenCalled();
    expect(DualDocumentContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        currentFile: 'File 1',
        currentId: '1',
        data: {
          flattenJson: [{ id: 1, name: 'Document 1' }],
          json: { id: 1, name: 'Document 1' },
        },
        flattenJson: [{ id: 1, name: 'Document 1' }],
        jsonData: { id: 1, name: 'Document 1' },
        materials: [{ id: 1, name: 'Material 1' }],
        nextId: '2',
        vendors: [{ id: 1, name: 'Vendor 1' }],
      }),
      {}
    );
  });
  test('passes empty array as flattenJson prop when flattenJson is null', async () => {
    (getDocumentById as jest.Mock).mockResolvedValue({
      json: { id: 1, name: 'Document 1' },
      flattenJson: null,
    });
  
    const Component = await Page({ params: { id: '1' } });
    render(Component);
  
    await waitFor(() => {
      expect(DualDocumentContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          flattenJson: [],
        }),
        {}
      );
    });
  });
});