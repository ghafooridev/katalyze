import { describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import MetricsMaterial from '@/app/raw-materials/overview/_components/Metrics';

// Mock the MetricCard component
jest.mock('@/components/MetricCard', () => ({
  MetricCard: ({ title, value, rate }) => (
    <div>
      <h2>{title}</h2>
      <p>Value: {value}</p>
      <p>Rate: {rate}%</p>
    </div>
  ),
}));

describe('MetricsMaterial Component', () => {
  const mockMetrics = [
    { type: 'active_materials', value: 50, rate: 10 },
    { type: 'processed_batches', value: 100, rate: 5 },
    { type: 'coa_coverage', value: 80, rate: 15 },
  ];

  it('renders MetricCards with correct data', () => {
    render(<MetricsMaterial materialMetrics={mockMetrics} />);

    const activeMaterialsCard = screen.getByText('Active Materials');
    expect(activeMaterialsCard).toBeInTheDocument();
    expect(activeMaterialsCard.nextSibling).toHaveTextContent('Value: 50');
    expect(activeMaterialsCard.nextSibling?.nextSibling).toHaveTextContent('Rate: 10%');

    const processedBatchesCard = screen.getByText('Number of Processed Batches');
    expect(processedBatchesCard).toBeInTheDocument();
    expect(processedBatchesCard.nextSibling).toHaveTextContent('Value: 100');
    expect(processedBatchesCard.nextSibling?.nextSibling).toHaveTextContent('Rate: 5%');

    const coaCoverageCard = screen.getByText('Digital COA Coverage');
    expect(coaCoverageCard).toBeInTheDocument();
    expect(coaCoverageCard.nextSibling).toHaveTextContent('Value: 80');
    expect(coaCoverageCard.nextSibling?.nextSibling).toHaveTextContent('Rate: 15%');

    const labTestCoverageCard = screen.getByText('Lab Test Coverage');
    expect(labTestCoverageCard).toBeInTheDocument();
    expect(labTestCoverageCard.nextSibling).toHaveTextContent('Value: 0');
    expect(labTestCoverageCard.nextSibling?.nextSibling).toHaveTextContent('Rate: 0%');
  });
});
