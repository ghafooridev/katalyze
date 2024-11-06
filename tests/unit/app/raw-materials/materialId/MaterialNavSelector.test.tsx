import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MaterialNavSelector } from '../../../../../src/app/raw-materials/[materialId]/MaterialNavSelector';
import MaterialNavbar from '../../../../../src/app/raw-materials/_components/MaterialNavbar' // Mock this component if needed
import { describe, expect } from "@jest/globals";

jest.mock('../../../../../src/app/raw-materials/_components/MaterialNavbar', () => ({ children }) => <div>{children}</div>);

describe('MaterialNavSelector', () => {
    const defaultProps = {
        links: [],
        materialSelector: [{ id: '1', name: 'Material 1' }, { id: '2', name: 'Material 2' }],
        selectedMaterial: '1',
        onChangeSelector: jest.fn(),
    };

    test('renders Autocomplete when materialSelector is provided', () => {
        render(<MaterialNavSelector {...defaultProps} />);
        expect(screen.getByLabelText('Select Raw Material')).toBeInTheDocument();
    });

    test('does not render Autocomplete when materialSelector is empty', () => {
        render(<MaterialNavSelector {...defaultProps} materialSelector={[]} />);
        expect(screen.queryByLabelText('Select Raw Material')).not.toBeInTheDocument();
    });

    // test('calls onChangeSelector with the correct value when a material is selected', async () => {
    //     render(<MaterialNavSelector {...defaultProps} />);
    //     await fireEvent.change(screen.getByLabelText('Select Raw Material'), { target: { value: '2' } });
    //     expect(defaultProps.onChangeSelector).toHaveBeenCalledWith(0);
    // });

    test('does not call onChangeSelector if no selection is made', () => {
        render(<MaterialNavSelector {...defaultProps} />);
        expect(defaultProps.onChangeSelector).not.toHaveBeenCalled();
    });
});
