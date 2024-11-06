import { FC, ReactNode } from 'react';

const RawMaterialLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className='content'>
    <div className='w-full min-h-[calc(100vh-60px)] bg-gray-200'>{children}</div>
  </div>
);

export default RawMaterialLayout;
