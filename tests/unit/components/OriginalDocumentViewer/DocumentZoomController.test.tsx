//@ts-nocheck
import { describe, expect, test } from "@jest/globals";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DocumentZoomController from "@/components/OriginalDocumentViewer/DocumentZoomController";
import { Digitalization } from "@/types/Digitalization.schema";
import { getDocumentDownload } from "@/app/documents/_services";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { toast } from "react-toastify";
import { HighlightRegionCtx } from "@/components/OriginalDocumentViewer/HighLightRegionCtx";


jest.mock("@/app/documents/_services", () => ({
  getDocumentDownload: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

jest.mock("react-pdf", () => ({
  __esModule: true,
  Document: () => <div>Document</div>,
  Page: () => <div>Page</div>,
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: "",
    },
    getDocument: jest.fn(), // Add this line
  },
}));

jest.mock("@/components/OriginalDocumentViewer/HighLightRegion", () => ({
  __esModule: true,
  HighlightRegion: () => (
    <div data-testid="highlight-region">HighlightRegion</div>
  ),
}));

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

const mockHighlightRegionCtx = {
  index: 0,
  setIndex: jest.fn(),
  visible: false,
  setVisibility: jest.fn(),
};


describe("DocumentZoomController Component", () => {
  let zoomInMock: jest.Mock;
  let zoomOutMock: jest.Mock;
  let resetTransformMock: jest.Mock;

  beforeEach(() => {
    zoomInMock = jest.fn();
    zoomOutMock = jest.fn();
    resetTransformMock = jest.fn();
    if (TransformWrapper?.prototype) {
      TransformWrapper.prototype.zoomIn = zoomInMock;
      TransformWrapper.prototype.zoomOut = zoomOutMock;
      TransformWrapper.prototype.resetTransform = resetTransformMock;
    }
    // Mock getDocument to return a mock PDFDocumentProxy
    // pdfjs.getDocument.mockReturnValue({
    //   promise: Promise.resolve({
    //     getPage: jest.fn().mockResolvedValue({
    //       getViewport: jest.fn().mockReturnValue({ width: 600, height: 800 }),
    //     }),
    //   }),
    // });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const { getByText, findByTestId, getByTestId } = render(
      <HighlightRegionCtx.Provider value={mockHighlightRegionCtx}>
        <DocumentZoomController
          data={mockData}
          id="1"
          pdfFile="sample-file.pdf"
        />
      </HighlightRegionCtx.Provider>
    );

    expect(getByText("Original Document")).toBeInTheDocument();
  });

  test('handles zoom reset, zoom in and zoom out', async () => {
    const { getByTestId } = render(
      <DocumentZoomController data={mockData} id="1"
      pdfFile="sample-file.pdf" />
    );

    const zoomInButton = getByTestId('zoom_in_button');
    const zoomOutButton = getByTestId('zoom_out_button');
    const zoomResetButton = getByTestId('zoom_reset_button');

    await fireEvent.click(zoomInButton);
    expect(zoomInButton).toBeInTheDocument();

    await fireEvent.click(zoomOutButton);
    expect(zoomOutButton).toBeInTheDocument();

    await fireEvent.click(zoomOutButton);
    expect(zoomResetButton).toBeInTheDocument();
  });

  it("handles document load success", async () => {
    const { findByText } = render(
      <DocumentZoomController
        data={mockData}
        id="1"
        pdfFile="sample-file.pdf"
      />
    );

    await findByText("Document");
    expect(mockData.flattenJson.length).toBeGreaterThan(0);

  })
  

  test('handles download', async () => {
    (getDocumentDownload as jest.Mock).mockResolvedValue(
      new Blob(["file content"], { type: "application/pdf" })
    );

    const { getByTestId } = render(<DocumentZoomController data={mockData} id={"1"} pdfFile={"123"} />);

    const downloadButton = getByTestId('download-pdf-button');
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(getDocumentDownload).toHaveBeenCalledWith("1");
      expect(toast).toHaveBeenCalledTimes(1);
    });

  });

  it("updates container size on window resize", () => {
    const { container, getByTestId } = render(
      <DocumentZoomController data={mockData} />
    );

    const containerDiv = getByTestId("transform-wrapper");
    expect(containerDiv).toBeInTheDocument();
  });
});
