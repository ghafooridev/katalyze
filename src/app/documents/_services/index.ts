import http from '@/lib/http';
import { CreateEditEvent } from '@/types/CreateEditEvent.schema';
import { Digitalization } from '@/types/Digitalization.schema';
import { DigitalizationFilter } from '@/types/DigitalizationFilter.schema';
import { DigitalizationMetrics } from '@/types/DigitalizationMetrics.schema';
import { EditPathEvent } from '@/types/EditPathEvent.schema';

const DIGITIZATION_BASE_URL = 'digitization';
interface ApiResponse<T> {
  data: T;
}

type MetaData = {
  materials: Array<{
    id: string;
    name: string;
  }>;
  vendors: Array<{
    id: string;
    name: string;
  }>;
};

type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};
interface ApiResponseWithPagination<T> extends ApiResponse<T> {
  pagination: Pagination;
}

export const getDocumentById = async (id: string) => {
  const { data } = await http
    .get(`${DIGITIZATION_BASE_URL}/${id}`)
    .json<ApiResponse<Digitalization>>();

  return data;
};

export const getDocumentEditsById = async (id: string, path: string) => {
  const { data } = await http
    .get(`${DIGITIZATION_BASE_URL}/${id}/edits/${path}`)
    .json<ApiResponse<EditPathEvent[]>>();
  return data;
};

export async function getPendingDocuments(page?: number) {
  const { data } = await http
    .get(`${DIGITIZATION_BASE_URL}`, {
      searchParams: { status: 'pending', page: page ?? 1, pageSize: 50 },
    })
    .json<ApiResponse<Digitalization[]>>();
  return data;
}

export function rejectPendingDocument(id: string, reason: string) {
  return http
    .put(`${DIGITIZATION_BASE_URL}/${id}/reject`, {
      json: { reason },
    })
    .json();
}

export function approvePendingDocument(id: string, edits: CreateEditEvent[]) {
  return http
    .put(`${DIGITIZATION_BASE_URL}/${id}/approve`, {
      json: { edits },
    })
    .json();
}

export function approveEditsDocument(id: string, edits: CreateEditEvent[]) {
  return http
    .put(`${DIGITIZATION_BASE_URL}/${id}/edits`, {
      json: { edits },
    })
    .json();
}

export function getApprovedDocumentsByFilter({
  page,
  desc,
  search,
  orderBy,
  pageSize,
}: DigitalizationFilter) {
  const searchParams = new URLSearchParams({
    status: 'approved',
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  if (search) {
    searchParams.append('search', search);
  }
  if (orderBy) {
    searchParams.append('orderBy', orderBy);
  }
  if (desc) {
    searchParams.append('desc', desc.toString());
  }
  return http
    .get(`${DIGITIZATION_BASE_URL}`, {
      searchParams,
    })
    .json<ApiResponseWithPagination<Digitalization[]>>();
}
export function getDocumentsByFilter({
  page,
  desc,
  search,
  orderBy,
  pageSize,
  status,
}: DigitalizationFilter) {
  const searchParams = new URLSearchParams({
    status: status?.toString() ?? 'all',
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  if (search) {
    searchParams.append('search', search);
  }
  if (orderBy) {
    searchParams.append('orderBy', orderBy);
  }
  if (desc) {
    searchParams.append('desc', desc.toString());
  }
  return http
    .get(`${DIGITIZATION_BASE_URL}`, {
      searchParams,
    })
    .json<ApiResponseWithPagination<Digitalization[]>>();
}

export const getDocumentDownload = async (id: string) => {
  const response = await http.get(`${DIGITIZATION_BASE_URL}/${id}/documents`, {
    searchParams: { download: 'true' },
  });

  return response.blob();
};

export const getDocumentJson = async (id: string) => {
  const response = await http.get(`${DIGITIZATION_BASE_URL}/${id}/data`);
  return response.blob();
};

export const getMultipleDocumentJson = async (id: string) => {
  const response = await http.get(`${DIGITIZATION_BASE_URL}/${id}/data`);
  const json = await response.json<ApiResponse<Digitalization>>();
  return { [id]: json };
};

export const getMetrics = async () => {
  const json = await http
    .get(`${DIGITIZATION_BASE_URL}/metrics`)
    .json<{ data: DigitalizationMetrics }>();
  return json.data;
};

export const getMetadata = async () => {
  const json = await http.get('materials/metadata').json<{ data: MetaData }>();
  return json.data;
};
