import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import ToastContainerShell from '../../../../src/components/Toast/ToastContainerShell';

jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe('ToastContainerShell', () => {
  it('renders without crashing', async () => {
    const { findByTestId } = render(<ToastContainerShell />);
    const toastContainerElement = await findByTestId('toast-container');
    expect(toastContainerElement).toBeInTheDocument();
  });
});