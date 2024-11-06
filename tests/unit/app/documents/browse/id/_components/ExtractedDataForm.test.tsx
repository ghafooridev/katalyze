import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { ExtractedDataForm } from "@/app/documents/browse/[id]/_components/ExtractedDataForm";
import { Digitalization } from "@/types/Digitalization.schema";
import { DigitalData } from "@/types/DigitalData.schema";

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
      path: "vendorInformation.vendorName",
      value: "Vendor 1",
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
    {
      path: "batchInformation.vendorBatchID",
      value: "12345",
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
    {
      path: "batchInformation.materialName",
      value: "Material 1",
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
    {
      path: "materialAttributes.0.attributeName",
      value: "name",
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
    {
      path: "materialAttributes.0.resultMaxInclusive",
      value: "test2",
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
    {
      path: "materialAttributes.1.attributeName",
      value: "name",
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
    {
      path: "materialAttributes.1.resultMaxInclusive",
      value: "test2",
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

const mockJsonData: Digitalization["json"] = {
  batchInformation: {
    bulkTestBatchID: "2557896000",
    dateOfManufacture: "2023-Apr-24",
    dateOfManufactureFormatted: "2023-04-24",
    expirationDate: "2028-Apr-30",
    expirationDateFormatted: "2028-04-30",
    materialName: "Bacto TM Yeast Extract",
    retestDate: null,
    retestDateFormatted: null,
    testDate: null,
    testDateFormatted: null,
    vendorBatchID: "2557896",
    vendorMaterialID: "212730",
  },
  materialAttributes: [
    {
      attributeName: "Appearance (1% Solution)",
      resultMaxInclusive: null,
      resultMaxValue: null,
      resultMinInclusive: null,
      resultMinValue: null,
      resultOriginal: "Pass",
      resultValue: null,
      specificationMaxInclusive: null,
      specificationMaxValue: null,
      specificationMinInclusive: null,
      specificationMinValue: null,
      specificationOriginal:
        "Light-medium amber, clear, may have a very slight precipitate.",
      testMethod: null,
      unitOfMeasurement: null,
    },
    {
      attributeName: "Appearance (2% Solution)",
      resultMaxInclusive: null,
      resultMaxValue: null,
      resultMinInclusive: null,
      resultMinValue: null,
      resultOriginal: "Pass",
      resultValue: null,
      specificationMaxInclusive: null,
      specificationMaxValue: null,
      specificationMinInclusive: null,
      specificationMinValue: null,
      specificationOriginal:
        "Medium amber, clear, may have a very slight precipitate.",
      testMethod: null,
      unitOfMeasurement: null,
    },
  ],
  vendorInformation: { vendorName: "Life Technologies Corporation" },
};

const mockDigitalData: DigitalData[] = [
  {
    createdBy: { id: "1" },
    type: "String",
    path: "batchInformation.vendorBatchID",
    createdAt: "2022-01-01T00:00:00Z",
    value: "Vendor 1",
    region: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    flagReasons: "",
    version: 2,
  },
  {
    createdBy: { id: "2" },
    type: "String",
    path: "batchInformation.materialName",
    createdAt: "2022-01-01T00:00:00Z",
    value: "Material 1",
    region: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    flagReasons: "",
    version: 1,
  },
  {
    createdBy: { id: "3" },
    type: "String",
    path: "batchInformation.vendorName",
    createdAt: "2022-01-01T00:00:00Z",
    value: "12345",
    region: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    flagReasons: "",
    version: 1,
  },
  {
    path: "materialAttributes.0.attributeName",
    value: "name",
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
  {
    path: "materialAttributes.0.resultMaxInclusive",
    value: "test2",
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
  {
    path: "materialAttributes.1.attributeName",
    value: "name",
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
  {
    path: "materialAttributes.1.resultMaxInclusive",
    value: "test2",
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
];

jest.mock("@/app/documents/_services", () => ({
  getDocumentJson: jest
    .fn()
    .mockImplementation(() => Promise.resolve(new Blob())),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn().mockReturnValue({ id: "1" }),
}));

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

jest.mock("@/components/ExtractedData/ExtractedDataJson", () => () => (
  <div>Mock ExtractedDataJson</div>
));
jest.mock("@/app/documents/_modals/DocumentApprovalModal", () => () => (
  <div>Mock DocumentApprovalModal</div>
));
jest.mock("@/app/documents/_modals/DocumentRejectionModal", () => () => (
  <div>Mock DocumentRejectionModal</div>
));
jest.mock("@/app/documents/_modals/DocumentReportIssueModal", () => () => (
  <div>Mock DocumentReportIssueModal</div>
));

jest.mock("@/app/documents/_modals/DocumentAddObjectModal", () => ({
  __esModule: true,
  default: ({
    handleAddObject,
    newMaterialAttribute = ["path1", "path2"],
    newDigitalDataArr = ["path1.2.test1", "path2.2.test2"],
  }) => (
    <button
      onClick={() => handleAddObject(newMaterialAttribute, newDigitalDataArr)}
    >
      Mock Add Object Button
    </button>
  ),
}));

jest.mock("@/app/documents/_modals/DocumentCancelModal", () => ({
  __esModule: true,
  default: ({ onCancel, currentId, numberOfEdits }) => (
    <button
      onClick={() => {
        onCancel(mockJsonData);
        currentId = 1;
        numberOfEdits = 1;
      }}
    >
      Mock Cancel Button
    </button>
  ),
}));
jest.mock("@/app/documents/_services", () => ({
  approveEditsDocument: jest.fn(() => Promise.resolve()),
}));

const mockProps = {
  jsonData: mockJsonData,
  currentId: "1",
  flattenJson: mockDigitalData,
  originalCreatedAt: "2022-01-01T00:00:00Z",
};

describe("ExtractedDataForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  const renderComponent = (props = {}) => {
    const defaultProps = {
      ...mockProps,
      ...props,
    };
    return render(<ExtractedDataForm {...defaultProps} />);
  };

  it("should render the component", () => {
    renderComponent();
    expect(screen.getByTestId("header-title")).toBeInTheDocument();
  });

  it("should handle edit mode correctly", async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("more-options-button"));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("edit-button"));
    });
    expect(screen.getByTestId("edit-mode-text")).toBeInTheDocument();
  });

  it("should toggle to tableView without crashing", async () => {
    renderComponent();
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("more-options-button"));
    });
    const toggleButton = screen.getByTestId("toggle-view-button");
    await waitFor(() => {
      fireEvent.click(toggleButton);
    });
  });

  it('should call handleAddObject when "Add Object" button is clicked without crashing', async () => {
    const handleAddObjectMock = jest.fn();
    renderComponent({ handleAddObject: handleAddObjectMock });
    fireEvent.click(screen.getByTestId("more-options-button"));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("edit-button"));
    });
    expect(screen.getByText("Mock Add Object Button")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Mock Add Object Button"));
  });

  it("should call onCancel without crashing", async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("more-options-button"));
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("edit-button"));
    });
    expect(screen.getByText("Mock Cancel Button")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Mock Cancel Button"));
  });
});
