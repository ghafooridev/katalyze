import { describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Metrics } from '@/app/raw-materials/[materialId]/overview/_components/Metrics';

jest.mock('@/components/MetricCard', () => ({
  MetricCard: ({ title, value, rate }) => (
    <div>
      <h2>{title}</h2>
      <p>Value: {value}</p>
      <p>Rate: {rate}%</p>
    </div>
  ),
}));

describe('Metrics Component', () => {
  const mockMetrics = [
    { type: 'processed_batches', value: 100, rate: 10 },
    { type: 'vendors_num', value: 5, rate: 5 },
    { type: 'coa_coverage', value: 80, rate: 2 },
  ];

  it('renders MetricCards with correct data', () => {
    render(<Metrics materialMetrics={mockMetrics} />);

    const processedBatchesCard = screen.getByText('Number of Processed Batches');
    expect(processedBatchesCard).toBeInTheDocument();
    expect(processedBatchesCard.nextSibling).toHaveTextContent('Value: 100');
    expect(processedBatchesCard.nextSibling?.nextSibling).toHaveTextContent('Rate: 10%');

    const vendorsNumCard = screen.getByText('Number of Vendors');
    expect(vendorsNumCard).toBeInTheDocument();
    expect(vendorsNumCard.nextSibling).toHaveTextContent('Value: 5');
    expect(vendorsNumCard.nextSibling?.nextSibling).toHaveTextContent('Rate: 5%');

    const coaCoverageCard = screen.getByText('Digital COA Coverage');
    expect(coaCoverageCard).toBeInTheDocument();
    expect(coaCoverageCard.nextSibling).toHaveTextContent('Value: 80%');
    expect(coaCoverageCard.nextSibling?.nextSibling).toHaveTextContent('Rate: 2%');
  });
});
