import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import DocumentRejectionModal from '@/app/documents/_modals/DocumentRejectionModal';
import { rejectPendingDocument } from '@/app/documents/_services';

// Mocking useRouter and useParams from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('@/app/documents/_services', () => ({
  rejectPendingDocument: jest.fn(),
}));

describe('DocumentRejectionModal', () => {
  const mockRouterReplace = jest.fn();
  const mockRouterRefresh = jest.fn();

  beforeEach(() => {
    // Reset the mock functions before each test
    jest.clearAllMocks();
    require('next/navigation').useParams.mockReturnValue({ id: '123' });
    require('next/navigation').useRouter.mockReturnValue({
      replace: mockRouterReplace,
      refresh: mockRouterRefresh,
    });
  });

  it('renders modal and handles rejection correctly when nextDocId is provided', async () => {
    const fileName = 'TestFile.pdf';

    render(<DocumentRejectionModal fileName={fileName} nextDocId='456' />);

    const rejectButton = screen.getByRole('button', {
      name: /reject document/i,
    });
    fireEvent.click(rejectButton);

    const modalHeader = await screen.findByText(
      /Reject digital document/i
    );
    expect(modalHeader).toBeInTheDocument();

    const rejectSubmitButton = screen.getByRole('button', {
      name: /reject document/i,
    });

    // Simulate form submission
    fireEvent.change(screen.getByLabelText(/comments/i), {
      target: { value: 'Test rejection reason' },
    });
    fireEvent.click(rejectSubmitButton);

    // Expect rejectPendingDocument to be called with correct arguments
    await waitFor(() => {
      expect(rejectPendingDocument).toHaveBeenCalledWith(
        '123',
        'Test rejection reason'
      );
    });

    // Expect router functions to be called correctly
    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith('/documents/tasks/456', {
        scroll: false,
      });
      expect(mockRouterRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it('renders modal and handles rejection correctly when nextDocId is not provided', async () => {
    const fileName = 'TestFile.pdf';

    render(<DocumentRejectionModal fileName={fileName} />);

    const rejectButton = screen.getByRole('button', {
      name: /reject document/i,
    });
    fireEvent.click(rejectButton);

    const modalHeader = await screen.findByText(
      /Reject digital document/i
    );
    expect(modalHeader).toBeInTheDocument();

    const rejectSubmitButton = screen.getByRole('button', {
      name: /Reject Document/i,
    });

    // Simulate form submission
    fireEvent.change(screen.getByLabelText(/comments/i), {
      target: { value: 'Test rejection reason' },
    });
    fireEvent.click(rejectSubmitButton);

    // Expect rejectPendingDocument to be called with correct arguments
    await waitFor(() => {
      expect(rejectPendingDocument).toHaveBeenCalledWith(
        '123',
        'Test rejection reason'
      );
    });

    // Expect router functions to be called correctly
    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith('/documents/tasks');
      expect(mockRouterRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it('displays error message when reason is not provided', async () => {
    const fileName = 'TestFile.pdf';

    render(<DocumentRejectionModal fileName={fileName} nextDocId='456' />);

    const rejectButton = screen.getByRole('button', {
      name: /Reject Document/i,
    });
    fireEvent.click(rejectButton);

    const rejectSubmitButton = screen.getByRole('button', {
      name: /Reject Document/i,
    });
    fireEvent.click(rejectSubmitButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Please write your comments before rejecting the document.')).toBeInTheDocument();
    });
  });
});
