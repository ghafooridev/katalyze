'use client';

import {
  FC, ReactNode, useEffect, useState,
} from 'react';
import {
  Button,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { LineChart } from '@/components/Chart/LineChart';
import ChartCard from '@/components/ChartCard';
import DateRangePicker from '@/components/DateRangePicker';
import DownloadIcon from '@/icons/DownloadIcon';
import { getMaterialNameById } from '@/lib/utils';
import {
  MaterialMetaData, MaterialProcessMetaData, MaterialTrends, MaterialTrendsProcess,
} from '@/types/RawMaterial';

import SimpleTable from '../../_components/SimpleTable';
import {
  getMaterialSelector, getMaterialTrends, getMaterialTrendsRadioData,
  getProcessDropDowns,
} from '../../_services';
import BreadcrumbByMaterialId from '../_components/common/BreadcrumbByMaterialId';
import NoChartData from '../_components/NoChartData';
import ProcessSelector, { ProcessType } from '../_components/processSelector';
import { materialLinksFactory } from '../materialLinksFactory';
import { MaterialNavSelector } from '../MaterialNavSelector';

import columns from './_components/Columns';
import TrendsRadioGroup from './_components/RadioGroup';
import {
  ChartDataType, TableDataType, transformChartData, transformTableData,
} from './utils';

const Trends: FC<{ params: { materialId: string } }> = ({
  params,
}) => {
  const router = useRouter();
  const [selectedProcess, setSelectedProcess] = useState<ProcessType>(
    { process: { process: '', product: '', site: '' }, processStep: '' },
  );
  const [selectedMaterial, setSelectedMaterial] = useState(params.materialId);
  const [selectedDate, setSelectedDate] = useState([]);
  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [materialSelector, setMaterialSelector] = useState<{ id: string; name: string }[]>();
  const [radioItems, setRadioItems] = useState<MaterialTrendsProcess>();
  const [selectedMaterialAttribute, setSelectedMaterialAttribute] = useState('');
  const [selectedStepAttribute, setSelectedStepAttribute] = useState('');
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<string[]>();
  const isProcessSelected = selectedProcess.process.process.length && selectedProcess.processStep.length;
  const showChart = isProcessSelected
    && selectedMaterialAttribute.length
    && selectedStepAttribute.length
    && chartData.length;

  const axisBottom = {
    format: (value) => {
      const date = new Date(value);
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    },
    legend: 'Batch run date',
    legendPosition: 'middle',
    tickValues: 'every 3 month', // Show a tick for each month
    tickPadding: 5,
    tickRotation: -90,
    legendOffset: 70,
  };
  const axisLeft = {
    legend: '',
    legendPosition: 'middle',
    legendOffset: -40,
    tickSize: 0,
    tickValues: 6,
  };

  const getMaterialOptions = async () => {
    const response: MaterialMetaData = await getMaterialSelector();
    setMaterialSelector(response.materials);
  };

  const getProcessesDropDowns = async () => {
    const response: MaterialProcessMetaData[] = await getProcessDropDowns(params.materialId);
    setDateRange(response[0]?.dateRange);
  };

  const getMaterialAttributeOptions = (data) => {
    const options: { label: string, value: string, }[] = [];

    data?.map((item) => options.push({ value: item, label: item }));

    return options;
  };

  const getStepAttributeOptions = (data) => {
    const options: { label: string, value: string, }[] = [];
    const selectedStep = data?.steps.filter((item) => item.uiName === selectedProcess.processStep);

    if (selectedStep) {
      selectedStep[0].attributes?.map((item) => options.push({ value: item, label: item }));
    }

    return options;
  };

  const getTrendsRadioGroupData = async () => {
    if (isProcessSelected) {
      const { process: { process, site, product }, processStep } = selectedProcess;

      const response: MaterialTrendsProcess = await getMaterialTrendsRadioData(
        params.materialId,
        {
          process,
          site,
          product,
          step: processStep,
          dateRange: selectedDate,
        },
      );
      setRadioItems(response);
    }
  };

  const getTrendsChartData = async () => {
    if (isProcessSelected) {
      setLoading(true);
      const { process: { process, site, product }, processStep } = selectedProcess;
      const step = selectedProcess.process.steps?.find((item) => item.uiName === processStep);
      const response: MaterialTrends[] = await getMaterialTrends(
        params.materialId,
        {
          process,
          site,
          product,
          step: step?.name,
          dateRange: selectedDate,
          materialAttribute: selectedMaterialAttribute,
          stepAttribute: selectedStepAttribute,
        },
      );

      setChartData(transformChartData(response));
      setTableData(transformTableData(response));
      setLoading(false);
    }
  };

  const onChangeSelector = (key: React.Key | null) => {
    const value = key as string;
    if (key === null) {
      return;
    }
    setSelectedMaterial(value);
    router.push(`/raw-materials/${value}/trends`);
  };

  const onChangeCalendarRange = (value) => {
    setSelectedDate(value);
  };

  const onChangeStepAttribute = (value) => setSelectedStepAttribute(value);

  const onChangeMaterialAttribute = (value) => setSelectedMaterialAttribute(value);

  const onSelectProcess = (_selectedProcess: ProcessType) => {
    setSelectedProcess(_selectedProcess);
  };

  const isProcessAvailable = !!dateRange;

  const NoChartDataComponent = () => (
    <NoChartData
      style={{ width: 'calc(100% - 250px)' }}
      className="right-[250px] xl:right-1/2"
      text={selectedProcess.process.process
        ? 'please select an attribute to proceed'
        : 'Please select a process step to proceed'
      }
    />
  );

  const attributeTooltip = (data: any) => <div>
    <div className='speech-bubble flex items-center gap-2 relative z-50'
    >
      <div className='rounded-full w-3 h-3' style={{ backgroundColor: data.point.color }} />

      <div className='flex flex-col'>
        <span>
          {data.point.data.y as ReactNode}
        </span>
        <span>
          {new Date(data.point.data.xFormatted)
            .toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
            .replace(' ', '') as ReactNode}
        </span>
      </div>
    </div>
  </div>;

  const selectedProcessData = radioItems?.processes.filter(
    (process) => process.product === selectedProcess.process.product,
  ) || [];

  useEffect(() => {
    getMaterialOptions();
    getProcessesDropDowns();
  }, []);

  useEffect(() => {
    if (isProcessSelected) {
      getTrendsRadioGroupData();
    }
  }, [selectedProcess]);

  useEffect(() => {
    if (selectedMaterialAttribute && selectedStepAttribute) {
      getTrendsChartData();
    }
  }, [selectedMaterialAttribute, selectedStepAttribute, selectedDate]);

  return (
    <div className='flex flex-row h-full w-full' data-testid="trends">
      <div className='min-w-[264px] bg-white border-r border-gray-200
      flex flex-col items-stretch justify-start min-h-[calc(100vh-60px)]'>
        <MaterialNavSelector links={materialLinksFactory(params.materialId)}
          placeholder={getMaterialNameById(materialSelector, selectedMaterial)}
          materialSelector={materialSelector}
          selectedMaterial={selectedMaterial}
          onChangeSelector={onChangeSelector} />
      </div>

      <div className='flex w-full bg-gray-200 flex-col items-stretch
      justify-start h-full overflow-auto relative'>
        <div className="flex items-center justify-between pr-6">
          <BreadcrumbByMaterialId selectedMaterial={selectedMaterial} materialSelector={materialSelector} />
          {isProcessAvailable && <div className='flex items-center gap-1 relative top-3'>
            <DateRangePicker onChangeCalendarRange={onChangeCalendarRange} defaultRange={dateRange} />
            <Button isIconOnly variant='bordered' color='default' className='bg-white' data-testid="download">
              <DownloadIcon />
            </Button>
          </div>}
        </div>

        {isProcessAvailable ? <div className="flex flex-col xl:flex-row gap-4 p-6">
          <div className='flex w-full justify-start gap-3 flex-col'>

            <ChartCard title='Process Step Attributes'
              className='w-full overflow-visible'
              style={{ width: 'calc(100% - 10px)' }}
              bodyClassName='!p-0'>
              <div className='flex flex-col w-full'>
                <div className='flex gap-2 bg-gray-50 p-4'>
                  <ProcessSelector onSelectProcess={onSelectProcess} materialId={params.materialId}
                    data-testid="process_selector" />
                </div>

                <div className='flex justify-between w-full pl-6 pt-6 pr-6'>
                  <div className='w-[250px] h-[300px] overflow-x-hidden overflow-y-auto'>
                    <TrendsRadioGroup
                      loading={loading}
                      color="success"
                      label={'Step Attributes'}
                      options={getStepAttributeOptions(selectedProcessData[0])}
                      onChange={onChangeStepAttribute}
                    />
                  </div>

                  <div className='flex flex-col' style={{ width: 'calc(100% - 250px)' }}>
                    <div className='w-full  h-[300px] pb-4'
                      data-testId="responsiveLine">
                      {showChart ? <LineChart
                        xScale={{ type: 'time', format: '%Y-%m-%d' }}
                        axisBottom={axisBottom}
                        axisLeft={axisLeft}
                        enableArea={false}
                        chartData={chartData.filter((item) => item.id === 'process')}
                        color={'#0E9384'}
                        chartTooltip={attributeTooltip}
                      /> : <NoChartDataComponent />}
                    </div>
                  </div>
                </div>
              </div>
            </ChartCard>

            <ChartCard title='Raw Material Attributes'
              style={{ width: 'calc(100% - 10px)' }}
              className='w-full overflow-visible'>
              <div className='flex justify-between w-full'>
                <div className='w-[250px] pl-4'>
                  <TrendsRadioGroup
                    loading={loading}
                    color='primary'
                    label={'Material Attribute'}
                    options={getMaterialAttributeOptions(radioItems?.attributes)}
                    onChange={onChangeMaterialAttribute}
                  />

                </div>

                <div className='flex flex-col' style={{ width: 'calc(100% - 250px)' }}>
                  <div className='w-full h-[300px]'>
                    {showChart ? <LineChart
                      xScale={{ type: 'time', format: '%Y-%m-%d' }}
                      axisBottom={axisBottom}
                      axisLeft={axisLeft}
                      chartData={chartData.filter((item) => item.id === 'material')}
                      color={'#7F56D9'}
                      enableArea={false}
                      chartTooltip={attributeTooltip}
                    /> : <NoChartDataComponent />}
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>

          <div className="w-full xl:w-[360px] ">
            <ChartCard title='Values' className='w-full overflow-visible h-full' bodyClassName='!items-start p-0'>
              <div className='flex flex-col w-full h-[460px] xl:h-[795px]' data-testid="trendsValuesTable">
                {tableData.length > 0 && <SimpleTable
                  title={''}
                  isClient
                  data={tableData as any} columns={columns}
                />}
              </div>
            </ChartCard>
          </div>
        </div>
          : <NoChartData text="There is not enough data available to activate this feature" />
        }
      </div>
    </div >
  );
};

export default Trends;
