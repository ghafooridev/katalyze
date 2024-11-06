import React from "react";
import { describe, expect } from "@jest/globals";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { getMaterialsFilter } from '@/app/raw-materials/_services/index';
import BrowsingBatches from "@/app/raw-materials/browsing-materials/page";
import * as service from '@/app/raw-materials/_services';
import { Material } from "@/types/RawMaterial";
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock('@/app/raw-materials/_services/index', () => ({
  getMaterialsFilter: jest.fn(),
}));

jest.mock('@/app/raw-materials/browsing-materials/_components/Columns', () => ({
  __esModule: true,
  default: [
    { accessorKey: 'GMID', header: 'GMID' },
    { accessorKey: 'LMID', header: 'LMID' },
    { accessorKey: 'materialName', header: 'Material Name' },
    { accessorKey: 'processDataAvailability', header: 'Process Data Availability' },
    { accessorKey: 'DigitizedVendorBatches', header: 'Digitized Vendor Batches' },
    { accessorKey: 'products', header: 'Products' },
    { accessorKey: 'vendor', header: 'Vendor' },
  ],
}));

const mockMaterial = {
  id: '1',
  gmid: 'Test GMID',
  lmid: 'Test LMID',
  name: 'Test Material',
  products: [
    {
      id: '1',
      name: 'Test Product',
    },
  ],
  vendors: [
    {
      id: '1',
      name: 'Test Vendor',
      country: 'Test Country',
    },
  ],
  category: 'Test Category',
  rating: {
    value: 5,
    trend: 1,
  },
  batchIds: ['1'],
  vendorBatchIds: ['1'],
};

jest.mock('@/components/BreadCrumb', () => () => <div data-testid="breadcrumb">Breadcrumb</div>);
jest.mock('@/app/raw-materials/_components/MaterialNavbar', () => ({ children }: any) => <div>{children}</div>);

describe('BrowsingBatches Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/raw-materials/browsing-materials',
    });

    (getMaterialsFilter as jest.Mock).mockResolvedValue({
      data: [mockMaterial],
      pagination: {
        total: 1,
        page: 1,
        pageSize: 10,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and calls getMaterialsFilter', async () => {
    render(<BrowsingBatches />);

    await waitFor(() => {
      expect(getMaterialsFilter).toHaveBeenCalledWith({
        page: 1,
        desc: false,
        search: '',
        orderBy: '',
        pageSize: 10,
      });
    });

  });
  test('filters through columns', async () => {
    const { getByText } = render(<BrowsingBatches />);
    await waitFor(() => {
      expect(getMaterialsFilter).toHaveBeenCalledWith({
        page: 1,
        desc: false,
        search: '',
        orderBy: '',
        pageSize: 10,
      });
    });
  
  });
});