import { render, waitFor, screen, act, getByRole } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import Page from '@/app/documents/browse/[id]/page';

jest.mock('@/app/documents/_services', () => ({
  getDocumentById: jest.fn().mockResolvedValue({
    json: { id: 1, name: 'Document 1' },
    flattenJson: [{ id: 1, name: 'Document 1' }],
    data: { id: 1, name: 'Document 1', file: { name: 'Mocked File Name' } },
    file: { name: 'Mocked File Name' },
    status: 'success',
  }),
}));

jest.mock('@/app/documents/_services', () => ({
  getDocumentById: jest.fn(),
}));


jest.mock('@/app/documents/browse/[id]/_components/DualDocumentContainer', () => {
  return {
    DualDocumentContainer: () => {
      return <div>DualDocumentContainer</div>;
    },
  };
});


describe('Page component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('renders DualDocumentContainer correctly with mock data', async () => {

    require('@/app/documents/_services').getDocumentById.mockResolvedValue({
      json: { id: 1, name: 'Document 1' },
      flattenJson: [{ id: 1, name: 'Document 1' }],
      data: { id: 1, name: 'Document 1', file: { name: 'Mocked File Name' } },
      file: { name: 'Mocked File Name' },
      status: 'approved',
    });

    const Component = await Page({ params: { id: '1' } });
    const { getByText } = render(Component);
    
    expect(getByText('DualDocumentContainer')).toBeInTheDocument();
  });
});

