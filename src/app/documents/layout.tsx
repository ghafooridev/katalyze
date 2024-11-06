import { PropsWithChildren } from 'react';

import { getMetrics } from '@/app/documents/_services/index';
import { NavSideBar } from '@/components/Nav/NavSideBar';
import DocBrowseNavIcon from '@/icons/DocBrowseNavIcon';
import DocTasksNavIcon from '@/icons/DocTasksNavIcon';

export default async function RawMaterialLayout({
  children,
}: PropsWithChildren) {
  const { pending } = await getMetrics();
  return (
    <div className="flex w-full bg-gray-200">
      <div className="min-w-[264px] bg-white border-r border-gray-200
      flex flex-col items-stretch justify-start min-h-[calc(100vh-60px)] relative">
        <div className="fixed">
          <NavSideBar
            links={[
              {
                title: 'Browse',
                label: '',
                path: '/documents/browse',
                icon: <DocBrowseNavIcon />,
              },
              {
                title: 'Tasks',
                label: `${pending}`,
                path: '/documents/tasks',
                icon: <DocTasksNavIcon />,
              },
            ]}
          />
        </div>
      </div>
      <div className="overflow-auto p-0 pb-6 w-[1488px] mx-auto">{children}</div>
    </div>
  );
}
