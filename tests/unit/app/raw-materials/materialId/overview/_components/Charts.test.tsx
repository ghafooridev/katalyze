import { describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ProcessBatchChart, DeviationChart } from '@/app/raw-materials/[materialId]/overview/_components/Charts';

jest.mock('@/components/Chart/BarChart', () => ({
    BarChart: jest.fn(() => <div data-testid="bar-chart" />),
}));

jest.mock('@/icons/ChartNoData', () => jest.fn(() => (
    <div data-testid="chart-no-data"><p>No data available</p></div>
)));

describe('ProcessBatchChart Component', () => {
    it('renders BarChart with data if process data is available', () => {
        const mockProcess = [
            { month: 'January', value: 10 },
            { month: 'February', value: 20 },
        ];

        render(<ProcessBatchChart process={mockProcess} />);

        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
});

describe('BatchDeviationChart Component', () => {
    it('renders BarChart with deviation data if available', () => {
        const mockDeviations = [
            { month: 'January', deviation: { total: 5 } },
            { month: 'February', deviation: { total: 8 } },
        ];

        render(<DeviationChart deviations={mockDeviations} />);

        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
});
