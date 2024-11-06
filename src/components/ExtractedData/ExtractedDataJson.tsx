import { FC } from 'react';

import { Digitalization } from '@/types/Digitalization.schema';

type ExtractedDataJsonProps = Readonly<{
  data: Digitalization;
}>;

export const ExtractedDataJson: FC<ExtractedDataJsonProps> = (data) => (
  <div
    className="h-[35vh] min-h-[439px] xl:h-[718px]  rounded-bl-lg rounded-br-lg border
   bg-gray-900 py-4 px-4 dark:bg-gray-900 text-primary-foreground shadow-sm
   relative overflow-auto w-full whitespace-nowrap border-gray-200"
  >
    <code className="overflow-hidden  w-max text-xs leading-5">
      <pre className="overflow-hidden  w-max">
        {JSON.stringify(data, null, 2)}
      </pre>
    </code>
  </div>
);
