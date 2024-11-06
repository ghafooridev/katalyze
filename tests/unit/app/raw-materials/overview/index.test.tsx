// import React from 'react';
// import { render, } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import MaterialOverview from '@/app/raw-materials/overview/page';
// import * as service from '@/app/raw-materials/_services';
// import { describe } from '@jest/globals';

// const mockMaterialMetrics = [
//   { type: 'last_month_avg_rating', value: 4.5, rate: 0.2 },
//   { type: 'active_materials', value: 10, rate: 0.1 },
//   { type: 'last_month_processed_batches', value: 20, rate: 0.15 },
//   { type: 'vendors_num', value: 5, rate: 0.05 },
//   { type: 'coa_coverage', value: 3, rate: 0.03 },
// ];

// const mockMaterialMetrics2 = [
//   { type: 'last_month_avg_rating', value: 4.5, rate: 0.2 },
//   { type: 'active_materials', value: 10, rate: 0.1 },
//   { type: 'vendors_num', value: 5, rate: 0.05 },
//   { type: 'coa_coverage', value: 3, rate: 0.03 },
// ];

// const mockMaterials = {
//   data: [
//     {
//       id: '1',
//       gmid: '2',
//       lmid: '3',
//       name: 'NZ Amin A',
//       category: 'string',
//       vendors: [{
//         id: '1',
//         name: 'vendor',
//         country: 'USA'
//       }],
//       products: [{
//         id: '1',
//         name: 'material',
//       }],
//       rating: {
//         value: 1,
//         trend: 1,
//       },
//       batchIds: ['1'],
//       vendorBatchIds: ['1'],
//       plantIds: ['1']
//     },
//   ],
//   pagination: { total: 1, page: 1, size: 10 },
// };

// const mockBatches = {
//   data: [
//     {
//       batchId: 1, vendorBatchId: 'VB1', material: {
//         id: '1',
//         gmid: '2',
//         lmid: '3',
//         name: 'NZ Amin A'
//       }, rating: 4.5, vendor: 'Vendor 1', availability: true
//     },
//   ],
//   pagination: { total: 1, page: 1, size: 10 },
// };

// const mockSpecifications = {
//   id: '1',
//   specs: [{
//     name: 'spec1',
//     uom: 'kg',
//     range: '1-2',
//     testMethod: 'method',
//   }, {
//     name: 'spec2',
//     uom: 'kg',
//     range: '1-3',
//     testMethod: 'method',
//   },]
// }
// const mockProductProfile = [
//   { id: '1', description: 'description', cas: 'test', form_type: 'test', formula: 'mx', source: [{ name: 'test' }], img: 'tests' },]

// const mockDeviations = [
//   {
//     month: 'January',
//     deviation: {
//       minor: 2,
//       major: 1,
//       critical: 0,
//       total: 3,
//     },
//   },
//   {
//     month: 'February',
//     deviation: {
//       minor: 1,
//       major: 2,
//       critical: 1,
//       total: 4,
//     },
//   },
//   {
//     month: 'March',
//     deviation: {
//       minor: 3,
//       major: 0,
//       critical: 0,
//       total: 3,
//     },
//   },
// ]



// const mockProcess = [
//   { month: 'January', value: 1 },
// ];

// describe('Material Overview Page', () => {
//   beforeEach(() => {

