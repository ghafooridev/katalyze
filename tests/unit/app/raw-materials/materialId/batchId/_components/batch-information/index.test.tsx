import { render } from "@testing-library/react";
import BatchInformation from "@/app/raw-materials/[materialId]/[batchId]/_components/batch-information/index";
import { describe, expect } from "@jest/globals";

jest.mock("@/components/Skeleton/TableSkeleton", () => () => (
  <div data-testid="table-skeleton">Mock TableSkeleton</div>
));

describe("BatchInformation", () => {
  it("should render BatchInformationTable when item prop is provided", () => {
    const mockItem = {
      material: {
        id: "2",
        gmid: "GM123",
        lmid: "LM456",
        name: "Material Name",
      },
      batchId: "batch789",
      rating: { trend: 1, value: 1 },
      vendor: { name: "Vendor Name", id: "vendor123" },
      quantity: "100",
      expiryDate: "2023-01-01",
      dates: [
        { type: "dateReceived", value: "2023-01-01" },
        { type: "dateOfProduction", value: "2023-01-02" },
        { type: "dateOfSampling", value: "2023-01-03" },
        { type: "dateOfExpiration", value: "2023-01-04" },
        { type: "dateOfReassay", value: "2023-01-05" },
        { type: "dateOfRelease", value: "2023-01-06" },
      ],
      status: "Active",
      vendorBatchId: "VB123",
      specifications: [
        {
          name: "name",
          value: "value",
          unit: "unit",
          method: "method",
          source: "source",
          range: "range",
        },
      ],
      document: { id: "doc123", name: "docName", url: "docUrl", format: "pdf" },
    };

    const { getByText } = render(<BatchInformation item={mockItem} />);
    expect(getByText("GM123")).toBeInTheDocument();
    expect(getByText("LM456")).toBeInTheDocument();
    expect(getByText("Vendor Name")).toBeInTheDocument();
  });

  it("should render TableSkeleton when item prop is not provided", () => {
    const { getByTestId } = render(<BatchInformation />);
    const tableSkeleton = getByTestId("table-skeleton");
    expect(tableSkeleton).toBeInTheDocument();
  });
});
