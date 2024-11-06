import Breadcrumb from '@/components/BreadCrumb';

import { browsingLinks } from '../_components/browsingLinks';
import MaterialNavbar from '../_components/MaterialNavbar';

import InsightPage from './_components/InsightPage/InsightPage';

const AnalyticsInsights = () => (
  <div className="flex flex-row w-full">
    <div className="min-w-[264px] bg-white border-r border-gray-200
      flex flex-col items-stretch justify-start min-h-[calc(100vh-60px)]">
      <MaterialNavbar links={browsingLinks} />
    </div>
    <div className='flex w-full bg-gray-200 flex-col items-stretch
      justify-start h-full overflow-auto'>
      <Breadcrumb
        path={['Raw Materials']}
        urlPath={['raw materials']}
      />
      <div className='p-4'>
        <InsightPage />
      </div>
    </div>

  </div>
);

export default AnalyticsInsights;
