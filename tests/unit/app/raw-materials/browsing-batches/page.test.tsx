import React from "react";
import { describe, expect } from "@jest/globals";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { getMaterialBatchesFilter } from '@/app/raw-materials/_services/index';
import BrowsingBatches from "@/app/raw-materials/browsing-batches/page";
import * as service from '@/app/raw-materials/_services';
import { Material } from "@/types/RawMaterial";
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock('@/app/raw-materials/_services/index', () => ({
  getMaterialBatchesFilter: jest.fn(),
}));

const mockMaterial = {
  category: 'Test Category',
  vendors: [
    {
      id: '1',
      name: 'Test Vendor',
      country: 'Test Country',
    },
  ],
  products: [
    {
      id: '1',
      name: 'Test Product',
    },
  ],
  rating: {
    value: 5,
    trend: 1,
  },
  batchIds: ['1'],
  vendorBatchIds: ['1'],
  plantIds: ['1'],
};

jest.mock('@/components/BreadCrumb', () => () => <div data-testid="breadcrumb">Breadcrumb</div>);
jest.mock('@/app/raw-materials/_components/MaterialNavbar', () => ({ children }: any) => <div>{children}</div>);

describe('BrowsingBatches Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/raw-materials/browsing-batches',
    });

    (getMaterialBatchesFilter as jest.Mock).mockResolvedValue({
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

  it('renders correctly and calls getMaterialBatchesFilter', async () => {
    render(<BrowsingBatches />);

    await waitFor(() => {
      expect(getMaterialBatchesFilter).toHaveBeenCalledWith({
        page: 1,
        desc: false,
        search: '',
        orderBy: '',
        pageSize: 10,
      });
    });

  });
});