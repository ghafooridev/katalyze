import React from "react";
import { describe, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import BatchCoaTable, {
  handleDownload,
} from "@/app/raw-materials/[materialId]/[batchId]/_components/batch-coa/_components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { BatchCharacteristicSpecification } from "@/types/RawMaterial";
import ColumnHeader from "@/app/raw-materials/[materialId]/[batchId]/_components/batch-coa/_components/ColumnHeader";
import { getDocumentJson } from "@/app/documents/_services";


const columns: ColumnDef<BatchCharacteristicSpecification>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column}>Name</ColumnHeader>,
    cell: ({ row }) => <div>{row.original.name}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "value",
    header: ({ column }) => <ColumnHeader column={column}>Value</ColumnHeader>,
    cell: ({ row }) => <div>{row.original.value}</div>,
    enableSorting: true,
  },
];

const data = [
  {
    name: "name",
    value: "value",
    unit: "unit",
    method: "method",
    source: "source",
    range: "range",
  },
];


describe("BrowsingBatchesDataTable", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders table headers and cells correctly", () => {
    const { getAllByRole } = render(
      <BatchCoaTable columns={columns} data={data} />
    );

    const headerCells = getAllByRole("columnheader");
    expect(headerCells.length).toBe(columns.length);
    expect(headerCells[0]).toHaveTextContent("Name");
    expect(headerCells[1]).toHaveTextContent("Value");

    expect(getAllByRole("rowheader")[0]).toHaveTextContent("name");
    expect(getAllByRole("gridcell")[0]).toHaveTextContent("value");
  });
});

describe("handleDownload", () => {
  let id: string;
  beforeEach(() => {
    document.body.innerHTML = "";
    id = "test-id";
    global.URL.createObjectURL = jest.fn();
    global.document.body.appendChild = jest.fn();
    global.document.body.removeChild = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a download link and append it to the body", async () => {
    await handleDownload(id);
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(global.document.body.appendChild).toHaveBeenCalledTimes(1);
  });
});
