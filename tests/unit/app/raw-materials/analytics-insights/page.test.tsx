import React from "react";
import { describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import AnalyticsInsights from '@/app/raw-materials/analytics-insights/page';
import MaterialNavbar from '@/app/raw-materials/_components/MaterialNavbar';
import InsightPage from "@/app/raw-materials/analytics-insights/_components/InsightPage/InsightPage";

jest.mock('@/app/raw-materials/_components/MaterialNavbar', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked MaterialNavbar</div>),
}));

jest.mock('@/app/raw-materials/analytics-insights/_components/InsightPage/InsightPage', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked InsightPage</div>),
}));

describe('AnalyticsInsights Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders MaterialNavbar and InsightPage correctly', () => {
    render(<AnalyticsInsights />);

    expect(screen.getByText('Mocked MaterialNavbar')).toBeInTheDocument();
    expect(MaterialNavbar).toHaveBeenCalled();

    expect(screen.getByText('Mocked InsightPage')).toBeInTheDocument();
    expect(InsightPage).toHaveBeenCalled();
  });
});