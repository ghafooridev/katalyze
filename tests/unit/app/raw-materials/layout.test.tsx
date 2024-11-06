import React from "react";
import { describe, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import RawMaterialLayout from "@/app/raw-materials/layout";

describe('RawMaterialLayout Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <RawMaterialLayout>
        <div>Test Child</div>
      </RawMaterialLayout>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});