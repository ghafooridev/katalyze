import React, { FC, ReactNode } from 'react';

import { NextUIProvider } from '@nextui-org/react';

export interface UIProviderProps {
  children: ReactNode;
}

const UIProvider: FC<UIProviderProps> = (props) => (
  <NextUIProvider>{props.children}</NextUIProvider>
);

export default UIProvider;
