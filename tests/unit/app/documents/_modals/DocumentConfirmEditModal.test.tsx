import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import DocumentConfirmEditModal from '@/app/documents/_modals/DocumentConfirmEditModal';

describe('DocumentConfirmEditModal', () => {
  const onConfirmMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      onConfirm: onConfirmMock,
      numberOfEdits: 1,
      currentId: '123',
      ...props,
    };

    return render(<DocumentConfirmEditModal {...defaultProps} />);
  };

  it('renders save button when numberOfEdits is greater than 0', () => {
    renderComponent({ numberOfEdits: 1 });

    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    expect(saveButton).toBeInTheDocument();
  });

  it('renders direct confirmation button when numberOfEdits is 0', () => {
    renderComponent({ numberOfEdits: 0 });

    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it('opens modal when save button is clicked and handles modal buttons', () => {
    renderComponent({ numberOfEdits: 1 });

    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveButton);

    const modalHeader = screen.getByText(/You have made 1 change to the document. By confirming these changes will be saved and document will be edited for everyone./i);
    expect(modalHeader).toBeInTheDocument();

    const goBackButton = screen.getByRole('button', { name: /Go Back/i });
    expect(goBackButton).toBeInTheDocument();
    fireEvent.click(goBackButton);

    expect(screen.queryByText(/you are about to save 1 change/i));

    fireEvent.click(saveButton); // Re-open modal
    const confirmChangesButton = screen.getByRole('button', {
      name: /save changes/i,
    });
    fireEvent.click(confirmChangesButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
  it('renders correct message in ModalBody based on numberOfEdits', () => {
    renderComponent({ numberOfEdits: 1 });

    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveButton);

    // Use waitFor to wait for the modal content to appear

    const expectedText = `You have made 1 change to the document. By confirming these changes will be saved and document will be edited for everyone.`;
    const modalBody = screen.getByText(new RegExp(expectedText, 'i'));
    expect(modalBody).toBeInTheDocument();

    const goBackButton = screen.getByRole('button', { name: /Go Back/i });
    expect(goBackButton).toBeInTheDocument();
    fireEvent.click(goBackButton);

    // Re-open modal
    fireEvent.click(saveButton);

    // Ensure modal reopens correctly

    const expectedText2 = `You have made 1 change to the document. By confirming these changes will be saved and document will be edited for everyone.`;
    const modalBodyAfterReopen = screen.getByText(
      new RegExp(expectedText2, 'i')
    );
    expect(modalBodyAfterReopen).toBeInTheDocument();

    const confirmChangesButton = screen.getByRole('button', {
      name: /Save Changes/i,
    });
    fireEvent.click(confirmChangesButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});
