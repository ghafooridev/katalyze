import AnalyticsNavbarIcon from '@/icons/AnalyticsNavbarIcon';
import BatchesNavIcon from '@/icons/BatchesNavIcon';
import InsightNavbarIcon from '@/icons/InsightNavIcon';

export const materialLinksFactory = (materialId: string) => [
  {
    title: 'Overview',
    label: '',
    path: `/raw-materials/${materialId}/overview`,
    icon: <InsightNavbarIcon />,
  },
  {
    title: 'Batches',
    label: '',
    path: `/raw-materials/${materialId}/specific-batches`,
    icon: <BatchesNavIcon />,
  },
  {
    title: 'Analytics',
    label: '',
    path: '',
    icon: <AnalyticsNavbarIcon />,
    children: [
      {
        title: 'Correlations',
        label: '',
        path: `/raw-materials/${materialId}/correlations`,
      },
      {
        title: 'Trends',
        label: '',
        path: `/raw-materials/${materialId}/trends`,
      },
    ],
  },
];
