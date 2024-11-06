// BarChart.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BarChart } from '@/components/Chart/BarChart';
import '@testing-library/jest-dom/extend-expect';
import { ResponsiveBar } from '@nivo/bar';
import { describe, expect } from '@jest/globals';

// Mock the dependencies
jest.mock('@nivo/bar', () => ({
    ResponsiveBar: jest.fn(() => <div data-testid="responsive-bar" />),
}));
jest.mock('../chart/ChartAxisLabel.test.tsx', () => jest.fn(() => <div data-testid="chart-axis-label" />));

// Define the mock tooltip component
const MockTooltip = () => <div>Tooltip Content</div>;

describe('BarChart Component', () => {
    const mockProps = {
        chartData: [{ month: 'January', value: 10 }, { month: 'February', value: 20 }],
        color: 'blue',
        chartTooltip: MockTooltip,
        keys: ['value'],
        indexBy: 'month',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the ResponsiveBar component', () => {
        render(<BarChart {...mockProps} />);

        // Check if ResponsiveBar is rendered
        expect(screen.getByTestId('responsive-bar')).toBeInTheDocument();
    });

    it('passes correct props to ResponsiveBar', () => {
        render(<BarChart {...mockProps} />);

        // Check if the ResponsiveBar was called with correct props
        expect(ResponsiveBar).toHaveBeenCalledWith(
            expect.objectContaining({
                data: mockProps.chartData,
                keys: mockProps.keys,
                indexBy: mockProps.indexBy,
                colors: mockProps.color,
                tooltip: mockProps.chartTooltip,
            }),
            {}
        );
    });


    it('applies correct theme to the ResponsiveBar', () => {
        render(<BarChart {...mockProps} />);

        expect(ResponsiveBar).toHaveBeenCalledWith(
            expect.objectContaining({
                theme: expect.objectContaining({
                    axis: expect.objectContaining({
                        legend: expect.objectContaining({
                            text: expect.objectContaining({
                                fontSize: 16,
                                fontWeight: 500,
                                fill: '#101828',
                            }),
                        }),
                    }),
                }),
            }),
            {}
        );
    });
});
