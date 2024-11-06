import { describe, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { MaterialSelector } from '@/app/raw-materials/[materialId]/overview/_components/General';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/raw-materials/[materialId]/MaterialNavSelector', () => {
  return {
    MaterialNavSelector: ({ onChangeSelector, selectedMaterial }) => (
      <div>
        <button onClick={() => onChangeSelector('testMaterialId')}>
          Select Material
        </button>
        <div>{selectedMaterial}</div>
      </div>
    ),
  };
});

jest.mock('@/lib/utils', () => ({
  getMaterialNameById: jest.fn(() => 'Test Material Name'),
}));

describe('MaterialSelector', () => {
  const mockRouter = { push: jest.fn() };
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and handles material selection', () => {
    const materialId = 'initialMaterialId';
    const materialSelector = {};

    render(<MaterialSelector materialId={materialId} materialSelector={materialSelector} />);

    expect(screen.getByText('initialMaterialId')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Select Material'));

    expect(screen.getByText('testMaterialId')).toBeInTheDocument();
    expect(mockRouter.push).toHaveBeenCalledWith('/raw-materials/testMaterialId/overview');
  });
});
