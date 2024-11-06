import React from 'react';
import { describe, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { MultipleChips, SingleChip } from '@/app/raw-materials/_components/DynamicChips';

describe('DynamicChips', () => {
  it('renders MultipleChips correctly', () => {
    const chipData = [{ id: '1', name: 'Chip 1' }, { id: '2', name: 'Chip 2' }];
    const { getByText } = render(<MultipleChips chipData={chipData} width={"100"}/>);
    expect(getByText('Chip 1')).toBeInTheDocument();
    expect(getByText('+1')).toBeInTheDocument();
  });

  it('renders SingleChip correctly', () => {
    const chipData = 'Chip 1';
    const { getByText } = render(<SingleChip chipData={chipData} width={"100"}/>);
    expect(getByText('Chip 1')).toBeInTheDocument();
  });
  it('renders SingleChip with Tooltip when chipData length is more than 14', () => {
    const chipData = 'Long chip data string';
    const { getByText } = render(<SingleChip chipData={chipData} width={"100"}/>);
    expect(getByText('Long chip data string')).toBeInTheDocument();
  });
});