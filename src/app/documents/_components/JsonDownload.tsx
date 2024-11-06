import { toast } from 'react-toastify';

import ToastDownloadContent from '@/components/Toast/ToastDownload';

import { getDocumentJson } from '../_services';

export const handleJsonDownload = async (id: string) => {
  try {
    const blob = await getDocumentJson(id);
    const download = document.createElement('a');
    download.setAttribute('href', URL.createObjectURL(blob));
    download.setAttribute('download', 'ExtractedData.json');
    document.body.appendChild(download);
    download.click();
    toast.dismiss();
    toast(<ToastDownloadContent id={id} download={handleJsonDownload} />, {
      closeOnClick: false,
    });
    download.remove();
  } catch (error) {
    throw new Error('Error downloading JSON data:', error);
  }
};
