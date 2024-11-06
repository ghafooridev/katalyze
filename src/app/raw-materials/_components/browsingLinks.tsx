import BatchesNavIcon from '@/icons/BatchesNavIcon';
import InsightNavbarIcon from '@/icons/InsightNavIcon';
import MaterialNavbarIcon from '@/icons/MaterialNavIcon';
import TriStarIcon from '@/icons/TriStarIcon';

export const browsingLinks = [
  {
    title: 'Overview',
    label: '',
    path: '/raw-materials/overview',
    icon: <InsightNavbarIcon />,
  },
  {
    title: 'Active Materials',
    label: '',
    path: '/raw-materials/browsing-materials',
    icon: <MaterialNavbarIcon />,
  },
  {
    title: 'RM Batches',
    label: '',
    path: '/raw-materials/browsing-batches',
    icon: <BatchesNavIcon />,
  },
  {
    title: 'Analytics Insights',
    label: '',
    path: '/raw-materials/analytics-insights',
    icon: <TriStarIcon />,
  },
];
