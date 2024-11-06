import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { MaterialBatchesTable, OnBoardedMaterialTable } from '@/app/raw-materials/overview/_components/Tables';
import { describe, expect } from '@jest/globals';


// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock the SimpleTable component
jest.mock('@/app/raw-materials/_components/SimpleTable', () => (props) => (
    <div>
        Mock SimpleTable
        {/* Render mock rows for testing */}
        <div data-testid="table-row" onClick={() => props.onClickRow(props.data[0])}>Mock Row</div>
    </div>
));
// Mock the TableSkeleton component
jest.mock('@/components/Skeleton/TableSkeleton', () => () => (
    <div>Mock TableSkeleton</div>
));

describe('MaterialBatchesTable Component', () => {
    const mockRouterPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockRouterPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the MaterialBatchesTable with data', () => {
        const mockData = [
            { batchId: 'batch1', material: { id: 'material1' }, materialName: 'Material A', vendor: 'Vendor A' },
        ];

        render(<MaterialBatchesTable data={mockData} />);

        expect(screen.getByText('Latest Raw Material Batches')).toBeInTheDocument();
        expect(screen.getByText('See More')).toBeInTheDocument();
        expect(screen.getByText('Mock SimpleTable')).toBeInTheDocument();
    });

    it('should render TableSkeleton when no data is provided', () => {
        render(<MaterialBatchesTable data={[]} />);

        expect(screen.getByText('Mock TableSkeleton')).toBeInTheDocument();
    });

    it('should navigate to the correct URL when row is clicked', async () => {
        const mockData = [
            { batchId: 'batch1', material: { id: 'material1' }, materialName: 'Material A', vendor: 'Vendor A' },
        ];

        render(<MaterialBatchesTable data={mockData} />);

        fireEvent.click(screen.getByTestId('table-row'));

        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/raw-materials/material1/batch1');
        });
    });
});

describe('OnBoardedMaterialTable Component', () => {
    const mockRouterPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockRouterPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the OnBoardedMaterialTable with data', () => {
        const mockData = [
            { id: 'material1', materialName: 'Material A', GMID: 'GMID123', vendors: 'Vendor A' },
        ];

        render(<OnBoardedMaterialTable data={mockData} />);

        expect(screen.getByText('Latest Onboarded Materials')).toBeInTheDocument();
        expect(screen.getByText('See More')).toBeInTheDocument();
        expect(screen.getByText('Mock SimpleTable')).toBeInTheDocument();
    });

    it('should render TableSkeleton when no data is provided', () => {
        render(<OnBoardedMaterialTable data={[]} />);

        expect(screen.getByText('Mock TableSkeleton')).toBeInTheDocument();
    });

    it('should navigate to the correct URL when row is clicked', async () => {
        const mockData = [
            { id: 'material1', materialName: 'Material A', GMID: 'GMID123', vendors: 'Vendor A' },
        ];

        render(<OnBoardedMaterialTable data={mockData} />);

        fireEvent.click(screen.getByTestId('table-row'));

        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/raw-materials/material1/overview');
        });
    });
});
