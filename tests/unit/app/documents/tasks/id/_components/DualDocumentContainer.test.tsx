import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import { DualDocumentContainer } from '@/app/documents/tasks/[id]/_components/DualDocumentContainer';
import { Digitalization } from '@/types/Digitalization.schema';
import { DigitalData } from '@/types/DigitalData.schema';
import { getDocumentJson } from '@/app/documents/_services';
import { toast } from 'react-toastify';

jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    ...originalModule,
    toast: Object.assign(jest.fn(), { dismiss: jest.fn() }),
  };
});

jest.mock("@/app/documents/_services", () => ({
  getDocumentJson: jest.fn(),
}));

jest.mock("react-pdf", () => ({
  Document: () => <div>Document</div>,
  Page: () => <div>Page</div>,
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: "",
    },
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
  }),
}));

jest.mock("@/app/documents/tasks/[id]/_components/ExtractedDataForm", () => ({
  ExtractedDataForm: jest
    .fn()
    .mockImplementation((props) => (
      <div onClick={props.toggleBlur}>
        Mock ExtractedDataForm - Table View: {props.tableView.toString()}
      </div>
    )),
}));

jest.mock("@/app/documents/_modals/DocumentRejectionModal", () => ({
  DocumentRejectionModal: () => <div>Mock DocumentRejectionModal</div>,
}));

global.URL.createObjectURL = jest.fn();

describe("DualDocumentContainer Component", () => {
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
  };
  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<DualDocumentContainer {...props} />);
  });

  it("renders ExtractedDataForm with tableView initially set to true", () => {
    const { getByText } = render(<DualDocumentContainer {...props} />);
    expect(
      getByText("Mock ExtractedDataForm - Table View: true")
    ).toBeInTheDocument();
  });

  it("toggles tableView state when dropdown item is clicked", () => {
    const { getByText } = render(<DualDocumentContainer {...props} />);
    const dropdownButton = getByText("Options").parentElement;
    if (dropdownButton) {
      fireEvent.click(dropdownButton);
    }
    const tableToggleItem = getByText("Raw JSON");
    fireEvent.click(tableToggleItem);
    expect(
      getByText("Mock ExtractedDataForm - Table View: false")
    ).toBeInTheDocument();
    fireEvent.click(tableToggleItem);
    expect(
      getByText("Mock ExtractedDataForm - Table View: true")
    ).toBeInTheDocument();
  });

  it("downloads JSON when download option is clicked", async () => {
    (getDocumentJson as jest.Mock).mockResolvedValueOnce(
      new Blob(["{}"], { type: "application/json" })
    );
    const { getByText } = render(<DualDocumentContainer {...props} />);
    const dropdownButton = getByText("Options").parentElement;
    if (dropdownButton) {
      fireEvent.click(dropdownButton);
    }
    const downloadItem = screen.getByTestId('download-json-button');
    fireEvent.click(downloadItem);
    await waitFor(() => expect(getDocumentJson).toHaveBeenCalledWith("1"));
    expect(toast).toHaveBeenCalled();
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it("toggles blur state when ExtractedDataForm is clicked", () => {
    const { getByText, container } = render(
      <DualDocumentContainer {...props} />
    );
    const form = getByText("Mock ExtractedDataForm - Table View: true");
    fireEvent.click(form);
    expect(container.querySelector(".blur-sm")).toBeNull();
  });
});
