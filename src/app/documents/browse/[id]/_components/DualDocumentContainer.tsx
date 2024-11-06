'use client';

import React, { FC, useMemo, useState } from 'react';

import DocumentZoomController from '@/components/OriginalDocumentViewer/DocumentZoomController';
import { HighlightRegionCtx } from '@/components/OriginalDocumentViewer/HighLightRegionCtx';
import { DigitalData } from '@/types/DigitalData.schema';
import { Digitalization } from '@/types/Digitalization.schema';

import { ExtractedDataForm } from './ExtractedDataForm';

type DualDocumentContainerProps = {
  jsonData: Digitalization['json'];
  data: Digitalization;
  currentId: string;
  flattenJson: DigitalData[];
};

export const DualDocumentContainer: FC<DualDocumentContainerProps> = ({
  jsonData,
  data,
  flattenJson,
  currentId,
}) => {
  const [heighLightIndex, setHeighLightIndex] = useState<number>(0);
  const [visibility, setVisibility] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      visible: visibility,
      setVisibility,
      index: heighLightIndex,
      setIndex: (i: number) => {
        setHeighLightIndex(i);
      },
    }),
    [visibility, heighLightIndex],
  );

  return (
    <div className='flex flex-col gap-0 xl:flex-row px-6'>
      <HighlightRegionCtx.Provider value={value}>
        <div className='flex-1 max-w-full xl:max-w-[50%] xl:pr-2 min-w-[400px]'>
          <ExtractedDataForm
            jsonData={jsonData}
            currentId={currentId}
            flattenJson={flattenJson}
            originalCreatedAt={data.createdAt}
          />
        </div>
        <div className='flex-1 max-w-full pt-5 xl:pt-0 xl:max-w-[50%] xl:pl-2 min-w-[400px]'>
          <DocumentZoomController data={data} id={currentId} pdfFile={data.file.url} />
        </div>
      </HighlightRegionCtx.Provider>
    </div>
  );
};
