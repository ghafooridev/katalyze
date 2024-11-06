import { render } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import { DualDocumentContainer } from "@/app/documents/browse/[id]/_components/DualDocumentContainer";
import { Digitalization } from "@/types/Digitalization.schema";
import { DigitalData } from "@/types/DigitalData.schema";
import React from "react";

jest.mock("@/lib/auth", () => ({
  getAuthSession: jest.fn(),
}));

jest.mock("@/components/OriginalDocumentViewer/HighLightRegionCtx");

jest.mock("react-pdf", () => ({
  Document: () => <div>Document</div>,
  Page: () => <div>Page</div>,
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: "",
    },
  },
}));

jest.mock("@/app/documents/browse/[id]/_components/ExtractedDataForm", () => ({
  ExtractedDataForm: jest
    .fn()
    .mockImplementation((props) => <div>Mock ExtractedDataForm</div>),
}));

global.URL.createObjectURL = jest.fn();

describe("DualDocumentContainer Component", () => {
  const mockSetHeighLightIndex = jest.fn();
  const mockSetVisibility = jest.fn();
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

  const mockDigitalData: DigitalData[] = [
    {
      createdBy: { id: "1" },
      type: "String",
      path: "path/to/object",
      createdAt: "2022-01-01T00:00:00Z",
      value: "value",
      region: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      flagReasons: "",
      version: 1,
    },
  ];

  const mockMaterials = [{ id: "1", name: "Material 1" }];
  const mockVendors = [{ id: "1", name: "Vendor 1" }];

  const props = {
    jsonData: mockData,
    data: mockData,
    nextId: "1",
    currentId: "1",
    flattenJson: mockDigitalData,
    currentFile: "File 1",
    materials: mockMaterials,
    vendors: mockVendors,
    setHeighLightIndex: mockSetHeighLightIndex,
    setVisibility: mockSetVisibility,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("initializes and renders component", () => {
    render(<DualDocumentContainer {...props} />);

    expect(DualDocumentContainer).toBeDefined();
  });
});
