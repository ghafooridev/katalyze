import NoChartData from '@/app/raw-materials/[materialId]/_components/NoChartData';
import { describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { NoChartIcon } from '@/icons/NoChartIcon'; // Import the icon if needed for mocking

jest.mock('@/icons/NoChartIcon', () => ({
    NoChartIcon: () => <svg data-testid="no-chart-icon"></svg>, // Mock the NoChartIcon
}));

describe('NoChartData Component', () => {
    it('renders the correct text and NoChartIcon', () => {
        const testText = 'No data available';

        render(<NoChartData text={testText} />);

        // Check if the NoChartIcon is rendered
        expect(screen.getByTestId('no-chart-icon')).toBeInTheDocument();

        // Check if the correct text is rendered
        expect(screen.getByText(testText)).toBeInTheDocument();
    });

    it('has the correct styles applied to the container', () => {
        const testText = 'No data available';

        render(<NoChartData text={testText} />);

        // Check if the container div has the correct styles
        const container = screen.getByText(testText).closest('div');
        expect(container).toHaveClass('flex justify-center flex-col items-center');
    });
});
