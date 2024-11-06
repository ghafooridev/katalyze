'use client';

import React from 'react';

import { Digitalization } from '@/types/Digitalization.schema';

import { PageDimensions } from './DocumentZoomController';
import { HighlightRegionCtx } from './HighLightRegionCtx';

interface HighlightRegionProps {
  regionData: Digitalization;
  dimensions: PageDimensions;
}

export const HighlightRegion = (rowData: HighlightRegionProps) => {
  interface InputObject {
    height: number;
    width: number;
    x: number;
    y: number;
  }
  function transformObject(inputObj: InputObject) {
    return {
      top: inputObj.y * rowData.dimensions.height,
      left: inputObj.x * rowData.dimensions.width,
      width: inputObj.width * rowData.dimensions.width,
      height: inputObj.height * rowData.dimensions.height,
    };
  }

  const { index, visible } = React.useContext(HighlightRegionCtx);
  const { region } = (rowData.regionData.flattenJson ?? [])[index];
  const coordinates = transformObject(region);
  return (
    visible && (
      <div
        data-testid="highlight-region"
        style={{
          position: 'absolute',
          mixBlendMode: 'hard-light',
          backgroundColor: '#AF6DFC',
          opacity: 0.5,
          border: '1px solid #000000',
          ...coordinates,
        }}
      />
    )
  );
};
