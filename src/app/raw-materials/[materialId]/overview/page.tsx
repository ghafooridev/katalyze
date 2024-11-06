import {
  FC,
} from 'react';
import {
  Card, CardBody,
  CardHeader,
  Divider,
} from '@nextui-org/react';

import TableSkeleton from '@/components/Skeleton/TableSkeleton';
import ChartNoData from '@/icons/ChartNoData';
import { getMaterialNameById } from '@/lib/utils';
import {
  Deviations,
  MaterialDetails,
  MaterialInsight,
  MaterialMetaData,
  MaterialMetrics,
  MaterialOverviewSpecification,
  MaterialProfile, Process,
} from '@/types/RawMaterial';

import SimpleTable from '../../_components/SimpleTable';
import {
  getMaterialById,
  getMaterialDeviations, getMaterialInsightsById, getMaterialProcess, getMaterialProfileById, getMaterialSelector,
  getMaterialsMetricsById,
  getMaterialSpecifications,
} from '../../_services';
import InsightOverview from '../../analytics-insights/_components/InsightOverview';
import ProductProfile from '../_components/profile/ProductProfile';
import MaterialSpecificationColumn from '../_components/specifications/Columns';

import { DeviationChart, ProcessBatchChart } from './_components/Charts';
import { BreadCrumb, MaterialSelector } from './_components/General';
import { Metrics } from './_components/Metrics';

const MaterialSpecificOverview: FC<{ params: { materialId: string } }> = async ({
  params,
}) => {
  const getData = async () => {
    const requests: [
      Promise<MaterialMetrics[]>,
      Promise<Deviations[]>,
      Promise<Process[]>,
      Promise<MaterialProfile[]>,
      Promise<MaterialDetails> | undefined,
      Promise<MaterialOverviewSpecification> | undefined,
      Promise<MaterialInsight[]>,
      Promise<MaterialMetaData>
    ] = [
      getMaterialsMetricsById(params.materialId),
      getMaterialDeviations(params.materialId),
      getMaterialProcess(params.materialId),
      getMaterialProfileById(params.materialId),
      getMaterialById(params.materialId),
      getMaterialSpecifications(params.materialId),
      getMaterialInsightsById(params.materialId),
      getMaterialSelector(),
    ];

    const response = await Promise.allSettled(requests);

    return {
      materialMetrics: (response[0] as PromiseFulfilledResult<MaterialMetrics[]>).value,
      deviations: (response[1] as PromiseFulfilledResult<Deviations[]>).value,
      process: (response[2] as PromiseFulfilledResult<Process[]>).value,
      materialProfile: (response[3] as PromiseFulfilledResult<MaterialProfile[]>).value,
      materialDetails: (response[4] as PromiseFulfilledResult<MaterialDetails | undefined>).value,
      materialSpecification: (response[5] as PromiseFulfilledResult<MaterialOverviewSpecification | undefined>).value,
      materialInsights: (response[6] as PromiseFulfilledResult<MaterialInsight[]>).value,
      materialSelector: (response[7] as PromiseFulfilledResult<MaterialMetaData>).value,
    };
  };

  const response = await getData();

  return (
    <div className='flex flex-row h-full w-full bg-gray-200' data-testid="page">

      <MaterialSelector materialId={params.materialId} materialSelector={response.materialSelector.materials} />

      <div className='flex w-full bg-gray-200 flex-col items-stretch
      justify-start h-full  overflow-auto'>
        <BreadCrumb materialId={params.materialId} materialSelector={response.materialSelector.materials} />
        <div className='flex flex-col gap-4 p-4'>
          <Metrics materialMetrics={response.materialMetrics} />

          <div className='flex w-full justify-between gap-4 flex-col lg:flex-row lg:h-[280px]'>
            <ProcessBatchChart process={response.process} />
            <DeviationChart deviations={response.deviations} />
          </div>

          {response.materialDetails ? <ProductProfile
            materialProfile={response.materialProfile}
            materialName={getMaterialNameById(response.materialSelector.materials, params.materialId)}
            materialDetails={response.materialDetails}
          /> : <TableSkeleton numberOfColumns={4} numberOfRows={3} />}

          <div className='flex w-full justify-between gap-3 flex-col xl:flex-row items-start'>
            <div className='w-full xl:w-1/3 h-[460px]'>
              <InsightOverview
                data={response.materialInsights}
                materialSelector={response.materialSelector.materials} />
            </div>
            <Card className='w-full xl:w-2/3 h-auto xl:h-[460px] min-h-[460px]'>
              <CardBody className='p-0'>
                <CardHeader className="pl-6 pr-2 py-6">
                  <p className="font-semibold text-lg text-gray-900">

                    {getMaterialNameById(response.materialSelector.materials, params.materialId)} Specification
                  </p>
                </CardHeader>
                <Divider />
                {response.materialSpecification?.specs
                  ? <SimpleTable
                    title=''
                    isClient
                    data={response.materialSpecification.specs} columns={MaterialSpecificationColumn}
                  /> : <div className='flex flex-col items-center justify-center w-full m-auto'>
                    <ChartNoData />
                    <p className='text-md text-semibold font-medium text-gray-400'>No data available</p>
                  </div>}
              </CardBody>
            </Card>
          </div >
        </div >
      </div>

    </div >
  );
};

export default MaterialSpecificOverview;
