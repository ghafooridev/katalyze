import React from "react";
import { describe, expect } from "@jest/globals";
import { fireEvent, getByTestId, render, waitFor } from "@testing-library/react";
import { Column, ColumnDef } from "@tanstack/react-table";
import { MaterialBatch } from "@/types/RawMaterial";
import ColumnHeader from "@/app/raw-materials/browsing-batches/_components/ColumnHeader";
import BrowsingBatchesDataTable from "@/app/raw-materials/[materialId]/_components/specifications/Table";

type TestData = {
  batchId: string;
  vendorBatchId: string;
  rating: { value: string; trend: string; };
  status: string;
  vendor: { id: string; name: string; };
  expiryDate: string;
  material: { id: string; gmid: string; lmid: string; name: string; };
  expiresOn: string;
};

const columns: ColumnDef<TestData, unknown>[] = [
  {
    accessorKey: "batchId",
    header: ({ column }) => (
      <ColumnHeader column={column as Column<MaterialBatch, unknown>}>Batch ID</ColumnHeader>
    ),
    cell: ({ row }) => <div>{row.original.batchId}</div>,
  },
  {
    accessorKey: "vendorBatchId",
    header: ({ column }) => (
      <div>Vendor Batch ID</div>
    ),
    cell: ({ row }) => <div>{row.original.vendorBatchId}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'GMId',
    header: ({ column }) => (
      <div>GMID</div>
    ),
    cell: ({ row }) => (
      <div>{row.original.material.gmid}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'LMId',
    header: ({ column }) => (
      <div>LMID</div>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.material.lmid}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'materialId',
    header: ({ column }) => (
      <div>Material ID</div>
    ),
    cell: ({ row }) => <div className=''>{row.original.material.id}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'materialName',
    header: ({ column }) => (
      <div>
        Material Name
      </div>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.material.name}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <div>Process</div>
    ),
    cell: ({ row }) => <div>{row.original.rating.value}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'score',
    header: ({ column }) => (
      <div>
        Score
      </div>
    ),
    cell: ({ row }) => <div>{row.original.rating.value}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'vendor',
    header: ({ column }) => (
      <div>Vendor</div>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.vendor.name}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'expireDate',
    header: ({ column }) => (
      <div>
        Expires on
      </div>
    ),
    cell: ({ row }) => <div>{row.original.expiryDate}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'availability',
    header: ({ column }) => (
      <div>
        Data Availability
      </div>
    ),
    cell: ({ row }) => (
      <div className='relative flex justify-center align-center'>
        <div>
          Available
        </div>
      </div>
    ),
    enableSorting: true,
  },
];

const data: TestData[] = [
  {
    batchId: "batchID",
    vendorBatchId: "Vendor Batch ID",
    rating: { value: "1", trend: "2" },
    status: "available",
    vendor: {
      id: "1",
      name: "vendor name"
    },
    expiryDate: "1",
    material: {
      id: "1",
      gmid: "1",
      lmid: "1",
      name: "1"
    },
    expiresOn: "1",
  },]

describe("RM batches", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders table headers and cells correctly", () => {

    const { getAllByRole } = render(
      <BrowsingBatchesDataTable
        columns={columns}
        data={data}
      />
    );

    const headerCells = getAllByRole("columnheader");
    expect(headerCells.length).toBe(columns.length);
    expect(headerCells[0]).toHaveTextContent("Batch ID");
    expect(headerCells[1]).toHaveTextContent("Vendor Batch ID");

    expect(getAllByRole("rowheader")[0]).toHaveTextContent("batchID");
  });
});
