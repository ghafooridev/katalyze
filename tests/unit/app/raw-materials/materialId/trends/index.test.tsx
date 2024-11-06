import { describe, expect } from "@jest/globals";
import { screen, render, act, renderHook } from "@testing-library/react";
import * as service from '@/app/raw-materials/_services';
import Trends from "@/app/raw-materials/[materialId]/trends/page";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { transformChartData, transformTableData } from '@/app/raw-materials/[materialId]/trends/utils';

jest.mock('@/app/raw-materials/_services', () => ({
    getMaterialSelector: jest.fn(),
    getMaterialTrends: jest.fn(),
    getMaterialTrendsRadioData: jest.fn(),
    getProcessDropDowns: jest.fn()
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


describe('SpecificBatch component', () => {
    const mockParams = { materialId: 'testid' };

    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/');
        const useRouter = jest.spyOn(require("next/navigation"), "useRouter");
        useRouter.mockReturnValue({
            push: jest.fn(),
        });

        jest.spyOn(service, 'getMaterialSelector').mockResolvedValue({ data: [] } as any);
        jest.spyOn(service, 'getMaterialTrendsRadioData').mockResolvedValue({ data: [] } as any);
        jest.spyOn(service, 'getProcessDropDowns').mockResolvedValue({ data: [] } as any);

    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', async () => {
        render(<Trends params={mockParams} />);
        const specificBatchComponent = screen.getByTestId('trends');
        expect(specificBatchComponent).toBeInTheDocument();
        expect(screen.getByTestId('trends')).toBeInTheDocument();
        // expect(screen.getByTestId('download')).toBeInTheDocument();
    });

});
describe('transformChartData function', () => {
    it('transforms response data correctly', () => {
        const response = [
            {
                date: '2023-01-01T00:00:00Z',
                processData: [
                    {
                        value: '10',
                        materialAttributeAvg: '5',
                    },
                ],
            },
            {
                date: '2023-02-01T00:00:00Z',
                processData: [
                    {
                        value: '20',
                        materialAttributeAvg: '15',
                    },
                ],
            },
        ];

        const result = transformChartData(response);

        expect(result).toEqual([
            {
                id: 'material',
                data: [
                    { x: '2023-01-01T00:00:00Z', y: '5' },
                    { x: '2023-02-01T00:00:00Z', y: '15' },
                ],
            },
            {
                id: 'process',
                data: [
                    { x: '2023-01-01T00:00:00Z', y: '10' },
                    { x: '2023-02-01T00:00:00Z', y: '20' },
                ],
            },
        ]);
    });

    it('handles empty response array', () => {
        const response = [];
        const result = transformChartData(response);
        expect(result).toEqual([
            { id: 'material', data: [] },
            { id: 'process', data: [] },
        ]);
    });
});

describe('transformTableData function', () => {
    it('transforms response data correctly', () => {
        const response = [
            {
                processData: [
                    {
                        batchId: 'batch1',
                        value: '10',
                        materialAttributeAvg: '5',
                    },
                ],
            },
            {
                processData: [
                    {
                        batchId: 'batch2',
                        value: '20',
                        materialAttributeAvg: '15',
                    },
                ],
            },
        ];

        const result = transformTableData(response);

        expect(result).toEqual([
            { batchId: 'batch1', material: '5', process: '10' },
            { batchId: 'batch2', material: '15', process: '20' },
        ]);
    });

    it('handles empty response array', () => {
        const response = [];
        const result = transformTableData(response);
        expect(result).toEqual([]);
    });
});