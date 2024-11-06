import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import DocumentCancelModal from '@/app/documents/_modals/DocumentCancelModal';

describe('DocumentCancelModal', () => {
  const onCancelMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      onCancel: onCancelMock,
      numberOfEdits: 1,
      currentId: '123',
      ...props,
    };

    return render(<DocumentCancelModal {...defaultProps} />);
  };

  it('renders discard button when numberOfEdits is greater than 0', () => {
    renderComponent({ numberOfEdits: 1 });

    const discardButton = screen.getByRole('button', { name: /discard/i });
    expect(discardButton).toBeInTheDocument();
  });

  it('renders direct discard button when numberOfEdits is 0', () => {
    renderComponent({ numberOfEdits: 0 });

    const discardButton = screen.getByRole('button', { name: /discard/i });
    expect(discardButton).toBeInTheDocument();
    fireEvent.click(discardButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it('opens modal when discard button is clicked and handles modal buttons', () => {
    renderComponent({ numberOfEdits: 1 });

    const discardButton = screen.getByRole('button', { name: /discard/i });
    fireEvent.click(discardButton);

    const modalBody = screen.getByText(
      /You have made 1 change to this document. If you discard, all changes will be lost/i
      );
    expect(modalBody).toBeInTheDocument();

    const goBackButton = screen.getByRole('button', { name: /go back/i });
    expect(goBackButton).toBeInTheDocument();
    fireEvent.click(goBackButton);

    // Re-open modal
    fireEvent.click(discardButton);

    // Ensure modal reopens correctly
    const modalBodyAfterReopen = screen.getByText(
      /You have made 1 change to this document. If you discard, all changes will be lost/i
    );
    expect(modalBodyAfterReopen).toBeInTheDocument();

    const discardChangesButton = screen.getByRole('button', {
      name: /discard changes/i,
    });
    fireEvent.click(discardChangesButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
  it('displays correct text based on numberOfEdits', () => {
    renderComponent({ numberOfEdits: 3 }); // Change numberOfEdits value to test different scenarios

    const discardButton = screen.getByRole('button', { name: /discard/i });
    fireEvent.click(discardButton);

    const modalBody = screen.getByText(
      /You have made 3 changes to this document. If you discard, all changes will be lost/i
    );
    expect(modalBody).toBeInTheDocument();

    const discardChangesButton = screen.getByRole('button', {
      name: /discard changes/i,
    });
    fireEvent.click(discardChangesButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);

    expect(
      screen.queryByText(/You have made 3 changes to this document. If you discard, all changes will be lost/i)
    );
  });
});
