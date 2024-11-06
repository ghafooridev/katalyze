import { render } from "@testing-library/react";
import BatchInformation from "@/app/raw-materials/[materialId]/[batchId]/_components/batch-detail";
import { describe, expect } from "@jest/globals";

jest.mock("@/components/Skeleton/TableSkeleton", () => () => (
  <div data-testid="table-skeleton">Mock TableSkeleton</div>
));

describe("BatchInformation", () => {
  it("should render BatchInformationTable when item prop is provided", () => {
    const mockItem = [
      {
        name: "name",
        value: "value",
        unit: "unit",
        method: "method",
        source: "source",
        range: "range",
      },
    ];

    const { getByText } = render(<BatchInformation item={mockItem} />);
    expect(getByText("name")).toBeInTheDocument();
    expect(getByText("value")).toBeInTheDocument();
    expect(getByText("unit")).toBeInTheDocument();
    expect(getByText("method")).toBeInTheDocument();
  });

  it("should render TableSkeleton when item prop is not provided", () => {
    const { getByTestId } = render(<BatchInformation />);
    const tableSkeleton = getByTestId("table-skeleton");
    expect(tableSkeleton).toBeInTheDocument();
  });
});
