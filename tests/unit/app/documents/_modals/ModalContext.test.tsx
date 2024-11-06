
import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { ModalProvider, useModal } from '@/app/documents/_modals/ModalContext';
import { render, fireEvent, waitFor } from '@testing-library/react';

const MockComponent = () => {
  const { openModal, setOpenModal, edits, setEdits } = useModal();
  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Open Modal</button>
      <button onClick={() => setEdits(edits + 1)}>Increment Edits</button>
      <div>Open Modal: {openModal ? 'true' : 'false'}</div>
      <div>Edits: {edits}</div>
    </div>
  );
};

describe('ModalProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <ModalProvider>
        <MockComponent />
      </ModalProvider>
    );
    expect(getByText('Open Modal')).toBeInTheDocument();
  });

  it('should update openModal state', async () => {
    const { getByText } = render(
      <ModalProvider>
        <MockComponent />
      </ModalProvider>
    );
    const button = getByText('Open Modal');
    fireEvent.click(button);
    await waitFor(() => getByText('Open Modal: true'), { timeout: 200 });
  });

  it('should update edits state', async () => {
    const { getByText } = render(
      <ModalProvider>
        <MockComponent />
      </ModalProvider>
    );
    const button = getByText('Increment Edits');
    fireEvent.click(button);
    await waitFor(() => getByText('Edits: 1'), { timeout: 200 });
  });

  it('should throw error when useModal is used outside ModalProvider', () => {
    expect(() => render(<MockComponent />)).toThrowError(
      'useModal must be used within a ModalProvider'
    );
  });

  it.skip('should return initial openModal state', () => {
    const { getByText } = render(
      <ModalProvider>
        <MockComponent />
      </ModalProvider>
    );
    expect(getByText('Open Modal: false')).toBeInTheDocument();
  });

  it('should return initial edits state', () => {
    const { getByText } = render(
      <ModalProvider>
        <MockComponent />
      </ModalProvider>
    );
    expect(getByText('Edits: 0')).toBeInTheDocument();
  });
});