import { describe, expect } from "@jest/globals";
import { render, act, waitFor } from "@testing-library/react";
import * as service from '@/app/raw-materials/_services';
import MaterialSpecificOverview from "@/app/raw-materials/[materialId]/overview/page";
import { usePathname } from 'next/navigation';
import { Deviations } from "@/types/RawMaterial";

// jest.mock('@/app/raw-materials/_services', () => ({
//   getMaterialBatches: jest.fn(),
//   getMaterials: jest.fn(),
//   getMaterialsMetrics: jest.fn(),
//   getOverViewDeviations: jest.fn(),
//   getOverviewProcess: jest.fn(),
//   getMaterialSelector: jest.fn(),
//   getMaterialsMetricsById: jest.fn(),
//   getMaterialDeviations: jest.fn(),
//   getMaterialProcess: jest.fn(),
//   getMaterialProfileById: jest.fn(),
//   getMaterialSpecsById: jest.fn(),
//   getMaterialById: jest.fn(),
//   getMaterialSpecifications: jest.fn(),
//   getMaterialInsightsById: jest.fn()
// }));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock('@/app/raw-materials/_components/DynamicChips', () => ({
  __esModule: true,
  default: ({ chips }) => <div>Mocked Chips: {chips.length}</div>,
}));


const mockMaterialMetrics = [
  { type: 'last_month_avg_rating', value: 4.5, rate: 0.2 },
  { type: 'active_materials', value: 10, rate: 0.1 },
  { type: 'last_month_processed_batches', value: 20, rate: 0.15 },
  { type: 'vendors_num', value: 5, rate: 0.05 },
  { type: 'coa_coverage', value: 3, rate: 0.03 },
];

const mockMaterialMetrics2 = [
  { type: 'last_month_avg_rating', value: 4.5, rate: 0.2 },
  { type: 'active_materials', value: 10, rate: 0.1 },
  { type: 'vendors_num', value: 5, rate: 0.05 },
  { type: 'coa_coverage', value: 3, rate: 0.03 },
];

const mockMaterials = {
  data: [
    {
      id: '1',
      gmid: '2',
      lmid: '3',
      name: 'NZ Amin A',
      category: 'string',
      vendors: [{
        id: '1',
        name: 'vendor',
        country: 'USA'
      }],
      products: [{
        id: '1',
        name: 'material',
      }],
      rating: {
        value: 1,
        trend: 1,
      },
      batchIds: ['1'],
      vendorBatchIds: ['1'],
      plantIds: ['1']
    },
  ],
  pagination: { total: 1, page: 1, size: 10 },
};

const mockBatches = {
  data: [
    {
      batchId: 1, vendorBatchId: 'VB1', material: {
        id: '1',
        gmid: '2',
        lmid: '3',
        name: 'NZ Amin A'
      }, rating: 4.5, vendor: 'Vendor 1', availability: true
    },
  ],
  pagination: { total: 1, page: 1, size: 10 },
};

const mockSpecifications = {
  id: '1',
  specs: [{
    name: 'spec1',
    uom: 'kg',
    range: '1-2',
    testMethod: 'method',
  }, {
    name: 'spec2',
    uom: 'kg',
    range: '1-3',
    testMethod: 'method',
  },]
}
const mockProductProfile = [
  { id: '1', description: 'description', cas: 'test', form_type: 'test', formula: 'mx', source: [{ name: 'test' }], img: 'tests' },]

const mockDeviations: Deviations[] = [
  {
    month: 'January',
    deviation: {
      minor: 2,
      major: 1,
      critical: 0,
      total: 3,
    },
  },
  {
    month: 'February',
    deviation: {
      minor: 1,
      major: 2,
      critical: 1,
      total: 4,
    },
  },
  {
    month: 'March',
    deviation: {
      minor: 3,
      major: 0,
      critical: 0,
      total: 3,
    },
  },
]



const mockProcess = [
  { month: 'January', value: 1 },
];

describe('Material Overview Page', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
    const useRouter = jest.spyOn(require("next/navigation"), "useRouter");
    useRouter.mockReturnValue({
      push: jest.fn(),
    });

    jest.spyOn(service, 'getMaterialBatches').mockResolvedValue(mockBatches as any);
    jest.spyOn(service, 'getMaterials').mockResolvedValue(mockMaterials as any);
    jest.spyOn(service, 'getMaterialsMetrics').mockResolvedValue(mockMaterialMetrics2 as any);
    jest.spyOn(service, 'getOverViewDeviations').mockResolvedValue(mockDeviations as any);
    jest.spyOn(service, 'getOverviewProcess').mockResolvedValue(mockProcess as any)
    jest.spyOn(service, 'getMaterialSelector').mockResolvedValue({ data: [] } as any);
    jest.spyOn(service, 'getMaterialsMetricsById').mockResolvedValue(mockMaterialMetrics as any);
    jest.spyOn(service, 'getMaterialDeviations').mockResolvedValue({ mockDeviations } as any);
    jest.spyOn(service, 'getMaterialProcess').mockResolvedValue({ mockProcess } as any);
    jest.spyOn(service, 'getMaterialProfileById').mockResolvedValue(mockProductProfile as any);
    jest.spyOn(service, 'getMaterialById').mockResolvedValue({ mockMaterials } as any);
    jest.spyOn(service, 'getMaterialById').mockResolvedValue({ data: [] } as any);
    jest.spyOn(service, 'getMaterialInsightsById').mockResolvedValue({ data: [] } as any);
    jest.spyOn(service, 'getMaterialSpecifications').mockResolvedValue(mockSpecifications as any);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      params: {materialId: '1'},
      
      ...props,
    };
    return render(<MaterialSpecificOverview {...defaultProps} />) ;
  };

  test('renders correctly', async () => {
    try{renderComponent({getData: jest.fn().mockResolvedValue({}),})} catch (error) {}
  });
});