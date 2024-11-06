import { describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ProcessBatchChart, BatchDeviationChart } from '@/app/raw-materials/overview/_components/Charts';


// Mocking BarChart and ChartNoData components
jest.mock('@/components/Chart/BarChart', () => ({
    BarChart: jest.fn(() => <div data-testid="bar-chart" />),
}));

jest.mock('@/icons/ChartNoData', () => jest.fn(() => <div data-testid="chart-no-data"><p>No data available</p></div>));

describe('ProcessBatchChart Component', () => {
    it('renders BarChart with data if process data is available', () => {
        const mockProcess = [
            { month: 'January', value: 10 },
            { month: 'February', value: 20 },
        ];

        render(<ProcessBatchChart process={mockProcess} />);

        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });

    // it('renders no data message if process data is not available', () => {
    //     render(<ProcessBatchChart process={[]} />);

    //     expect(screen.getAllByTestId('chart-no-data')[0]).toBeInTheDocument();
    //     expect(screen.getByText('No data available')).toBeInTheDocument();
    // });
});

describe('BatchDeviationChart Component', () => {
    it('renders BarChart with deviation data if available', () => {
        const mockDeviations = [
            { month: 'January', deviation: { total: 5 } },
            { month: 'February', deviation: { total: 8 } },
        ];

        render(<BatchDeviationChart deviations={mockDeviations} />);

        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });

    // it('renders no data message if deviation data is not available', () => {
    //     render(<BatchDeviationChart deviations={[]} />);

    //     expect(screen.getAllByTestId('chart-no-data')[1]).toBeInTheDocument();
    //     expect(screen.getByText('No data available')).toBeInTheDocument();
    // });
});
