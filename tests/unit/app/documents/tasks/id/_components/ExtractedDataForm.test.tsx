import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";
import { ExtractedDataForm } from "@/app/documents/tasks/[id]/_components/ExtractedDataForm";
import { Digitalization } from "@/types/Digitalization.schema";
import { DigitalData } from "@/types/DigitalData.schema";

// jest.mock("@/app/documents/_modals/DocumentApprovalModal", () => () => (
//   <div>Mock DocumentApprovalModal</div>
// ));
jest.mock("@/app/documents/_modals/DocumentRejectionModal", () => () => (
  <div>Mock DocumentRejectionModal</div>
));
jest.mock("@/app/documents/_services", () => ({
  approvePendingDocument: jest.fn(),
}));
jest.mock("@/app/documents/_modals/ModalContext", () => ({
  useModal: () => ({
    setOpenModal: jest.fn(),
    setEdits: jest.fn(),
  }),
}));
// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(),
//   useParams: jest.fn(),
// }));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: () => ({
    id: "test-id",
  }),
}));
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "test-id" },
  }),
}));

const mockMaterialAttributes = [
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
]

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
  materialAttributes: mockMaterialAttributes,
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
    flagReasons: "test",
    version: 1,
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
];

const mockMaterials = [
  { id: "1", name: "Material 1" },
  { id: "2", name: "Material 2" },
];

const mockVendors = [{ id: "1", name: "Vendor 1" }];

jest.mock("@/app/documents/_modals/DocumentAddObjectModal", () => ({
  __esModule: true,
  default: ({
    handleAddObject,
    newMaterialAttribute = ["path1", "path2"],
    newDigitalDataArr = ["path1.2.test1", "path2.2.test2"],
    handleDiscardObject
  }) => (
    <>
      <button
        onClick={() => handleAddObject(newMaterialAttribute, newDigitalDataArr)}
      >
        Mock Add Object Button
      </button>
      <button
      onClick={() => handleDiscardObject(newMaterialAttribute)}>
        Discard Object
      </button>
    </>
  ),
}));
jest.mock("@/app/documents/_components/FormInput", () => ({
  __esModule: true,
  default: ({
    handleResetField,
    pathData,
  }) => (
    <button
      onClick={() => handleResetField(pathData.path, pathData.value)}
    >
      Mock undo Edit
    </button>
  ),
}));

const mockProps = {
  data: mockJsonData,
  nextId: "2",
  currentId: "1",
  flattenJson: mockDigitalData,
  tableView: true,
  originalCreatedAt: "2022-01-01T00:00:00Z",
  currentFile: "File 1",
  toggleBlur: jest.fn(),
  materials: mockMaterials,
  vendors: mockVendors,
};

describe("ExtractedDataForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("should render the form and modal correctly", async () => {
    render(<ExtractedDataForm {...mockProps} />);
    expect(
      screen.getByText("Review, edit and then verify the data fields below")
    ).toBeInTheDocument();
  });

  it("should toggle tableView and show ExtractedDataJson when tableView is false", () => {
    const setIsTableView = jest.fn();
    const next = jest.fn();
    const setOpen = jest.fn();
    const allDisplayedChecked = jest.fn();
    const toggleBlur = jest.fn();
    const mockPropsWithStep1 = {
      ...mockProps,
      setIsTableView,
      next,
      setOpen,
      allDisplayedChecked,
      toggleBlur,
    };
    render(<ExtractedDataForm {...mockPropsWithStep1} />);
    fireEvent.click(screen.getByText("Verify Batch Information"));
    waitFor(() => {
      fireEvent.click(screen.getByText("More options"));
    });
    waitFor(() => {
      fireEvent.click(screen.getByText("Raw JSON"));
    });
    waitFor(() => {
      expect(setIsTableView).toHaveBeenCalledWith(false);
      expect(setOpen).toHaveBeenCalledWith(false);
      expect(allDisplayedChecked).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(toggleBlur).toHaveBeenCalled();
    });
  });

  it('should call handleAddObject when "Add Object" button is clicked without crashing', async () => {
    const handleAddObjectMock = jest.fn();
    const mockProps2 = {
      ...mockProps,
      handleAddObject: handleAddObjectMock,
    };
    render(<ExtractedDataForm {...mockProps2} />);
    expect(screen.getByText("Mock Add Object Button")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Mock Add Object Button"));
  });
  it('should call handleDiscardObject when "Discard" button is clicked without crashing', async () => {
    const handleDiscardObjectMock = jest.fn();
    const mockProps2 = {
      ...mockProps,
      handleDiscardObject: handleDiscardObjectMock,
    };
    render(<ExtractedDataForm {...mockProps2} />);
    expect(screen.getByText("Discard Object")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Discard Object"));
  });
  it("should render ExtractedDataJson and hide table", async () => {
    const next = 1;
    const tableView = false;
    const mockProps2 = {
      ...mockProps,
      next,
      tableView,
    };
    render(<ExtractedDataForm {...mockProps2} />);
  });
  it('should call resetField with correct path and defaultValue', async () => {
    const handleResetFieldMock = jest.fn();
  const mockProps2 = {
    ...mockProps,
    handleResetField: handleResetFieldMock,
  };

  render(<ExtractedDataForm {...mockProps2} />);
  const undoButtons = screen.getAllByText("Mock undo Edit");
  fireEvent.click(undoButtons[0]);
});
});
