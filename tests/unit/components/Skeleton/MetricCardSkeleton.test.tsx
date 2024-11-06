import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import MetricCardSkeleton from '../../../../src/components/Skeleton/MetricCardSkeleton';

describe('MetricCardSkeleton', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<MetricCardSkeleton />);
    const skeletonElement = getByTestId('metric-card-skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });
});