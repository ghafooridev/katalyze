'use client';

import Breadcrumb from '@/components/BreadCrumb';

import { browsingLinks } from '../_components/browsingLinks';
import MaterialNavbar from '../_components/MaterialNavbar';
import {
  getMaterialBatches, getMaterialInsights,
  getMaterials, getMaterialSelector,
  getMaterialsMetrics, getOverViewDeviations,
  getOverviewProcess,
} from '../_services';
import InsightOverview from '../analytics-insights/_components/InsightOverview';

import { BatchDeviationChart, ProcessBatchChart } from './_components/Charts';
import MetricsMaterial from './_components/Metrics';
import { MaterialBatchesTable, OnBoardedMaterialTable } from './_components/Tables';
import { useQuery } from '@tanstack/react-query';

const MaterialOverview = () => {

  const {
    data: materialMetricsData,
  } = useQuery({
    queryKey: ['getMaterialsMetrics'],
    queryFn: getMaterialsMetrics,
  });

  const {
    data: materialData,
  } = useQuery({
    queryKey: ['getMaterials'],
    queryFn: () => getMaterials(),
  });

  const {
    data: materialBatchesData,
  } = useQuery({
    queryKey: ['getMaterialBatches'],
    queryFn: getMaterialBatches,
  });

  const {
    data: overViewDeviationsData,
  } = useQuery({
    queryKey: ['getOverViewDeviations'],
    queryFn: getOverViewDeviations,
  });

  const {
    data: overviewProcessData,
  } = useQuery({
    queryKey: ['getOverviewProcess'],
    queryFn: getOverviewProcess,
  });

  const {
    data: materialInsightsData,
  } = useQuery({
    queryKey: ['getMaterialInsights'],
    queryFn: getMaterialInsights,
  });

  const {
    data: materialSelectorData,
  } = useQuery({
    queryKey: ['getMaterialSelector'],
    queryFn: getMaterialSelector,
  });

  return (
    <div className='relative flex w-full flex-row'>
      <div className='min-w-[264px] bg-white border-r border-gray-200
      flex flex-col items-stretch justify-start min-h-[calc(100vh-60px)] relative'>
        <MaterialNavbar links={browsingLinks} />
      </div>
      <div className='flex w-full bg-gray-200 flex-col items-stretch
      justify-center h-full pb-2 overflow-auto'>
        <Breadcrumb
          path={['Raw Materials']}
          urlPath={['raw materials']}
        />
        <div className='flex flex-col gap-4 pt-4 px-4 '>
          <div className='flex w-full gap-4 justify-between flex-col 2xl:flex-row'>
            {materialMetricsData && <MetricsMaterial materialMetrics={materialMetricsData} />}
          </div>

          <div className='flex w-full justify-between gap-3 flex-col
            lg:flex-row min-h-[280px] '>
            <ProcessBatchChart process={overviewProcessData} />
            <BatchDeviationChart deviations={overViewDeviationsData} />
          </div>
          <div className='flex w-full justify-between gap-3 flex-col 2xl:flex-row items-start'>
            <div className='w-full h-[480px]'>
              <InsightOverview data={materialInsightsData as any} materialSelector={materialSelectorData as any} />
            </div>
            <MaterialBatchesTable data={materialBatchesData} />
            <OnBoardedMaterialTable data={materialData} />
          </div>
        </div>
      </div>

    </div >
  );
};

export default MaterialOverview;
