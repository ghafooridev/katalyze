import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import ToastDownloadContent from '@/components/Toast/ToastDownload';

describe('ToastDownloadContent Component', () => {
  const mockDownloadFn = jest.fn();

  test('renders component with correct content', () => {
    const id = 'sample-id';
    const { getByText } = render(<ToastDownloadContent id={id} download={mockDownloadFn} />);

    expect(getByText('File is downloading. If download doesn\'t start automatically, click the button below.')).toBeInTheDocument();
    expect(getByText('Download Manually')).toBeInTheDocument();
  });

  test('calls download function when button is clicked', () => {
    const id = 'sample-id';
    const { getByText } = render(<ToastDownloadContent id={id} download={mockDownloadFn} />);

    const downloadButton = getByText('Download Manually');
    fireEvent.click(downloadButton);

    expect(mockDownloadFn).toHaveBeenCalledWith(id);
    expect(mockDownloadFn).toHaveBeenCalledTimes(1);
  });
});