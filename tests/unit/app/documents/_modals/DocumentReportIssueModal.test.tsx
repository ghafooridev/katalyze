import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import DocumentReportIssueModal from '@/app/documents/_modals/DocumentReportIssueModal';
import { UseDisclosureReturn } from '@nextui-org/use-disclosure';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('DocumentReportIssueModal', () => {
  const mockRouterReplace = jest.fn();
  const mockRouterRefresh = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require('next/navigation').useParams.mockReturnValue({ id: '123' });
    require('next/navigation').useRouter.mockReturnValue({
      replace: mockRouterReplace,
      refresh: mockRouterRefresh,
    });
  });

  const mockDisclosure: UseDisclosureReturn = {
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    onOpenChange: jest.fn(),
    isControlled: false,
    getButtonProps: jest.fn(),
    getDisclosureProps: jest.fn(),
  };

  it('renders modal and handles issue reporting correctly', () => {
    render(<DocumentReportIssueModal disclosure={mockDisclosure} />);

    // Simulate clicking on the "Report Issue" button to open the modal
    const reportIssueButton = screen.getByRole('button', {
      name: /report issue/i,
    });
    fireEvent.click(reportIssueButton);

    // Simulate filling out the explanation textarea
    const explanationTextarea = screen.getByLabelText(/Explanation*/i);
    fireEvent.change(explanationTextarea, {
      target: { value: 'Test issue explanation' },
    });

    // Simulate clicking on the "Report Issue" button to trigger form submission
    const submitButton = screen.getByRole('button', { name: /report issue/i });
    fireEvent.click(submitButton);
  });

  it('displays error message if explanation is not provided', async () => {
    render(<DocumentReportIssueModal disclosure={mockDisclosure} />);

    // Simulate clicking on the "Report Issue" button to open the modal
    const reportIssueButton = screen.getByRole('button', {
      name: /report issue/i,
    });
    fireEvent.click(reportIssueButton);

    // Simulate clicking on the "Report Issue" button without filling out the explanation
    const submitButton = screen.getByRole('button', { name: /report issue/i });
    fireEvent.click(submitButton);

    // Expect error message to be displayed
    const errorMessage = await screen.findByText(
      /You cannot report an issue without providing an explanation./i
    );
    expect(errorMessage).toBeInTheDocument();

    // Expect router refresh, toast, and onClose not to be called
    expect(mockRouterRefresh).not.toHaveBeenCalled();
    expect(mockToast).not.toHaveBeenCalled();
    expect(mockDisclosure.onClose).not.toHaveBeenCalled();
  });
});
