import { describe, expect } from '@jest/globals';
// HeatMapChart.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeatMapChart from '@/components/Chart/HeatMapChart';
import '@testing-library/jest-dom/extend-expect';
import { ResponsiveHeatMap } from '@nivo/heatmap';

// Mock the dependencies
jest.mock('@nivo/heatmap', () => ({
    ResponsiveHeatMap: jest.fn(() => <div data-testid="responsive-heatmap" />),
}));
jest.mock('../chart/ChartAxisLabel.test.tsx', () => jest.fn(() => <div data-testid="chart-axis-label" />));

describe('HeatMapChart Component', () => {
    const mockProps = {
        chartData: [
            {
                id: 'Group A',
                data: [
                    { x: 'Item 1', y: 0.6 },
                    { x: 'Item 2', y: -0.5 },
                ],
            },
        ],
        colors: ['#f47560', '#e8c1a0', '#61cdbb'] as [string, string, string],
        axisLeftLabel: 'Y Axis Label',
        axisBottomLabel: 'X Axis Label',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the ResponsiveHeatMap component', () => {
        render(<HeatMapChart {...mockProps} />);

        // Check if ResponsiveHeatMap is rendered
        expect(screen.getByTestId('responsive-heatmap')).toBeInTheDocument();
    });

    it('passes correct props to ResponsiveHeatMap', () => {
        render(<HeatMapChart {...mockProps} />);

        // Check if the ResponsiveHeatMap was called with correct props
        expect(ResponsiveHeatMap).toHaveBeenCalledWith(
            expect.objectContaining({
                data: mockProps.chartData,
                xInnerPadding: 0.01,
                yInnerPadding: 0.04,
                borderRadius: 5,
                animate: false,
                hoverTarget: 'cell',
                colors: expect.objectContaining({
                    type: 'diverging',
                    divergeAt: 0.5,
                    minValue: -1.0,
                    maxValue: 1.0,
                    colors: mockProps.colors,
                }),
                emptyColor: '#555555',
            }),
            {}
        );
    });


    it('applies correct theme to the ResponsiveHeatMap', () => {
        render(<HeatMapChart {...mockProps} />);

        // Check if the correct theme is applied to ResponsiveHeatMap
        expect(ResponsiveHeatMap).toHaveBeenCalledWith(
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

    it('configures legends correctly', () => {
        render(<HeatMapChart {...mockProps} />);

        // Check if legends are correctly configured
        expect(ResponsiveHeatMap).toHaveBeenCalledWith(
            expect.objectContaining({
                legends: expect.arrayContaining([
                    expect.objectContaining({
                        anchor: 'top',
                        translateX: 0,
                        translateY: -50,
                        length: 900,
                        thickness: 8,
                        direction: 'row',
                        tickPosition: 'before',
                        tickSize: 3,
                        tickSpacing: 4,
                        tickOverlap: false,
                        titleAlign: 'start',
                        titleOffset: 4,
                    }),
                ]),
            }),
            {}
        );
    });
});
