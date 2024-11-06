import React from 'react';

import ToastDownloadIcon from '@/icons/ToastDownloadIcon';

interface ToastContentProps {
  jsonData: object
  download: (jsonData: object) => void;
}

const ToastDownloadMultipleContent: React.FC<ToastContentProps> = ({ jsonData, download }) => (
  <div className="pr-3">
    <div className="flex flex-row items-start">
      <div className="w-[42px] h-[42px]">
        <ToastDownloadIcon />
      </div>
      <div className="ml-2 flex flex-col">
        <span className="text-gray-900 text-sm font-semibold leading-tight">
          File is downloading. If download doesn&apos;t start automatically, click the button below.
        </span>
      </div>
    </div>
    <div className="flex">
      <button
        onClick={() => download(jsonData)}
        className="mt-4 ml-auto text-primary-700 text-sm font-semibold leading-tight"
      >
        Download Manually
      </button>
    </div>
  </div>
);

export default ToastDownloadMultipleContent;
