import { describe, expect, test } from '@jest/globals';

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Task from '@/app/documents/tasks/page';
import { getDocumentsByFilter } from '@/app/documents/_services';
import { DocumentsDataTable } from '@/app/documents/_components/DocumentsDataTable';
import { columns } from '@/app/documents/_components/columns';

jest.mock('@/app/documents/_services', () => ({
  getDocumentsByFilter: jest.fn(),
}));

jest.mock('@/app/documents/_components/DocumentsDataTable', () => ({
  DocumentsDataTable: jest.fn(() => <div>Mocked DocumentsDataTable</div>),
}));

describe('task Component', () => {
  beforeEach(() => {
    (getDocumentsByFilter as jest.Mock).mockResolvedValue({
      data: [
        { id: 1, name: 'Document 1' },
        { id: 2, name: 'Document 2' },
      ],
      pagination: { total: 2 },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('renders correctly with fetched data', async () => {
    const Component = await Task();
    const { getByText } = render(Component);

    expect(getByText('Mocked DocumentsDataTable')).toBeInTheDocument();

    expect(DocumentsDataTable).toHaveBeenCalledWith(
      expect.objectContaining({
        columns: columns,
        data: [
          { id: 1, name: 'Document 1' },
          { id: 2, name: 'Document 2' },
        ],
        rows: 2,
        docStatus: 'pending',
      }),
      {}
    );
  });
});
