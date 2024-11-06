import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import DocumentConfirmExitModal from '@/app/documents/_modals/DocumentConfirmExitModal';
import { ModalContext } from '@/app/documents/_modals/ModalContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('DocumentConfirmExitModal', () => {

  it('should render button when openModal is false', () => {
    render(
      <ModalContext.Provider value={{ openModal: false, setOpenModal: jest.fn(), edits: 1, setEdits: jest.fn() }}>
        <DocumentConfirmExitModal next={false} id="1" />
      </ModalContext.Provider>
    );
    expect(screen.getByTestId('document-button')).toBeInTheDocument();
  });
  it('should render button when openModal is true', () => {
    render(
      <ModalContext.Provider value={{ openModal: false, setOpenModal: jest.fn(), edits: 1, setEdits: jest.fn() }}>
        <DocumentConfirmExitModal next={true} id="1" />
      </ModalContext.Provider>
    );
    expect(screen.getByTestId('document-button')).toBeInTheDocument();
  });

  it('should open modal when button is clicked', () => {
    render(
      <ModalContext.Provider value={{ openModal: true, setOpenModal: jest.fn(), edits: 1, setEdits: jest.fn() }}>
        <DocumentConfirmExitModal next={false} id="1" />
      </ModalContext.Provider>
    );
    const button = screen.getByTestId('isDirty-document-button');
    fireEvent.click(button);
    expect(screen.getByText('You are about to discard changes')).toBeInTheDocument();
  });

  it('should close modal and discard changes when discard button is clicked', () => {
    render(
      <ModalContext.Provider value={{ openModal: true, setOpenModal: jest.fn(), edits: 1, setEdits: jest.fn() }}>
        <DocumentConfirmExitModal next={false} id="1" />
      </ModalContext.Provider>
    );
    const button = screen.getByTestId('isDirty-document-button');
    fireEvent.click(button);
    const discardButton = screen.getByTestId('discard-document-button');
    fireEvent.click(discardButton);
  });
});