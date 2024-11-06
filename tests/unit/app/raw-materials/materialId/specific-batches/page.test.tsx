import { describe, expect } from "@jest/globals";
import { screen, render, act, waitFor } from "@testing-library/react";
import * as service from '@/app/raw-materials/_services';
import SpecificBatch from "@/app/raw-materials/[materialId]/specific-batches/page";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock('@/app/raw-materials/_services', () => ({
  getMaterialBatches: jest.fn(),
  getMaterials: jest.fn(),
  getMaterialsMetrics: jest.fn(),
  getOverViewDeviations: jest.fn(),
  getOverviewProcess: jest.fn(),
  getMaterialSelector: jest.fn(),
  getMaterialsMetricsById: jest.fn(),
  getMaterialDeviations: jest.fn(),
  getMaterialProcess: jest.fn(),
  getMaterialProfileById: jest.fn(),
  getMaterialBatchesByIdFilter: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

// Mock data
const mockMaterialMetrics = [
  { type: 'last_month_avg_rating', value: 4.5, rate: 0.2 },
  { type: 'active_materials', value: 10, rate: 0.1 },
  { type: 'last_month_processed_batches', value: 20, rate: 0.15 },
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
      }, rating: 4.5, vendor: 'Vendor 1', availability: true, expiryDate: "2024-01-31"
    },
  ],
  pagination: { total: 1, page: 1, size: 10 },
};

const mockDeviations = [
  { month: 'January', deviation: { total: 2 } },
];

const mockProcess = [
  { month: 'January', value: 1 },
];

describe('SpecificBatch component', () => {
  const mockParams = { materialId: '1' };

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
    const useRouter = jest.spyOn(require("next/navigation"), "useRouter");
    useRouter.mockReturnValue({
      push: jest.fn(),
    });

    jest.spyOn(service, 'getMaterialBatches').mockResolvedValue(mockBatches as any);
    jest.spyOn(service, 'getMaterials').mockResolvedValue(mockMaterials as any);
    jest.spyOn(service, 'getMaterialsMetrics').mockResolvedValue(mockMaterialMetrics as any);
    jest.spyOn(service, 'getOverViewDeviations').mockResolvedValue(mockDeviations as any);
    jest.spyOn(service, 'getOverviewProcess').mockResolvedValue(mockProcess as any)
    jest.spyOn(service, 'getMaterialSelector').mockResolvedValue({ materials: [{ id: '1', name: 'NZ Amin A' }] } as any);
    jest.spyOn(service, 'getMaterialsMetricsById').mockResolvedValue({ data: [] } as any);
    jest.spyOn(service, 'getMaterialDeviations').mockResolvedValue({ data: [] } as any);
    jest.spyOn(service, 'getMaterialProcess').mockResolvedValue({ data: [] } as any);
    jest.spyOn(service, 'getMaterialProfileById').mockResolvedValue({ data: [] } as any);
    jest.spyOn(service, 'getMaterialBatchesByIdFilter').mockResolvedValue(mockBatches as any);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<SpecificBatch params={mockParams} />);
    const specificBatchComponent = screen.getByTestId('specific-batch');
    expect(specificBatchComponent).toBeInTheDocument();
  });

  test('navigates to batch details on row click', async () => {
    const page = render(<SpecificBatch params={mockParams} />);
    const row = await page.findByText('VB1');
    expect(row).toBeInTheDocument();
    act(() => {
      row.click();
    });
    expect(useRouter().push).toHaveBeenCalledWith('/raw-materials/1/1');
  });
  test('changes material selector and navigates', async () => {
    const page = render(<SpecificBatch params={mockParams} />);

    await waitFor(async () => {
      const selector = page.getByTestId('material-nav-selector');
      expect(selector).toBeInTheDocument();
      await act(async () => {
        userEvent.click(selector);
      });
      expect(selector).toHaveAttribute("aria-expanded", "true");
      const options = page.getAllByRole('option')
      expect(options.length).toBe(1);
      await act(async () => {
        userEvent.click(options[0]);
      });
      expect(selector).toHaveValue('NZ Amin A');
    })

  });
});