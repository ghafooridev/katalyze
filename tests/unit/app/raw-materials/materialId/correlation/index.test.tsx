
import React from 'react';
import { describe, expect, jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Correlation from '@/app/raw-materials/[materialId]/correlations/page';
import { usePathname, useRouter } from 'next/navigation';



import '@testing-library/jest-dom';
import { getMaterialCorrelation, getMaterialSelector, getProcessDropDowns } from '@/app/raw-materials/_services';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';


// Mock all necessary services and components
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(), // Mock useRouter
    usePathname: jest.fn()
}));
jest.mock('@/app/raw-materials/_services', () => ({
    getMaterialCorrelation: jest.fn(), // Mock services as jest.fn()
    getMaterialSelector: jest.fn(),
    getProcessDropDowns: jest.fn(), // Ensure it's properly mocked
}));
jest.mock('@/components/Chart/HeatMapChart', () => jest.fn(() => <div>HeatMapChart Mock</div>));
jest.mock('@/components/DateRangePicker', () => jest.fn(() => <div>DateRangePicker Mock</div>));
jest.mock('@/icons/NoDataChartIcon', () => jest.fn(() => <div>No Data</div>));

jest.mock('@nextui-org/react', () => ({
    Select: jest.fn(({ children }) => <select>{children}</select>),
    SelectItem: jest.fn(({ children }) => <option>{children}</option>),
}));

jest.mock('@/app/raw-materials/[materialId]/_components/common/BreadcrumbByMaterialId', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="breadcrumb">Mocked Breadcrumb</div>),
}));


jest.mock("@/components/Loading/index", () => ({
    __esModule: true,
    default: jest.fn(() => <div>loading</div>),
}));

jest.mock('@/components/ChartCard', () => ({
    __esModule: true,
    default: jest.fn(({ title, children }) => (
        <div data-testid="chart-card">
            <p>{title}</p>
            <div>{children}</div>
        </div>
    )),
}));


jest.mock('../../../../../../src/app/raw-materials/[materialId]/_components/processSelector', () => ({
    __esModule: true,
    default: ({ onSelectProcess }: { onSelectProcess: (value: any) => void }) => (
        <div>
            <select
                data-testid="process-select"
                onChange={(e) => onSelectProcess({ process: { process: e.target.value, product: '', site: '' }, processStep: '' })}
            >
                <option value="Process 1">Process 1</option>
                <option value="Process 2">Process 2</option>
            </select>
            <select
                data-testid="process-step-select"
                onChange={(e) => onSelectProcess({ process: { process: 'Process 1', product: '', site: '' }, processStep: e.target.value })}
            >
                <option value="Step 1">Step 1</option>
                <option value="Step 2">Step 2</option>
            </select>
        </div>
    ),
}));

jest.mock('../../../../../../src/app/raw-materials/[materialId]/MaterialNavSelector.tsx', () => ({
    __esModule: true,
    MaterialNavSelector: ({ onChangeSelector }: { onChangeSelector: (key: React.Key | null) => void }) => (
        <div>
            <select
                data-testid="material-nav-selector"
                onChange={(e) => onChangeSelector(e.target.value as string)}
            >
                <option value="material-1">Material 1</option>
                <option value="material-2">Material 2</option>
            </select>
        </div>
    ),
}));

describe('Correlation Component', () => {
    const mockMaterialId = 'material123';
    const mockMaterialSelectorResponse = {
        materials: [{ id: 'material123', name: 'Material 123' }]
    };
    const mockCorrelationData = {
        'key1': [
            { name: 'Item 1', value: '10.123' },
            { name: 'Item 2', value: '20.456' }
        ],
        'key2': [
            { name: 'Item 3', value: '30.789' }
        ],
    };

    const mockProcessesResponse = [
        {
            process: 'Test Process',
            steps: ['Step 1', 'Step 2'],
        },
    ];

    beforeEach(() => {
        // Reset mocks
        (getMaterialSelector as jest.Mock).mockResolvedValue(mockMaterialSelectorResponse as never);
        (getMaterialCorrelation as jest.Mock).mockResolvedValue(mockCorrelationData as never);
        (getProcessDropDowns as jest.Mock).mockResolvedValue(mockProcessesResponse as never);


        (usePathname as jest.Mock).mockReturnValue('/');
        const useRouter = jest.spyOn(require("next/navigation"), "useRouter");
        useRouter.mockReturnValue({
            push: jest.fn(),
        });

    });

    it.skip('should render the component with necessary elements', async () => {
        render(<Correlation params={{ materialId: mockMaterialId }} />);

        // Verify initial loading of Material Selector and Process Selector
        expect(await screen.getByTestId('processSelector')).toBeInTheDocument();
        expect(screen.getByText('DateRangePicker Mock')).toBeInTheDocument();

        // No heat map or loading spinner initially
        expect(screen.getByText('No Data')).toBeInTheDocument();
    });

    it.skip('should fetch and render heat map data after process selection', async () => {
        render(<Correlation params={{ materialId: mockMaterialId }} />);

        // Initially no heat map chart
        expect(screen.getByText('There is not enough data available to activate this feature')).toBeInTheDocument();

        // // Mock selecting a process
        // fireEvent.click(screen.getByTestId('processSelector'));  // Simulate selecting a process

        // // Wait for the correlation data to be fetched
        // await waitFor(() => {
        //     expect(getMaterialCorrelation).toHaveBeenCalledTimes(1);
        // });

        // // Expect heat map chart to be rendered now
        // expect(screen.getByText('HeatMapChart Mock')).toBeInTheDocument();


        // Simulate user selecting a process
        userEvent.selectOptions(screen.getByTestId('process-select'), 'Process 1');
        userEvent.selectOptions(screen.getByTestId('process-step-select'), 'Step 1');

        // Check if API was called with correct parameters
        await waitFor(() => {
            expect(getMaterialCorrelation).toHaveBeenCalledWith('material123', {
                process: 'Process 1',
                site: '',
                product: '',
                step: undefined,
                dateRange: [], // Adjust if necessary
            });
        });
    });
    it('should render MaterialNavSelector with correct props', async () => {
        render(<Correlation params={{ materialId: mockMaterialId }} />);
        expect(screen.getByTestId('material-nav-selector')).toBeInTheDocument();
    });
});
