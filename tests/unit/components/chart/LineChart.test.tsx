import { describe, expect } from '@jest/globals';
// LineChart.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineChart } from '@/components/Chart/LineChart';
import '@testing-library/jest-dom/extend-expect';
import { ResponsiveLine } from '@nivo/line';

// Mock the dependencies
jest.mock('@nivo/line', () => ({
    ResponsiveLine: jest.fn(() => <div data-testid="responsive-line" />),
}));
jest.mock('../chart/ChartAxisLabel.test.tsx', () => jest.fn(() => <div data-testid="chart-axis-label" />));

// Define the mock tooltip component
const MockTooltip = () => <div>Tooltip Content</div>;

describe('LineChart Component', () => {
    const mockProps = {
        chartData: [{ id: 'series1', data: [{ x: 'January', y: 10 }, { x: 'February', y: 20 }] }],
        color: 'blue',
        chartTooltip: MockTooltip,
        enableArea: true
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the ResponsiveLine component', () => {
        render(<LineChart {...mockProps} />);

        // Check if ResponsiveLine is rendered
        expect(screen.getByTestId('responsive-line')).toBeInTheDocument();
    });

    it('passes correct props to ResponsiveLine', () => {
        render(<LineChart {...mockProps} />);

        // Check if the ResponsiveLine was called with correct props
        expect(ResponsiveLine).toHaveBeenCalledWith(
            expect.objectContaining({
                data: mockProps.chartData,
                colors: mockProps.color,
                tooltip: mockProps.chartTooltip,
                enableGridY: true,
                enableGridX: false,
                enableArea: true,
                enablePoints: false,
                useMesh: true,
                fill: [
                    {
                        id: 'gradientA',
                        match: '*',
                    },
                ],
                defs: [
                    {
                        colors: [
                            {
                                color: 'inherit',
                                offset: 0,
                            },
                            {
                                color: 'inherit',
                                offset: 100,
                                opacity: 0,
                            },
                        ],
                        id: 'gradientA',
                        type: 'linearGradient',
                    },
                ],
            }),
            {}
        );
    });


    it('applies correct theme to the ResponsiveLine', () => {
        render(<LineChart {...mockProps} />);

        expect(ResponsiveLine).toHaveBeenCalledWith(
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
