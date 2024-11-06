import { describe, expect, test } from "@jest/globals";
import React from "react";
import { render } from "@testing-library/react";
import { HighlightRegion } from "@/components/OriginalDocumentViewer/HighLightRegion";
import { Digitalization } from "@/types/Digitalization.schema";
import { PageDimensions } from "@/components/OriginalDocumentViewer/DocumentZoomController";

// Mocked digitalization data
const mockData: Digitalization = {
  id: "1",
  file: {
    id: "file-1",
    name: "sample-file.pdf",
    url: "https://example.com/sample-file.pdf",
    format: "pdf",
  },
  documentType: "CertificateOfAnalysis",
  material: {
    id: "material-1",
    name: "Sample Material",
  },
  vendor: {
    id: "vendor-1",
    name: "Sample Vendor",
  },
  status: "pending",
  reviewedBy: "reviewer-1",
  createdAt: "2024-06-13T12:00:00Z",
  json: {
    key: "value",
  },
  flattenJson: [
    {
      path: "sample/path",
      value: "sample value",
      type: "String",
      region: {
        x: 10,
        y: 20,
        width: 200,
        height: 100,
      },
      flagReasons: "",
      createdBy: {
        id: "creator-1",
      },
      createdAt: "2024-06-13T12:00:00Z",
      version: 1,
    },
  ],
};

// Mocked context value
const mockContextValue = {
  index: 0,
  visible: true,
};

const fakeDimensions: PageDimensions = {
  width: 1000,
  height: 1000,
};

describe("HighlightRegion", () => {
  it("renders correctly when region data is available and visible", () => {
    jest.spyOn(React, "useContext").mockReturnValue(mockContextValue);

    const { getByTestId } = render(
      <HighlightRegion regionData={mockData} dimensions={fakeDimensions} />
    );

    const highlightRegion = getByTestId("highlight-region");
    expect(highlightRegion).toBeInTheDocument();

    expect(highlightRegion).toHaveStyle(`
      position: absolute;
      background-color: #AF6DFC;
      opacity: 0.5;
      top: 20000px;   /* transformed from x */
      left: 10000px;  /* transformed from y */
      width: 200000px;   /* transformed from width */
      height: 100000px;  /* transformed from height */
    `);
  });

  it("does not render when context visibility is false", () => {
    const mockContextValueFalseVisible = {
      ...mockContextValue,
      visible: false,
    };
    jest
      .spyOn(React, "useContext")
      .mockReturnValue(mockContextValueFalseVisible);

    const { queryByTestId } = render(
      <HighlightRegion regionData={mockData} dimensions={fakeDimensions} />
    );

    const highlightRegion = queryByTestId("highlight-region");
    expect(highlightRegion).not.toBeInTheDocument();
  });
});
