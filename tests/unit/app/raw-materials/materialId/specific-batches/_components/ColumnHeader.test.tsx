import React from "react";
import { describe, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import ColumnHeader from "@/app/raw-materials/[materialId]/specific-batches/_components/ColumnHeader";

describe('ColumnHeader component', () => {
  const mockColumn = {
    getIsSorted: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(
      <ColumnHeader column={mockColumn as any} children="Test Header" />
    );
    expect(getByText('Test Header')).toBeInTheDocument();
  });

  it('renders correct icon for desc sorted type', () => {
    mockColumn.getIsSorted.mockReturnValue('desc');
    const { container } = render(
      <ColumnHeader column={mockColumn as any} children="Test Header" />
    );
    expect(container.querySelector('.ml-2.h-4.w-4')).toBeInTheDocument();
  });

  it('renders correct icon for asc sorted type', () => {
    mockColumn.getIsSorted.mockReturnValue('asc');
    const { container } = render(
      <ColumnHeader column={mockColumn as any} children="Test Header" />
    );
    expect(container.querySelector('.ml-2.h-4.w-4.rotate-180')).toBeInTheDocument();
  });

  it('renders correct icon for default sorted type', () => {
    mockColumn.getIsSorted.mockReturnValue('default');
    const { container } = render(
      <ColumnHeader column={mockColumn as any} children="Test Header" />
    );
    expect(container.querySelector('.ml-0.h-4.w-4')).toBeInTheDocument();
  });
});