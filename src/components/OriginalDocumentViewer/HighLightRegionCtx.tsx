'use client';

import React from 'react';

type HighlightRegionContext = {
  visible: boolean;
  setVisibility: (visible: boolean) => void;
  setIndex: (index: number) => void;
  index: number;
};

export const HighlightRegionCtx = React.createContext<HighlightRegionContext>({
  visible: false,
  setVisibility: () => undefined,
  setIndex: () => undefined,
  index: 0,
});
