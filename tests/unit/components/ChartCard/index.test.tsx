import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import ChartCard from '../../../../src/components/ChartCard';


describe('ChartCard', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<ChartCard title="Test Title"><div>Test Child</div></ChartCard>);
    const chartCardElement = getByTestId('chart-card');
    expect(chartCardElement).toBeInTheDocument();
  });

  it('displays the correct title and children', () => {
    const { getByText } = render(<ChartCard title="Test Title"><div>Test Child</div></ChartCard>);
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});