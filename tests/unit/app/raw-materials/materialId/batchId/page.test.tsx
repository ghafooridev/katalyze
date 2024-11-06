import { describe, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { getBatchCharacteristics, getMaterialBatchesById, getMaterialSelector } from '@/app/raw-materials/_services';
import * as service from '@/app/raw-materials/_services';
import BatchCharacteristics from '@/app/raw-materials/[materialId]/[batchId]/page';
import { BatchCharacteristic, MaterialBatch } from '@/types/RawMaterial';
import { useRouter } from 'next/navigation';

jest.mock("@/lib/auth", () => ({
  getAuthSession: jest.fn(),
}));

jest.mock('@/app/raw-materials/_services', () => ({ 
  getBatchCharacteristics: jest.fn(),
  getMaterialBatchesById: jest.fn(),
  getMaterialById: jest.fn(),
  getMaterialSelector: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

jest.mock('react-pdf', () => ({
  Document: () => <div>Document</div>,
  Page: () => <div>Page</div>,
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: '',
    },
  },
}));

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
const mockBatchCharacteristics: BatchCharacteristic = {
  batchId: '1',
  material: {
    id: '1',
    gmid: '2',
    lmid: '3',
    name: 'NZ Amin A'
  },
  rating: {
    trend: 1,
    value: 1,
  },
  status: 'Available',
  vendor: {
    id: '1',
    name: 'Vendor 1',
  },
  vendorBatchId: 'VB1',
  quantity: '100',
  expiryDate: '2023-01-01',
  dates: [
    {
      type: 'Manufacturing',
      value: '2022-01-01',
    },
    {
      type: 'Expiry',
      value: '2023-01-01',
    },
  ],
  specifications: [
    {
      "name": "% Transmittance",
      "value": 75.1,
      "unit": "%",
      "source": "coa",
      "range": "70% or Greater",
      "method": ""
    },
    {
      "name": "Amino Nitrogen (AN)",
      "value": 5.34,
      "unit": "%",
      "source": "coa",
      "range": "3,9 % or Greater",
      "method": ""
    }
  ],
  document: {
  }
};
const mockMaterialBatch: MaterialBatch = {
  id: '1',
  batchId: '1',
  status: 'available',
  rating: {
    value: '5',
    trend: 'up',
  },
  vendor: {
    id: '1',
    name: 'Vendor 1',
  },
  expiryDate: '2023-01-01',
  vendorBatchId: 'VB1',
  material: {
    id: '1',
    gmid: '2',
    lmid: '3',
    name: 'NZ Amin A',
  },
  expiresOn: '2023-01-01',
};

describe('BatchCharacteristics', () => {

  beforeEach(() => {
    (getMaterialBatchesById as jest.Mock).mockResolvedValue(mockMaterialBatch);
    (getMaterialSelector as jest.Mock).mockResolvedValue({ materials: [{ id: '1', name: 'NZ Amin A' }, { id: '2', name: 'B12' }] });
    (getBatchCharacteristics as jest.Mock).mockResolvedValue(mockBatchCharacteristics);
    (service.getMaterialById as jest.Mock).mockResolvedValue(mockMaterials);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });


  it('renders without crashing', async () => {
    render(<BatchCharacteristics params={{ batchId: '1', materialId: '1' }} />);

    expect(getMaterialBatchesById).toHaveBeenCalledWith('1');
    expect(getMaterialSelector).toHaveBeenCalled();
    expect(getBatchCharacteristics).toHaveBeenCalledWith('1', '1');
  });

  it('updates selectedView state when handleToggleView is triggered', () => {
    const component = render(<BatchCharacteristics params={{ batchId: '1', materialId: '1' }} />);
    const buttonElement = component.getByText('Characteristics');
    fireEvent.click(buttonElement);

    expect(buttonElement).toHaveClass('text-gray-900');
  });

  it('renders BatchCharacteristics component without crashing', async () => {
    render(<BatchCharacteristics params={{ batchId: '1', materialId: '1' }} />);
    expect(screen.getByText('Characteristics')).toBeInTheDocument();
  });

  it('fetches batch characteristics data on mount', async () => {
    render(<BatchCharacteristics params={{ batchId: '1', materialId: '1' }} />);
    await waitFor(() => {
      expect(getBatchCharacteristics).toHaveBeenCalledWith('1', '1');
    });
  });

  it('fetches material options on mount', async () => {
    render(<BatchCharacteristics params={{ batchId: '1', materialId: '1' }} />);
    await waitFor(() => {
      expect(getMaterialSelector).toHaveBeenCalled();
    });
  });

  it('fetches batch selector data on mount', async () => {
    render(<BatchCharacteristics params={{ batchId: '1', materialId: '1' }} />);
    await waitFor(() => {
      expect(getMaterialBatchesById).toHaveBeenCalledWith('1');
    });
  });

  it('updates selector state when onChangeSelector is triggered', async () => {
    const pushSpy = useRouter().push;
    const materialId = '1';
    const batchId = '1';
    const newMaterialId = '2';
    const newBatchId = '2';
  
    (getMaterialBatchesById as jest.Mock).mockResolvedValueOnce([{ batchId: newBatchId }]);
  
    render(<BatchCharacteristics params={{ batchId, materialId }} />);
  
    waitFor( () => {
    const materialAutocomplete = screen.getByTestId('material-selector');
      fireEvent.click(materialAutocomplete);
      fireEvent.click(screen.getByText(newMaterialId));
      const option = screen.getByText('2');
      fireEvent.click(option);
      expect(pushSpy).toHaveBeenCalledTimes(1);
      expect(pushSpy).toHaveBeenCalledWith(`/raw-materials/${newMaterialId}/${newBatchId}`);
    })  
    await waitFor(() => {
      expect(getMaterialBatchesById).toHaveBeenCalledTimes(1);
    }); 

  });

  it('toggles view when handleToggleView is triggered', () => {
    render(<BatchCharacteristics params={{ batchId: '1', materialId: '1' }} />);
    const characteristicsButton = screen.getByText('Characteristics');
    const certificateButton = screen.getByText('Certificate of Analysis');

    fireEvent.click(certificateButton);
    expect(certificateButton).toHaveClass('text-gray-900');
    expect(characteristicsButton).not.toHaveClass('text-gray-900');

    fireEvent.click(characteristicsButton);
    expect(characteristicsButton).toHaveClass('text-gray-900');
    expect(certificateButton).not.toHaveClass('text-gray-900');
  });
});