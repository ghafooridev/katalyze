import http from '@/lib/http';
import {
  getDocumentById,
  getDocumentEditsById,
  getPendingDocuments,
  rejectPendingDocument,
  approvePendingDocument,
  approveEditsDocument,
  getApprovedDocumentsByFilter,
  getDocumentsByFilter,
  getDocumentDownload,
  getDocumentJson,
  getMultipleDocumentJson,
  getMetrics,
  getMetadata
} from '@/app/documents/_services/index';
import { describe, it, expect, jest } from '@jest/globals';

jest.mock('@/lib/http', () => ({
  get: jest.fn().mockReturnThis(),
  put: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnValue({}),
  blob: jest.fn().mockReturnValue({}),
}));

describe('digitizationApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const id = '123';
  const reason = 'Test rejection reason';

  it('getDocumentById should call http.get with the correct URL', async () => {
    await getDocumentById(id);
    expect(http.get).toHaveBeenCalledWith(`digitization/${id}`);
  });

  it('getDocumentEditsById should call http.get with the correct URL', async () => {
    await getDocumentEditsById(id, 'path');
    expect(http.get).toHaveBeenCalledWith(`digitization/${id}/edits/path`);
  });

  it('getPendingDocuments should call http.get with the correct URL and query params', async () => {
    await getPendingDocuments();
    expect(http.get).toHaveBeenCalledWith(`digitization`, {
      searchParams: { status: 'pending', page: 1, pageSize: 50 },
    });
    await getPendingDocuments(2);
    expect(http.get).toHaveBeenCalledWith(`digitization`, {
    searchParams: { status: 'pending', page: 2, pageSize: 50 },
  });
  });

  it('rejectPendingDocument should call http.put with the correct URL and data', async () => {
    await rejectPendingDocument(id, reason);
    expect(http.put).toHaveBeenCalledWith(`digitization/${id}/reject`, {
      json: { reason },
    });
  });

  it('approvePendingDocument should call http.put with the correct URL and data', async () => {
    const edits = [{ path: 'path', value: 'edit 1' }];
    await approvePendingDocument(id, edits);
    expect(http.put).toHaveBeenCalledWith(`digitization/${id}/approve`, {
      json: { edits },
    });
  });

  it('approveEditsDocument should call http.put with the correct URL and data', async () => {
    const edits = [{ path: 'path', value: 'edit 1' }];
    await approveEditsDocument(id, edits);
    expect(http.put).toHaveBeenCalledWith(`digitization/${id}/edits`, {
      json: { edits },
    });
  });

  it('getApprovedDocumentsByFilter should call http.get with the correct URL and query params', async () => {
    const filter = {
      page: 1,
      desc: true,
      search: 'a',
      orderBy: 'material' as const,
      pageSize: 10,
    };
    const expectedParams = new URLSearchParams({
      status: 'approved',
      page: filter.page.toString(),
      pageSize: filter.pageSize.toString(),
      search: filter.search,
      orderBy: (filter.orderBy ?? '') as string,
      desc: filter.desc.toString(),
    });
    await getApprovedDocumentsByFilter(filter);
    expect(http.get).toHaveBeenCalledWith(`digitization`, {
      searchParams: expectedParams,
    });
  });

  it('getDocumentsByFilter should call http.get with the correct URL and query params', async () => {
    const filter = {
      page: 1,
      desc: true,
      search: 'a',
      orderBy: 'material' as const,
      pageSize: 10,
      status: 'pending' as const,
    };
    const filter2 = {
      page: 1,
      desc: true,
      search: 'a',
      orderBy: 'material' as const,
      pageSize: 10,
      status: 'approved' as const,
    };
    const expectedParams = new URLSearchParams({
      status: filter.status.toString(),
      page: filter.page.toString(),
      pageSize: filter.pageSize.toString(),
      search: filter.search,
      orderBy: (filter.orderBy ?? '') as string,
      desc: filter.desc.toString(),
    });
    const expectedParams2 = new URLSearchParams({
      status: 'approved',
      page: filter2.page.toString(),
      pageSize: filter2.pageSize.toString(),
      search: filter2.search,
      orderBy: (filter2.orderBy ?? '') as string,
      desc: filter2.desc.toString(),
    });
    await getDocumentsByFilter(filter);
    expect(http.get).toHaveBeenCalledWith(`digitization`, {
      searchParams: expectedParams,
    });
    await getDocumentsByFilter(filter2);
    expect(http.get).toHaveBeenCalledWith(`digitization`, {
      searchParams: expectedParams2,
    });
  });

  it('getDocumentDownload should call http.get with the correct URL and query params', async () => {
    await getDocumentDownload(id);
    expect(http.get).toHaveBeenCalledWith(`digitization/${id}/documents`, {
      searchParams: { download: 'true' },
    });
  });

  it('getDocumentJson should call http.get with the correct URL', async () => {
    await getDocumentJson(id);
    expect(http.get).toHaveBeenCalledWith(`digitization/${id}/data`);
  });

  it('getMultipleDocumentJson should call http.get with the correct URL', async () => {
    await getMultipleDocumentJson(id);
    expect(http.get).toHaveBeenCalledWith(`digitization/${id}/data`);
  });

  it('getMetrics should call http.get with the correct URL', async () => {
    await getMetrics();
    expect(http.get).toHaveBeenCalledWith(`digitization/metrics`);
  });
  it('getMetaData should call http.get with the correct URL', async () => {
    await getMetadata();
    expect(http.get).toHaveBeenCalledWith(`materials/metadata`);
  });
});
