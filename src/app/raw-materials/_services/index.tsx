import http from '@/lib/http';
import { parseQueryParams } from '@/lib/utils';
import { RequestOptions } from '@/types/Global';
import {
  ApiResponse,
  BatchCharacteristic,
  Deviations,
  Material,
  MaterialBatch,
  MaterialInsight,
  MaterialMetaData,
  MaterialMetrics,
  MaterialOverviewSpecification,
  MaterialProcessMetaData,
  MaterialProfile,
  MaterialTrends,
  MaterialTrendsProcess,
  Process,
} from '@/types/RawMaterial';

const MATERIAL_BASE_URL = 'materials';

export const getMaterials = async (options?: RequestOptions) => {
  const searchParams = options
    ? new URLSearchParams({
      page: options.page,
      pageSize: options.pageSize,
    })
    : {};

  const { data } = await http
    .get(`${MATERIAL_BASE_URL}`, {
      searchParams,
    })
    .json<ApiResponse<Material[]>>();

  return data;
};

const fetchByFilterFactory = <D,>(url: string) => async ({
  page,
  desc,
  search,
  orderBy,
  pageSize,
}: {
  page: number;
  desc?: boolean;
  search?: string;
  orderBy?: string;
  pageSize: number;
}) => {
  const searchParams = new URLSearchParams({
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
  const response = await http
    .get(url, {
      searchParams,
    })
    .json<ApiResponse<D[]>>();

  return response;
};

export const getMaterialsFilter = fetchByFilterFactory<Material>(
  `${MATERIAL_BASE_URL}`,
);

export const getMaterialsMetrics = async () => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/metrics`)
    .json<ApiResponse<MaterialMetrics[]>>();

  return data;
};

export const getMaterialBatches = async () => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/batches`)
    .json<ApiResponse<MaterialBatch[]>>();

  return data;
};

export const getMaterialBatchesFilter = fetchByFilterFactory<MaterialBatch>(
  `${MATERIAL_BASE_URL}/batches`,
);

export const getMaterialsMetricsById = async (materialId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/metrics`)
    .json<ApiResponse<MaterialMetrics[]>>();

  return data;
};

export const getMaterialProfileById = async (materialId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/profile`)
    .json<ApiResponse<MaterialProfile[]>>();
  return data;
};

export const getMaterialInsights = async () => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/insight`)
    .json<ApiResponse<MaterialInsight[]>>();
  return data;
};

export const getMaterialInsightsById = async (materialId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/insight/material/${materialId}`)
    .json<ApiResponse<MaterialInsight[]>>();
  return data;
};

export const postMaterialInsightComment = async (id, payload) => {
  const { data } = await http
    .post(`${MATERIAL_BASE_URL}/${id}/insight`, { json: payload })
    .json<ApiResponse<MaterialInsight>>();
  return data;
};

export const getBatchCharacteristics = async (materialId, batchId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/batches/${batchId}`)
    .json<ApiResponse<BatchCharacteristic>>();

  return data;
};

export const getOverViewDeviations = async () => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/deviations`)
    .json<ApiResponse<Deviations[]>>();

  return data;
};

export const getMaterialDeviations = async (materialId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/deviations`)
    .json<ApiResponse<Deviations[]>>();

  return data;
};

export const getOverviewProcess = async () => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/processed`)
    .json<ApiResponse<Process[]>>();

  return data;
};

export const getMaterialProcess = async (materialId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/processed`)
    .json<ApiResponse<Process[]>>();

  return data;
};

export const getMaterialById = async (materialId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}`)
    .json<ApiResponse<Material>>();

  return data;
};

export const getMaterialBatchesById = async (materialId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/batches`)
    .json<ApiResponse<MaterialBatch[]>>();

  return data;
};

export const getMaterialSpecifications = async (materialId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/specs`)
    .json<ApiResponse<MaterialOverviewSpecification>>();

  return data;
};

export const getMaterialSelector = async () => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/metadata`)
    .json<ApiResponse<MaterialMetaData>>();

  return data;
};

export const getProcessDropDowns = async (materialId) => {
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/correlation/metadata`)
    .json<ApiResponse<MaterialProcessMetaData[]>>();
  return data;
};

export const getMaterialCorrelation = async (materialId, params) => {
  const searchParams = parseQueryParams(params);
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/correlation`, { searchParams })
    .json<ApiResponse<MaterialProcessMetaData[]>>();

  return data;
};

export const getMaterialTrends = async (materialId, params) => {
  const searchParams = parseQueryParams(params);
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/trends`, { searchParams })
    .json<ApiResponse<MaterialTrends[]>>();

  return data;
};

export const getMaterialTrendsRadioData = async (materialId, params) => {
  const searchParams = parseQueryParams(params);
  const { data } = await http
    .get(`${MATERIAL_BASE_URL}/${materialId}/process-attributes`, { searchParams })
    .json<ApiResponse<MaterialTrendsProcess>>();

  return data;
};

export const getMaterialBatchesByIdFilter = (materialId: string, filter) => fetchByFilterFactory<MaterialBatch>(
  `${MATERIAL_BASE_URL}/${materialId}/batches`,
)(filter);
