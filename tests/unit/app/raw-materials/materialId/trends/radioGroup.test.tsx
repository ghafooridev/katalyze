import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrendsRadioGroup, { RadioGroupProps } from '@/app/raw-materials/[materialId]/trends/_components/RadioGroup';
import { describe, expect } from '@jest/globals';

describe('TrendsRadioGroup Component', () => {
    const mockOnChange = jest.fn();
    const defaultProps = {
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
        ],
        label: 'Select an Option',
        color: "primary",
        onChange: mockOnChange,
        loading: false,
    } as RadioGroupProps;

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    it('renders correctly with the given props', () => {
        render(<TrendsRadioGroup {...defaultProps} />);

        // Check if the label is rendered
        expect(screen.getByText('Select an Option')).toBeInTheDocument();

        // Check if the options are rendered
        defaultProps.options.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it('calls onChange when a radio option is selected', () => {
        render(<TrendsRadioGroup {...defaultProps} />);

        // Select the first radio button
        fireEvent.click(screen.getByLabelText('Option 1'));

        // Check if the onChange handler is called with the correct value
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith('option1');
    });

    it('disables radio options when loading is true', () => {
        render(<TrendsRadioGroup {...defaultProps} loading={true} />);

        // Check if the radio buttons are disabled
        defaultProps.options.forEach((option) => {
            expect(screen.getByLabelText(option.label)).toBeDisabled();
        });
    });
});