//     jest.spyOn(service, 'getMaterialBatches').mockResolvedValue(mockBatches as any);
//     jest.spyOn(service, 'getMaterials').mockResolvedValue(mockMaterials as any);
//     jest.spyOn(service, 'getMaterialsMetrics').mockResolvedValue(mockMaterialMetrics2 as any);
//     jest.spyOn(service, 'getOverViewDeviations').mockResolvedValue(mockDeviations as any);
//     jest.spyOn(service, 'getOverviewProcess').mockResolvedValue(mockProcess as any)
//     jest.spyOn(service, 'getMaterialSelector').mockResolvedValue({ data: [] } as any);
//     jest.spyOn(service, 'getMaterialsMetricsById').mockResolvedValue(mockMaterialMetrics as any);
//     jest.spyOn(service, 'getMaterialDeviations').mockResolvedValue({ mockDeviations } as any);
//     jest.spyOn(service, 'getMaterialProcess').mockResolvedValue({ mockProcess } as any);
//     jest.spyOn(service, 'getMaterialProfileById').mockResolvedValue(mockProductProfile as any);
//     jest.spyOn(service, 'getMaterialById').mockResolvedValue({ mockMaterials } as any);
//     jest.spyOn(service, 'getMaterialById').mockResolvedValue({ data: [] } as any);
//     jest.spyOn(service, 'getMaterialInsightsById').mockResolvedValue({ data: [] } as any);
//     jest.spyOn(service, 'getMaterialSpecifications').mockResolvedValue(mockSpecifications as any);
//   });
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   const renderComponent = (props = {}) => {
//     const defaultProps = {
//       ...props,
//     };
//     return render(<MaterialOverview {...defaultProps} />) ;
//   };

//   test('renders correctly', async () => {
//     // renderComponent()
//     try{renderComponent()} catch (error) {}
//   });
// });

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import MaterialOverview from '@/app/raw-materials/overview/page';
import { describe, expect } from '@jest/globals';
import * as Charts from "@/app/raw-materials/overview/_components/Charts"

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));
jest.mock('@/components/BreadCrumb', () => jest.fn(() => <div>Breadcrumb</div>));
jest.mock('@/app/raw-materials/_components/MaterialNavbar', () => jest.fn(() => <div>MaterialNavbar</div>));
jest.mock('@/app/raw-materials/overview/_components/Metrics', () => jest.fn(() => <div>MetricsMaterial</div>));
// jest.mock('@/app/raw-materials/overview/_components/Charts/ProcessBatchChart', () => jest.fn(() => <div>ProcessBatchChart</div>));
// jest.mock('@/app/raw-materials/overview/_components/Charts/BatchDeviationChart', () => jest.fn(() => <div>BatchDeviationChart</div>));
jest.mock('@/app/raw-materials/analytics-insights/_components/InsightOverview', () => jest.fn(() => <div>InsightOverview</div>));
jest.mock('@/app/raw-materials/overview/_components/Tables', () => ({
  MaterialBatchesTable: jest.fn(() => <div>MaterialBatchesTable</div>),
  OnBoardedMaterialTable: jest.fn(() => <div>OnBoardedMaterialTable</div>),
}));

describe('MaterialOverview Component', () => {
  let processBatchChartSpy;
  let batchDeviationChartSpy;
  beforeEach(() => {

    processBatchChartSpy = jest.spyOn(Charts, 'ProcessBatchChart');
    batchDeviationChartSpy = jest.spyOn(Charts, 'BatchDeviationChart');

    (useQuery as any).mockImplementation(({ queryKey }) => {
      const data = {
        getMaterialsMetrics: { metric: 'sample metric data' },
        getMaterials: { material: 'sample material data' },
        getMaterialBatches: { batch: 'sample batch data' },
        getOverViewDeviations: [{ month: 'January', deviation: { total: 5 } }],  // Sample deviation data
        getOverviewProcess: [{ month: 'January', value: 3 }],  // Sample process data
        getMaterialInsights: { insight: 'sample insight data' },
        getMaterialSelector: { selector: 'sample selector data' },
      };
      return {
        data: data[queryKey[0]],
        isLoading: false,
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the MaterialOverview component with all subcomponents', async () => {
    render(<MaterialOverview />);

    expect(screen.getByText('MaterialNavbar')).toBeInTheDocument();
    expect(screen.getByText('Breadcrumb')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('MetricsMaterial')).toBeInTheDocument();
      // expect(screen.getByText('ProcessBatchChart')).toBeInTheDocument();
      // expect(screen.getByText('BatchDeviationChart')).toBeInTheDocument();
      expect(screen.getByText('InsightOverview')).toBeInTheDocument();
      expect(screen.getByText('MaterialBatchesTable')).toBeInTheDocument();
      expect(screen.getByText('OnBoardedMaterialTable')).toBeInTheDocument();

      expect(processBatchChartSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          process: [{ month: 'January', value: 3 }],
        }),
        expect.any(Object)
      );

      expect(batchDeviationChartSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          deviations: [{ month: 'January', deviation: { total: 5 } }],
        }),
        expect.any(Object)
      );
    });
  });

  test('renders loading state if queries are still loading', () => {
    (useQuery as any).mockImplementation(() => ({
      data: null,
      isLoading: true,
    }));

    render(<MaterialOverview />);
    // Check for loading indicators here if they are implemented, e.g., a spinner or loading text
  });
});
