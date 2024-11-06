
import ProcessSelector from '@/app/raw-materials/[materialId]/_components/processSelector';
import { describe, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getProcessDropDowns } from '@/app/raw-materials/_services';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('@/app/raw-materials/_services', () => ({
    getProcessDropDowns: jest.fn(() => ([
        {
            process: 'Process 1',
            product: 'Product 1',
            uiProduct: 'Product 1', 
            site: 'Site 1',
            steps: [
                { name: 'Step 1', uiName: 'Step 1' },
                { name: 'Step 2', uiName: 'Step 2' },
            ],
            },
            {
            process: 'Process 2',
            product: 'Product 2',
            uiProduct: 'Product 2', 
            site: 'Site 2',
            steps: [
                { name: 'Step 3', uiName: 'Step 3' },
                { name: 'Step 4', uiName: 'Step 4' },
            ],
        },
    ])),
}));

describe('ProcessSelector', () => {
    const mockOnSelectProcess = jest.fn();
    const materialId = 'test-material-id';

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders compnent', async () => {
        // (getProcessDropDowns as jest.Mock).mockResolvedValue([]);

        render(<ProcessSelector onSelectProcess={mockOnSelectProcess} materialId={materialId} />);

        await waitFor(() => {
            expect(screen.queryByText('Process 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Process 2')).not.toBeInTheDocument();
        });
    });

    it('should handle onChangeFiled', async () => {
        render(<ProcessSelector onSelectProcess={mockOnSelectProcess} materialId={materialId} />)

        await waitFor(() => {
            expect(screen.getByTestId('ProcessSelect')).toBeInTheDocument();
            const processSelect = screen.getByTestId('ProcessSelect');
            userEvent.click(processSelect);
        });
        const process1 = screen.getByLabelText('Product 1( Site 1 Process 1 )');
        userEvent.click(process1);

        await waitFor(() => {
            const processStepSelect = screen.getByTestId('ProcessStepSelect');
            userEvent.click(processStepSelect);
        });
        const processStep1 = screen.getByLabelText('Step 1');
        userEvent.click(processStep1);
    });
});
