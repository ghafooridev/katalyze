export type ChartDataType = {
  id: 'material' | 'process';
  data: { x: string; y: string };
};

export type TableDataType = {
  batchId: string;
  material: string;
  process: string;
};

export const transformChartData = (response): ChartDataType[] => {
  const processData = response.map((item) => ({
    x: item.date,
    y: item.processData[0].value,
  }));

  const materialData = response.map((item) => ({
    x: item.date,
    y: item.processData[0].materialAttributeAvg,
  }));

  return [
    {
      id: 'material',
      data: materialData,
    },
    {
      id: 'process',
      data: processData,
    },
  ];
};

export const transformTableData = (response): TableDataType[] => {
  const data = response.map((item) => ({
    batchId: item.processData[0].batchId,
    material: item.processData[0].materialAttributeAvg,
    process: item.processData[0].value,
  }));

  return data;
};
