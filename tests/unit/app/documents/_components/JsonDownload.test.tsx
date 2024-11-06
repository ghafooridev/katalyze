
import { describe, expect, it } from '@jest/globals';
import { handleJsonDownload } from '@/app/documents/_components/JsonDownload';
import { getDocumentJson } from '@/app/documents/_services';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
  dismiss: jest.fn(),
}));

jest.mock('@/app/documents/_services', () => ({
  getDocumentJson: jest.fn().mockImplementation(() => Promise.resolve(new Blob())),
  approveEditsDocument: jest.fn(),
}));

describe('handleJsonDownload', () => {
  let mockGetDocumentJson: jest.MockedFunction<typeof getDocumentJson>;
  let mockBlob: Blob;
  let id: string;
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    mockGetDocumentJson = getDocumentJson as jest.MockedFunction<typeof getDocumentJson>;
    mockBlob = new Blob(['test'], { type: 'text/json' });
    id = '1';
  });

  it('should download the JSON data', async () => {
    const mockGetDocumentJson = getDocumentJson as jest.MockedFunction<typeof getDocumentJson>;
    mockGetDocumentJson.mockRejectedValueOnce(new Error('Failed to download JSON data'));
    const id = '1';
    await expect(handleJsonDownload(id)).rejects.toThrow('Error downloading JSON data');
    expect(mockGetDocumentJson).toHaveBeenCalledTimes(1);
  });
  it('should throw an error when download fails', async () => {
    const id = '1';
    await expect(handleJsonDownload(id)).rejects.toThrow('Error downloading JSON data');
  });
  it('should throw an error if getDocumentJson fails', async () => {
    const mockGetDocumentJson = getDocumentJson as jest.MockedFunction<typeof getDocumentJson>;
    mockGetDocumentJson.mockRejectedValueOnce(new Error('Failed to download JSON data'));
    expect(handleJsonDownload('test-id')).rejects.toThrowError(
      'Error downloading JSON data:'
    );
  });
});