import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { expect } from "@jest/globals";
import RawMaterialLayout from '@/app/documents/layout';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue('/documents/tasks'),
}));

jest.mock('@/app/documents/_services', () => ({
  getMetrics: jest.fn().mockResolvedValue({
    pending: 5,
  }),
}));

describe('RawMaterialLayout', () => {
  const children = <div>Test Children</div>;

  beforeEach(() => {
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {

    const Component = await RawMaterialLayout({ children });
    const { getByText } = render(Component);

    await waitFor(() => {
      expect(getByText('5')).toBeInTheDocument();
    });
  });
});