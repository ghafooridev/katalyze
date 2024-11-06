'use client';

import {
  createContext, ReactNode, useContext, useMemo,
  useState,
} from 'react';

interface ModalContextProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  edits: number;
  setEdits: (edits: number) => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [edits, setEdits] = useState(0);
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const value = useMemo(() => ({
    openModal,
    setOpenModal: debounce(setOpenModal, 100),
    edits,
    setEdits: debounce(setEdits, 100),
  }), [openModal, edits]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
