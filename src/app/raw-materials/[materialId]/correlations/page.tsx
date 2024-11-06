'use client';

import {
  FC, useEffect, useState,
} from 'react';
import { useRouter } from 'next/navigation';

import {
  getMaterialCorrelation,
  getMaterialSelector,
  getProcessDropDowns,
} from '@/app/raw-materials/_services';
import HeatMapChart from '@/components/Chart/HeatMapChart';
import ChartCard from '@/components/ChartCard';
import DateRangePicker from '@/components/DateRangePicker';
import Loading from '@/components/Loading';
import { getMaterialNameById } from '@/lib/utils';
import { MaterialMetaData, MaterialProcessMetaData } from '@/types/RawMaterial';

import BreadcrumbByMaterialId from '../_components/common/BreadcrumbByMaterialId';
import NoChartData from '../_components/NoChartData';
import ProcessSelector, { ProcessType } from '../_components/processSelector';
import { materialLinksFactory } from '../materialLinksFactory';
import { MaterialNavSelector } from '../MaterialNavSelector';

import { transformResponse } from './utils';

const Correlation: FC<{ params: { materialId: string } }> = ({
  params,
}) => {
  const router = useRouter();
  const [selectedProcess, setSelectedProcess] = useState<ProcessType>(
    { process: { process: '', product: '', site: '' }, processStep: '' },
  );
  const [selectedMaterial, setSelectedMaterial] = useState(params.materialId);
  const [selectedDate, setSelectedDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [heatMapData, setHeatMapData] = useState([]);
  const [materialSelector, setMaterialSelector] = useState<{ id: string; name: string }[]>();
  const [dateRange, setDateRange] = useState<string[]>();

  const isProcessSelected = selectedProcess.process.process.length && selectedProcess.processStep.length;

  const getMaterialOptions = async () => {
    const response: MaterialMetaData = await getMaterialSelector();
    setMaterialSelector(response.materials);
  };

  const getProcessesDropDowns = async () => {
    const response: MaterialProcessMetaData[] = await getProcessDropDowns(params.materialId);
    setDateRange(response[0]?.dateRange);
  };

  const getCorrelationChartData = async () => {
    if (isProcessSelected) {
      const { process: { process, site, product }, processStep } = selectedProcess;
      const step = selectedProcess.process.steps?.find((item) => item.uiName === processStep);
      setLoading(true);
      const response: MaterialProcessMetaData[] = await getMaterialCorrelation(
        params.materialId,
        {
          process, site, product, step: step?.name, dateRange: selectedDate,
        },
      );
      setLoading(false);

      setHeatMapData(transformResponse(response));
    }
  };

  const onSelectProcess = (_selectedProcess: ProcessType) => {
    setSelectedProcess(_selectedProcess);
  };

  const onChangeSelector = (key: React.Key | null) => {
    const value = key as string;
    if (key === null) {
      return;
    }
    setSelectedMaterial(value);
    router.push(`/raw-materials/${value}/correlations`);
  };

  const onChangeCalendarRange = (value) => {
    setSelectedDate(value);
  };

  const isProcessAvailable = !!dateRange;

  useEffect(() => {
    getMaterialOptions();
    getProcessesDropDowns();
  }, []);

  useEffect(() => {
    if (isProcessSelected) {
      getCorrelationChartData();
    }
  }, [selectedProcess, selectedDate]);

  return (
    <div className='flex flex-row h-full w-full bg-gray-200'>
      <div className='min-w-[264px] bg-white border-r border-gray-200
      flex flex-col items-stretch justify-start min-h-[calc(100vh-60px)]'>
        <MaterialNavSelector links={materialLinksFactory(params.materialId)}
          placeholder={getMaterialNameById(materialSelector, selectedMaterial)}
          materialSelector={materialSelector}
          selectedMaterial={selectedMaterial}
          onChangeSelector={onChangeSelector} />
      </div>

      <div className='flex w-full bg-gray-200 flex-col items-stretch
      justify-start h-full relative'>
        <div className="flex items-center justify-between pr-6">
          <BreadcrumbByMaterialId selectedMaterial={selectedMaterial} materialSelector={materialSelector} />
          {isProcessAvailable && <div className='flex items-center gap-4 relative top-3'>
            <DateRangePicker onChangeCalendarRange={onChangeCalendarRange} defaultRange={dateRange} />
          </div>}
        </div>

        {isProcessAvailable ? <div className="flex flex-col gap-4 p-6">
          <div className='flex w-full justify-between gap-3 flex-col lg:flex-row h-[800px]'
            style={heatMapData.length ? { height: `${(heatMapData.length * 44) + 150}px` } : { height: '800px' }}>
            <ChartCard title='Attributes Correlation Heat map'
              className='w-full overflow-visible'
              bodyClassName='px-0'>
              <div className='flex flex-col w-full'>
                <div className='flex gap-2 bg-gray-50 p-4' data-testid="processSelector">
                  <ProcessSelector onSelectProcess={onSelectProcess} materialId={params.materialId}
                  />
                </div>
                <div className='w-full px-4'
                  style={heatMapData.length ? { height: `${heatMapData.length * 44}px` } : { height: '650px' }}>
                  {isProcessSelected && heatMapData.length
                    ? <div className='w-full h-full'>
                      {loading ? <Loading />
                        : <HeatMapChart
                          chartData={heatMapData}
                          axisLeftLabel={`Process Attributes - 
                            ${getMaterialNameById(materialSelector, selectedMaterial)}`}
                          axisBottomLabel={`${getMaterialNameById(materialSelector, selectedMaterial)} Attributes`}
                          colors={['#7839EE', '#F5F3FF', '#7839EE']}
                        />}
                    </div>

                    : <NoChartData text="Please select a process step to proceed" />
                  }
                </div>
              </div>
            </ChartCard>
          </div>
        </div> : <NoChartData text="There is not enough data available to activate this feature" />}
      </div>
    </div >
  );
};

export default Correlation;
