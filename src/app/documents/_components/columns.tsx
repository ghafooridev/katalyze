'use client';

import { Checkbox, Chip, Tooltip } from '@nextui-org/react';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import ApprovalStatusIcon from '@/icons/ApprovalStatusIcon';
import FolderIcon from '@/icons/FolderIcon';
import PdfIcon from '@/icons/PdfIcon';
import PendingStatusIcon from '@/icons/PendingStatusIcon';
import { Digitalization } from '@/types/Digitalization.schema';

import ColumnHeaderSortButton from './columnHeader';

export const columns: ColumnDef<Digitalization>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="border-gray-300 data-[state=checked]:bg-primary-200-opacity-10
        data-[state=checked]:border-primary-600 data-[state=unchecked]:bg-primary-foreground
        data-[state=unchecked]:border-gray-300 data-[state=checked]:text-primary-600"
        isSelected={table.getIsAllPageRowsSelected()}
        isIndeterminate={table.getIsSomePageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        aria-label="Select all"
        classNames={{ label: 'bg-primary-foreground' }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-gray-300 data-[state=checked]:bg-primary-200-opacity-10
         data-[state=checked]:border-primary-600
         data-[state=unchecked]:bg-primary-foreground data-[state=unchecked]:border-gray-300
         data-[state=checked]:text-primary-600"
        isSelected={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fileName',
    header: () => (
      <span className="p-0 data-[hover=true]:bg-gray-100 text-gray-600 text-xs
      font-medium leading-[18px] gap-1">File Name</span>
    ),
    cell: ({ row }) => (
      <Link
        href={`/documents/${row.original.status === 'approved' ? 'browse' : 'tasks'}/${row.original.id}`}
        target="_self"
        rel="noopener noreferrer"
        className="flex items-center "
        title={`${row.original.file.name}`}
      >
        <span className="min-w-[200px] max-w-[210px] truncate ">
          <span
            className="truncate
      text-gray-900 text-sm font-medium leading-tight"
          >
            {row.original.file.name}
          </span>
        </span>
      </Link>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'originalFile',
    header: () => (
      <span className="p-0 data-[hover=true]:bg-gray-100 text-gray-600 text-xs
      font-medium leading-[18px] gap-1">Original File</span>
    ),
    cell: ({ row }) => (
      <Link
        href={`/documents/${row.original.status === 'approved' ? 'browse' : 'tasks'}/${row.original.id}`}
        target="_self"
        rel="noopener noreferrer"
        className="flex items-center "
        title={`${row.original.file.name}`}
      >
        <PdfIcon />
        <span
          className="max-w-[150px] truncate
         text-gray-900 text-sm font-normal leading-tight"
        >
          {row.original.file.name}
        </span>
      </Link>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'documentType',
    header: () => (
      <span className="p-0 data-[hover=true]:bg-gray-100 text-gray-600 text-xs
      font-medium leading-[18px] gap-1">Document Type</span>
    ),
    cell: ({ row }) => (
      <Chip size="sm" variant="bordered" classNames={{
        base: 'border-[1.5px] border-gray-600',
        content: 'font-medium text-xs text-gray-700',
      }}>
        <span className="flex text-gray-700 text-xs font-medium leading-[18px]">
          <span className="z-10 relative mt-auto mb-auto pr-1 pl-1">
            <FolderIcon />
          </span>
          {row.original.documentType}
        </span>
      </Chip>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'material',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Material Name
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => {
      if (!row.original.material.name) return <div data-testid='empty-material'></div>;
      if (row.original.material.name.length > 24) {
        return (
          <Tooltip showArrow={true} color="foreground" content={
            <Chip size="sm" variant="bordered" classNames={{
              base: 'border-[1.5px] border-gray-600',
              content: 'font-medium text-xs text-gray-700',
            }}>
              <div className="text-white font-medium leading-[18px]">
                {row.original.material.name}
              </div>
            </Chip>
          }>
            <Chip size="sm" variant="bordered" classNames={{
              base: 'border-[1.5px] border-gray-600',
              content: 'font-medium text-xs text-gray-700',
            }}>
              <div className="text-gray-700 text-xs max-w-[160px] truncate font-medium leading-[18px]">
                {row.original.material.name}
              </div>
            </Chip>
          </Tooltip>
        );
      }
      return (
        <Chip size="sm" variant="bordered" classNames={{
          base: 'border-[1.5px] border-gray-600',
          content: 'font-medium text-xs text-gray-700',
        }}>
          <div className="text-gray-700 text-xs max-w-[160px] truncate font-medium leading-[18px]">
            {row.original.material.name}
          </div>
        </Chip>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'vendor',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>Vendor</ColumnHeaderSortButton>
    ),
    cell: ({ row }) => {
      if (!row.original.vendor.name) return <div data-testid='empty-vendor'></div>;
      if (row.original.vendor.name.length > 16) {
        return (
          <Tooltip showArrow={true} color="foreground" content={
            <Chip size="sm" variant="bordered">
              <div className="text-white font-medium leading-[18px]">
                {row.original.vendor.name}
              </div>
            </Chip>
          }>
            <Chip size="sm" variant="bordered" classNames={{
              base: 'border-[1.5px] border-gray-600',
              content: 'font-medium text-xs text-gray-700',
            }}>
              <div className="text-gray-700 text-xs max-w-[100px] truncate font-medium leading-[18px]">
                {row.original.vendor.name}
              </div>
            </Chip>
          </Tooltip>
        );
      }
      return (
        <Chip size="sm" variant="bordered" classNames={{
          base: 'border-[1.5px] border-gray-600',
          content: 'font-medium text-xs text-gray-700',
        }}>
          <div className="text-gray-700 text-xs max-w-[100px] truncate font-medium leading-[18px]">
            {row.original.vendor.name}
          </div>
        </Chip>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'reviewedBy',
    header: () => (
      <span className="p-0 data-[hover=true]:bg-gray-100 text-gray-600 text-xs
      font-medium leading-[18px] gap-1">Approved By</span>
    ),
    cell: ({ row }) => <div className="">{row.original.reviewedBy}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <ColumnHeaderSortButton column={column}>
        Last Edited
      </ColumnHeaderSortButton>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleDateString('en-US');
      return <div>{formattedDate}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: () => (
      <span className="p-0 data-[hover=true]:bg-gray-100 text-gray-600 text-xs
      font-medium leading-[18px] gap-1">Status</span>
    ),
    cell: ({ row }) => (
      <div className="relative flex justify-center align-center">
        {row.original.status === 'approved' ? (
          <ApprovalStatusIcon />
        ) : (
          <PendingStatusIcon />
        )}
        <span className="sr-only">{row.original.status}</span>
      </div>
    ),
    enableSorting: true,
  },
];
