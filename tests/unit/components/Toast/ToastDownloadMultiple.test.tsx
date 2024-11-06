import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import ToastDownloadMultipleContent from '@/components/Toast/ToastDownloadMultiple';


describe('ToastDownloadMultipleContent Component', () => {

    const mockJsonData = { key: 'value' };
    const mockDownloadFn = jest.fn();

    test('renders component correctly', () => {
      const { getByText } = render(
        <ToastDownloadMultipleContent jsonData={mockJsonData} download={mockDownloadFn} />
      );
  
      expect(getByText('Download Manually')).toBeInTheDocument();
    });
  
    test('calls download function on button click', () => {
      const { getByText } = render(
        <ToastDownloadMultipleContent jsonData={mockJsonData} download={mockDownloadFn} />
      );
  
      const downloadButton = getByText('Download Manually');
      fireEvent.click(downloadButton);
  
      expect(mockDownloadFn).toHaveBeenCalledWith(mockJsonData);
    });
  });