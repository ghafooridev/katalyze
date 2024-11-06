import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import DocumentApprovalModal from '@/app/documents/_modals/DocumentApprovalModal';

// Mock useRouter
const mockReplace = jest.fn();
const mockRefresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
    refresh: mockRefresh,
  }),
}));

describe('DocumentApprovalModal', () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      onSubmit: onSubmitMock,
      nextId: '',
      numberOfEdits: 1,
      currentId: '123',
      ...props,
    };

    return render(<DocumentApprovalModal {...defaultProps} />);
  };

  it('renders the button and modal correctly', () => {
    renderComponent({ numberOfEdits: 1 }); // Adjust numberOfEdits as needed for this test

    const button = screen.getByRole('button', { name: /approve document/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const modalHeader = screen.getByText(/Approve digital document/i);
    expect(modalHeader).toBeInTheDocument();

    const modalBody = screen.getByText(
      /You have made 1 change to this document./i
    );
    expect(modalBody).toBeInTheDocument();

    const goBackButton = screen.getByRole('button', { name: /go back/i });
    expect(goBackButton).toBeInTheDocument();

    const approveButton = screen.getByRole('button', {
      name: /Approve Document/i,
    });
    expect(approveButton).toBeInTheDocument();
  });

  it('handles approve action correctly when nextId is provided', () => {
    renderComponent({ nextId: '456' });

    const button = screen.getByRole('button', { name: /Approve Document/i });
    fireEvent.click(button);

    const approveButton = screen.getByRole('button', {
      name: /Approve Document/i,
    });
    fireEvent.click(approveButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/documents/tasks/456', {
      scroll: false,
    });
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('handles approve action correctly when nextId is not provided', () => {
    renderComponent();

    const button = screen.getByRole('button', { name: /Approve Document/i });
    fireEvent.click(button);

    const approveButton = screen.getByRole('button', {
      name: /Approve Document/i,
    });
    fireEvent.click(approveButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/documents/tasks');
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('displays correct text based on numberOfEdits', () => {
    renderComponent({ numberOfEdits: 3 }); // Change numberOfEdits value to test different scenarios

    const button = screen.getByRole('button', { name: /Approve Document/i });
    fireEvent.click(button);

    const modalBody = screen.getByText(
      /You have made 3 changes to this document./i
    );
    expect(modalBody).toBeInTheDocument();
  });
});
