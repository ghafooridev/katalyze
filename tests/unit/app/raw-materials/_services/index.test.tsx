
import http from '@/lib/http';
import {
  getMaterials,
  getMaterialsFilter,
  getMaterialsMetrics,
  getMaterialBatches,
  getMaterialProfileById,
  getBatchCharacteristics,
  getOverViewDeviations,
  getMaterialDeviations,
  getMaterialProcess,
  getMaterialById,
  getMaterialBatchesById,
  getMaterialSelector,
  getProcessDropDowns,
  getMaterialCorrelation,
  getMaterialTrends,
  getMaterialTrendsRadioData,
  getOverviewProcess,
  getMaterialBatchesByIdFilter,
  getMaterialSpecifications,
} from '@/app/raw-materials/_services';

import { describe, it, expect, jest } from '@jest/globals';

// Mock the HTTP client
jest.mock('@/lib/http');

describe('Material Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('should fetch materials', async () => {
  //   const mockMaterials = [{ id: 1, name: 'Material 1' }];
  //   (http.get as jest.Mock).mockReturnValue({
  //     json: jest.fn().mockResolvedValue({ data: mockMaterials } as never),
  //   });


  //   const filter = {
  //     page: 1,
  //     desc: true,
  //     search: 'a',
  //     orderBy: 'material' as const,
  //     pageSize: 10,
  //   };
  //   const expectedParams = {
  //     page: filter.page.toString(),
  //     pageSize: filter.pageSize.toString(),
  //     search: filter.search,
  //     orderBy: (filter.orderBy ?? '') as string,
  //     desc: filter.desc.toString(),
  //   };

  //   const response = await getMaterials();
  //   expect(http.get).toHaveBeenCalledWith('materials', { searchParams: expectedParams });
  //   expect(response.data).toEqual(mockMaterials);
  // });

  it('should fetch materials with filters', async () => {
    const mockMaterials = [{ id: 1, name: 'Material 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockMaterials } as never),
    });

    const filters = {
      page: 1,
      desc: true,
      search: 'test',
      orderBy: 'name',
      pageSize: 10,
    };
    const response = await getMaterialsFilter(filters);
    expect(http.get).toHaveBeenCalledWith('materials', {
      searchParams: expect.any(URLSearchParams),
    });
    expect(response.data).toEqual(mockMaterials);
  });

  it('should fetch material metrics', async () => {
    const mockMetrics = [{ id: 1, metric: 'Metric 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockMetrics } as never),
    });

    const response = await getMaterialsMetrics();
    expect(http.get).toHaveBeenCalledWith('materials/metrics');
    expect(response).toEqual(mockMetrics);
  });

  it('should fetch material batches', async () => {
    const mockBatches = [{ id: 1, batch: 'Batch 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockBatches } as never),
    });

    const response = await getMaterialBatches();
    expect(http.get).toHaveBeenCalledWith('materials/batches');
    expect(response).toEqual(mockBatches);
  });

  it('should fetch material profile by ID', async () => {
    const mockProfile = [{ id: 1, profile: 'Profile 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockProfile } as never),
    });

    const response = await getMaterialProfileById(1);
    expect(http.get).toHaveBeenCalledWith('materials/1/profile');
    expect(response).toEqual(mockProfile);
  });

  it('should fetch batch characteristics by material and batch ID', async () => {
    const mockCharacteristics = { id: 1, characteristic: 'Characteristic 1' };
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockCharacteristics } as never),
    });

    const response = await getBatchCharacteristics(1, 1);
    expect(http.get).toHaveBeenCalledWith('materials/1/batches/1');
    expect(response).toEqual(mockCharacteristics);
  });

  it('should fetch overview deviations', async () => {
    const mockDeviations = [{ id: 1, deviation: 'Deviation 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockDeviations } as never),
    });

    const response = await getOverViewDeviations();
    expect(http.get).toHaveBeenCalledWith('materials/deviations');
    expect(response).toEqual(mockDeviations);
  });

  it('should fetch material deviations by material ID', async () => {
    const mockDeviations = [{ id: 1, deviation: 'Deviation 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockDeviations } as never),
    });

    const response = await getMaterialDeviations(1);
    expect(http.get).toHaveBeenCalledWith('materials/1/deviations');
    expect(response).toEqual(mockDeviations);
  });
  it('should fetch material by ID', async () => {
    const mockMaterial = { id: 1, name: 'Material 1' };
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockMaterial } as never),
    });

    const response = await getMaterialById(1);
    expect(http.get).toHaveBeenCalledWith('materials/1');
    expect(response).toEqual(mockMaterial);
  });

  it('should fetch material batches by ID', async () => {
    const mockBatches = [{ id: 1, batch: 'Batch 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockBatches } as never),
    });

    const response = await getMaterialBatchesById(1);
    expect(http.get).toHaveBeenCalledWith('materials/1/batches');
    expect(response).toEqual(mockBatches);
  });

  it('should fetch material selector', async () => {
    const mockMetaData = { id: 1, metaData: 'MetaData 1' };
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockMetaData } as never),
    });

    const response = await getMaterialSelector();
    expect(http.get).toHaveBeenCalledWith('materials/metadata');
    expect(response).toEqual(mockMetaData);
  });

  it('should fetch process dropdowns for material', async () => {
    const mockProcessMetaData = [{ id: 1, processMetaData: 'Process MetaData 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockProcessMetaData } as never),
    });

    const response = await getProcessDropDowns(1);
    expect(http.get).toHaveBeenCalledWith('materials/1/correlation/metadata');
    expect(response).toEqual(mockProcessMetaData);
  });

  it('should fetch material correlation data by ID with params', async () => {
    const mockCorrelationData = [{ id: 1, correlation: 'Correlation Data 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockCorrelationData } as never),
    });

    const params = { filter: 'test' };
    const response = await getMaterialCorrelation(1, params);
    expect(http.get).toHaveBeenCalledWith('materials/1/correlation', {
      searchParams: expect.any(URLSearchParams),
    });
    expect(response).toEqual(mockCorrelationData);
  });

  it('should fetch material trends by ID with params', async () => {
    const mockTrends = [{ id: 1, trend: 'Trend 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockTrends } as never),
    });

    const params = { filter: 'trend-filter' };
    const response = await getMaterialTrends(1, params);
    expect(http.get).toHaveBeenCalledWith('materials/1/trends', {
      searchParams: expect.any(URLSearchParams),
    });
    expect(response).toEqual(mockTrends);
  });

  it('should fetch material trends radio data by ID with params', async () => {
    const mockTrendsProcess = { id: 1, trendsProcess: 'Trends Process 1' };
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockTrendsProcess } as never),
    });

    const params = { filter: 'radio-filter' };
    const response = await getMaterialTrendsRadioData(1, params);
    expect(http.get).toHaveBeenCalledWith('materials/1/process-attributes', {
      searchParams: expect.any(URLSearchParams),
    });
    expect(response).toEqual(mockTrendsProcess);
  });

  it('should fetch batch characteristics by ID and filter', async () => {
    const mockBatches = [{ id: 1, batch: 'Batch 1' }];
    const filter = { page: 1, pageSize: 10 };
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockBatches } as never),
    });

    const response = await getMaterialBatchesByIdFilter('1', filter);
    expect(http.get).toHaveBeenCalledWith('materials/1/batches', {
      searchParams: expect.any(URLSearchParams),
    });
    expect(response.data).toEqual(mockBatches);
  });

  it('should fetch material process by ID', async () => {
    const mockProcess = [{ id: 1, process: 'Process 1' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockProcess } as never),
    });

    const response = await getMaterialProcess(1);
    expect(http.get).toHaveBeenCalledWith('materials/1/processed');
    expect(response).toEqual(mockProcess);
  });

  it('should fetch overview process data', async () => {
    const mockProcess = [{ id: 1, process: 'Overview Process' }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockProcess } as never),
    });

    const response = await getOverviewProcess();
    expect(http.get).toHaveBeenCalledWith('materials/processed');
    expect(response).toEqual(mockProcess);
  });
  it('should fetch material Specs by ID', async () => {
    const mockSpecs = [{ id: "1", specs: [{ name: '1', uom: '%', range: ">1", testMethod: 'formal' }] }];
    (http.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue({ data: mockSpecs } as never),
    });

    const response = await getMaterialSpecifications(1);
    expect(http.get).toHaveBeenCalledWith('materials/1/specs');
    expect(response).toEqual(mockSpecs);
  });
});
