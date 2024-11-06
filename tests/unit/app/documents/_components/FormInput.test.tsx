// FormInput.test.tsx
import React from 'react';
import {
  render,
  screen,
  waitFor,
  renderHook,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import FormInput from "@/app/documents/_components/FormInput";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { HighlightRegionCtx } from '@/components/OriginalDocumentViewer/HighLightRegionCtx';

type FormValues = Record<string, any>;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn().mockReturnValue({ id: "1" }),
}));

const mockPathData = {
  createdBy: { id: "1" },
  type: "String" as "String" | "Object" | "Array",
  path: "batchInformation.vendorBatchID",
  createdAt: "2022-01-01T00:00:00Z",
  value: "Vendor 1",
  region: {
    x: 1,
    y: 1,
    width: 2,
    height: 2,
  },
  flagReasons: "",
  version: 2,
};

const mockPathData2 = {
  createdBy: { id: "1" },
  type: "String" as "String" | "Object" | "Array",
  path: "batchInformation.test",
  createdAt: "2022-01-01T00:00:00Z",
  value: "test",
  region: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  flagReasons: "",
  version: 1,
};

const mockSetIndex = jest.fn();
const mockSetVisibility = jest.fn();

const MockHighlightRegionCtxProvider = ({ children, value }) => (
  <HighlightRegionCtx.Provider value={value}>
    {children}
  </HighlightRegionCtx.Provider>
);

describe("Input", () => {
  let formMethods: UseFormReturn<FormValues>;
  let setValue: any;
  let handleResetField: jest.Mock;
  const handleCheckboxChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const { result } = renderHook(() =>
      useForm<FormValues>({
        defaultValues: {
          "batchInformation.vendorBatchID": "Vendor 1",
        },
      })
    );
    formMethods = result.current;
    setValue = formMethods.setValue;

    // Redefine handleResetField to reset the form field using resetField
    handleResetField = jest.fn((path, value) => {
      formMethods.resetField(path, { defaultValue: value });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderComponent = (props = {}, contextValue = {}) => {
    const defaultProps = {
      key: "batchInformation.vendorBatchID",
      name: "batchInformation.vendorBatchID",
      index: 0, 
      pathData: mockPathData,
      originalCreatedAt: "2022-01-01T00:00:00Z",
      isEditing: true,
      control: formMethods.control,
      handleResetField: handleResetField,
      ...props, 
    };

    const defaultContext = {
      index: 0, 
      setIndex: mockSetIndex,
      visible: true, 
      setVisibility: mockSetVisibility,
      ...contextValue, 
    };

    return {
      setValue,
      ...render(
        <MockHighlightRegionCtxProvider value={defaultContext}>
          <FormProvider {...formMethods}> {/* Pass all form methods */}
            <FormInput {...defaultProps} />
          </FormProvider>
        </MockHighlightRegionCtxProvider>
      ),
    };
  };

  it("renders input field with default props", () => {
    renderComponent();
    expect(screen.getByTestId("input-field")).toBeInTheDocument();
  });

  it("renders input field with checkbox", () => {
    renderComponent({
      checkbox: true,
      onCheckboxChange: handleCheckboxChange,
      currentStep: 0,
    });
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("checkbox"));
    expect(handleCheckboxChange).toHaveBeenCalled();
  });

  it("hides input row when isEditing is false and no value", () => {
    renderComponent({
      isEditing: false,
      index: 1,
      pathData: mockPathData2,
      key: "batchInformation.test",
      name: "batchInformation.test",
    });
    expect(screen.queryByTestId("input-field")).not.toBeInTheDocument();
  });

  it("disables input field when currentStep is 1 and isDisabledField is true", () => {
    renderComponent({
      currentStep: 1,
      name: "batchInformation.vendorBatchID",
    });
    expect(screen.getByTestId("input-field")).toBeDisabled();
  });

  it("handles visibility toggle correctly when visibility button is clicked with index=0 and visible=true", () => {
    renderComponent();

    const visibilityButton = screen.getByTestId("visibility-button");

    userEvent.click(visibilityButton);

    expect(mockSetIndex).toHaveBeenCalledWith(0);
    expect(mockSetVisibility).toHaveBeenCalledWith(false);
  });

  it("handles visibility toggle correctly when visibility button is clicked with index=1 and visible=false", () => {
    renderComponent(
      { index: 1 }, 
      { index: 1, visible: false } 
    );
    const visibilityButton = screen.getByTestId("visibility-button");
    userEvent.click(visibilityButton);
    expect(mockSetIndex).toHaveBeenCalledWith(1);
    expect(mockSetVisibility).toHaveBeenCalledWith(true);
  });

  it("renders and handles the undo tooltip correctly when field is dirty and version is not -1", async () => {
    renderComponent({ currentStep: 0 });

    const inputField = screen.getByTestId("input-field");
    expect(inputField).toBeInTheDocument();
    expect(inputField).not.toBeDisabled();

    // Simulate user typing to make the field dirty
    await userEvent.type(inputField, " New Vendor");

    // Wait for the undo button to appear
    const undoButton = await screen.findByTestId("undo-tooltip-button");
    expect(undoButton).toBeInTheDocument();
    expect(undoButton).toBeVisible();

    // Click the undo button
    await userEvent.click(undoButton);

    // Verify that handleResetField is called with correct arguments
    expect(handleResetField).toHaveBeenCalledWith(
      mockPathData.path,
      mockPathData.value
    );

    // Optionally, verify that the form's dirty state is false
    expect(formMethods.formState.isDirty).toBe(false);

    // Wait for the undo button to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByTestId("undo-tooltip-button")).not.toBeInTheDocument();
    });
  });

  it("does not render the undo tooltip when field is not dirty", () => {
    renderComponent({ currentStep: 0 });

    // Ensure that the undo button is not present
    expect(screen.queryByTestId("undo-tooltip-button")).not.toBeInTheDocument();
  });

  it("does not render the undo tooltip when pathData.version is -1", () => {
    const mockPathDataVersionMinusOne = {
      ...mockPathData,
      version: -1,
    };

    renderComponent({
      pathData: mockPathDataVersionMinusOne,
      currentStep: 0,
    });

    // Ensure that the undo button is not present
    expect(screen.queryByTestId("undo-tooltip-button")).not.toBeInTheDocument();
  });
});
