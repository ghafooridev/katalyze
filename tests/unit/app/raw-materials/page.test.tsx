import React from "react";
import { describe, expect } from "@jest/globals";
import { render } from "@testing-library/react";

import RawMaterial from '@/app/raw-materials/page';
import OverviewRawMaterial from '@/app/raw-materials/overview/page';

jest.mock('@/app/raw-materials/overview/page', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked OverviewRawMaterial</div>),
}));

describe('RawMaterial Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders OverviewRawMaterial correctly', () => {
    const { getByText } = render(<RawMaterial />);

    expect(getByText('Mocked OverviewRawMaterial')).toBeInTheDocument();
    expect(OverviewRawMaterial).toHaveBeenCalled();
  });
});