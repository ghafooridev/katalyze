import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ExtractedDataJson } from "@/components/ExtractedData/ExtractedDataJson";
import { Digitalization } from "@/types/Digitalization.schema";

// Mock data for Digitalization
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

describe("ExtractedDataJson Component", () => {
  test("has the correct class names", () => {
    const { container } = render(<ExtractedDataJson data={mockData} />);

    const divElement = container.firstChild;
    // expect(divElement).toHaveClass('h-[718px]');
    expect(divElement).toHaveClass('rounded-bl-lg');
    expect(divElement).toHaveClass('rounded-br-lg');
    expect(divElement).toHaveClass('border');
    expect(divElement).toHaveClass('bg-gray-900');
    expect(divElement).toHaveClass('py-4');
    expect(divElement).toHaveClass('px-4');
    expect(divElement).toHaveClass('dark:bg-gray-900');
    expect(divElement).toHaveClass('text-primary-foreground');
    expect(divElement).toHaveClass('shadow-sm');
    expect(divElement).toHaveClass('relative');
    expect(divElement).toHaveClass('overflow-auto');
    expect(divElement).toHaveClass('w-full');
    expect(divElement).toHaveClass('whitespace-nowrap');
    expect(divElement).toHaveClass('border-gray-200');
    
  });

  test("pre element has correct class names", () => {
    const { container } = render(<ExtractedDataJson data={mockData} />);

    const preElement = container.querySelector("pre");
    expect(preElement).toHaveClass("overflow-hidden");
    expect(preElement).toHaveClass("w-max");
  });

  test("code element has correct class names", () => {
    const { container } = render(<ExtractedDataJson data={mockData} />);

    const codeElement = container.querySelector("code");
    expect(codeElement).toHaveClass("overflow-hidden");
    expect(codeElement).toHaveClass("w-max");
    expect(codeElement).toHaveClass("text-xs");
    expect(codeElement).toHaveClass("leading-5");
  });
});
