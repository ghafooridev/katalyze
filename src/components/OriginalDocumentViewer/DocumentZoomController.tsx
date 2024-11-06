'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { toast } from 'react-toastify';
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';
import {
  Button,
} from '@nextui-org/react';

import { getDocumentDownload } from '@/app/documents/_services';
import DownloadIcon from '@/icons/DownloadIcon';
import ZoomInIcon from '@/icons/ZoomInIcon';
import ZoomOutIcon from '@/icons/ZoomOutIcon';
import ZoomResetIcon from '@/icons/ZoomResetIcon';
import { Digitalization } from '@/types/Digitalization.schema';

import ToastDownloadContent from '../Toast/ToastDownload';

import { HighlightRegion } from './HighLightRegion';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  data?: Digitalization;
  id: string;
  pdfFile: string;
  isRM?: boolean;
  docName?: string;
}

export type PageDimensions = {
  width: number;
  height: number;
};

const DocumentZoomController: React.FC<Props> = ({
  data, id, pdfFile, isRM = false, docName,
}) => {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetZoom = () => {
    if (transformRef.current) {
      transformRef.current.resetTransform();
    }
  };

  const [numPages, setNumPages] = useState<number>();
  const [height, setHeight] = useState<string>('716px');
  const [pageDimensions, setPageDimensions] = useState<PageDimensions | null>(
    null,
  );

  const fetchPageDimensions = async (pdf) => {
    const pageNumber = 1; // Fetch only the first page
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    setPageDimensions({
      width: viewport.width,
      height: viewport.height,
    });
  };

  useEffect(() => {
    const loadDimensions = async () => {
      try {
        const pdf = await pdfjs.getDocument(pdfFile).promise;
        await fetchPageDimensions(pdf);
      } catch (error) {
        console.error('Error loading PDF dimensions:', error);
      }
    };

    loadDimensions();
  }, [pdfFile]);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 1360) {
        setHeight('439px');
      } else {
        setHeight('716px');
      }
    };

    updateHeight(); // Set initial height
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  function onDocumentLoadSuccess({
    numPages: loadedNumPages,
  }: {
    numPages: number;
  }): void {
    setNumPages(loadedNumPages);
  }

  const handleResetZoom = () => {
    resetZoom();
  };

  // Grab and move image
  const [isGrabbing, setIsGrabbing] = useState(false);
  const handleMouseDown = () => {
    setIsGrabbing(true);
  };
  const handleMouseUp = () => {
    setIsGrabbing(false);
  };

  const handlePdfDownload = async (_id: string) => {
    if (isRM) {
      const link = document.createElement('a');
      const blob = await fetch(pdfFile).then((response) => response.blob());
      link.href = URL.createObjectURL(blob);
      link.download = `${docName?.length ? docName : _id}.pdf`;
      document.body.appendChild(link);
      link.click();
      toast.dismiss();
      toast(<ToastDownloadContent id={_id} download={handlePdfDownload} />, {
        closeOnClick: false,
      });
      link.remove();
      return;
    }
    try {
      const blob = await getDocumentDownload(_id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data?.file.name ?? _id}.pdf`;
      document.body.appendChild(a);
      a.click();
      toast.dismiss();
      toast(<ToastDownloadContent id={_id} download={handlePdfDownload} />, {
        closeOnClick: false,
      });
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast(<ToastDownloadContent id={_id} download={handlePdfDownload} />, {
        closeOnClick: false,
      });
    }
  };

  return (
    <>
      <div
        className={`flex items-center py-2 px-6 pr-4 rounded-tl-lg rounded-tr-lg border
        border-gray-200 bg-primary-foreground border-b-none justify-between max-w-full
        overflow-x-auto ${
    isRM
      ? 'flex flex-col lg:flex-row pb-6 pt-4 lg:py-4 px-6 text-lg'
      : 'text-sm'
    }`}
      >
        <h2 className='text-gray-900  font-semibold leading-tight mr-3'>
          Original Document
        </h2>
        <div className=" flex items-center justify-start">
          <Button
            className="ml-2 bg-primary-foreground border-none hover:bg-primary-200
          hover:bg-opacity-50 min-w-5 h-6 px-0 rounded-none"
            onClick={() => { handlePdfDownload(id); }}
            data-testid="download-pdf-button"
          >
            <span className="sr-only">Download</span>
            <DownloadIcon />
          </Button>
        </div>
      </div>
      <div
        ref={containerRef}
        data-testid='transform-wrapper'
        className='relative h-[35vh] min-h-[439px] max-h-[716px] xl:h-[716px] overflow-hidden rounded-bl-lg
        rounded-br-lg border border-gray-200 py-0 shadow-sm
        '
      >
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={0.5}
          maxScale={7}
          wheel={{ wheelDisabled: true }}
          doubleClick={{ disabled: true }}
          data-testid='transform-wrapper'
        >
          {({ zoomIn, zoomOut }) => (
            <div>
              <div
                className={` ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'} bg-gray-400`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                <TransformComponent
                  wrapperStyle={{
                    overflow: 'scroll',
                    height,
                    width: '100%',
                  }}
                >
                  <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {numPages
                      && Array.from(new Array(numPages), (el, ind) => (
                        <div key={`page_container_${id + ind}`}>
                          <Page
                            key={`page_${id + ind + 1}`}
                            pageNumber={ind + 1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        </div>
                      ))}
                  </Document>
                  {data && pageDimensions ? (
                    <HighlightRegion
                      regionData={data}
                      dimensions={pageDimensions}
                    />
                  ) : null}
                </TransformComponent>
              </div>
              <div
                className="tools absolute z-10 bottom-6 left-4 w-36 h-12 px-2 py-1 bg-primary-foreground
               rounded-[32px] shadow border border-gray-200 justify-center items-center gap-1 inline-flex cursor-auto"
              >
                <button
                  onClick={() => zoomIn()}
                  className='bg-primary-foreground p-1 mr-1'
                  data-testid='zoom_in_button'
                >
                  <ZoomInIcon />
                </button>
                <button
                  onClick={() => zoomOut()}
                  className='bg-primary-foreground p-1 ml-1'
                  data-testid='zoom_out_button'
                >
                  <ZoomOutIcon />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="bg-primary-foreground p-1 ml-1"
                  data-testid="zoom_reset_button"
                >
                  <ZoomResetIcon />
                </button>
              </div>
            </div>
          )}
        </TransformWrapper>
      </div>
    </>
  );
};
export default DocumentZoomController;
