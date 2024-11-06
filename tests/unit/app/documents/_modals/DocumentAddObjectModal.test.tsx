import React from 'react';
import { fireEvent, render, renderHook, screen} from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import DocumentAddObjectModal from '@/app/documents/_modals/DocumentAddObjectModal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
  toastMessage: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: () => ({ id: 'mock-id' }),
}));

const mockHandleAddObject = jest.fn();
const mockHandleResetField = jest.fn();
const mockHandleDiscardObject = jest.fn();
const containerRef = { current: document.createElement('div') };

const mockGroupedPaths = {
  materialAttributes: [
    `materialAttributes.2.attributeName`,
    `materialAttributes.2.resultMaxInclusive`,
  ],
};
const { result } = renderHook(() => useForm());
const { control } = result.current;

describe('DocumentAddObjectModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.appendChild(containerRef.current);
  });
  afterEach(() => {
    jest.restoreAllMocks();
    containerRef.current.remove();
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      handleAddObject: mockHandleAddObject,
      handleDiscardObject: mockHandleDiscardObject,
      groupedPaths: mockGroupedPaths,
      containerRef: containerRef,
      control: control as any,
      handleResetField: mockHandleResetField,
      ...props,
    };

    return render(<DocumentAddObjectModal {...defaultProps} />);
  };
  
  it('renders correctly', async () => {
    renderComponent();
    expect(screen.getByTestId('add-object-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-object-button'));
    expect(screen.getByTestId('add-object-modal')).toBeInTheDocument();
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('discard-button')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    
  });
  it('renders correctly with empty groupedPaths array', async () => {
    renderComponent({groupedPaths: []});
    expect(screen.getByTestId('add-object-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-object-button'));
    expect(screen.getByTestId('add-object-modal')).toBeInTheDocument();
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('discard-button')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
  it('renders correctly with empty groupedPaths array', async () => {
    renderComponent({groupedPaths: []});
    expect(screen.getByTestId('add-object-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-object-button'));
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(mockHandleAddObject).toHaveBeenCalledTimes(1);
  });
  it('renders correctly with undefined portalContainer', async () => {
    renderComponent({ containerRef: { current: undefined } });
    expect(screen.getByTestId('add-object-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-object-button'));
    expect(screen.getByTestId('add-object-modal')).toBeInTheDocument();
  });
  it('renders correctly when discard button is click', async () => {
    renderComponent();
    expect(screen.getByTestId('add-object-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-object-button'));
    fireEvent.click(screen.getByTestId('discard-button'));
    expect(mockHandleDiscardObject).toHaveBeenCalledTimes(1);
  });
});
