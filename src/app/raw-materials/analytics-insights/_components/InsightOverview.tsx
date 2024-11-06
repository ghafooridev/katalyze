'use client';

import {
  Button,
  Card, CardBody, CardHeader, Divider,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import InsightDocsIcon from '@/icons/InsightsDocsIcon';
import { InsightOverviewProps } from '@/types/RawMaterial';

import InsightCard from './InsightPage/InsightCard';

const InsightOverview = ({ data = [], materialSelector }: InsightOverviewProps) => {
  const router = useRouter();

  return (
    <Card className="border border-gray-200 w-full h-full">
      <CardHeader className="pl-6 pr-2 py-4">
        <div className="flex flex-row w-full justify-between items-center">
          <p className="font-semibold text-lg text-gray-900">
            Latest Analytics Insights
          </p>
          <Button color='primary' variant='light'
            className='text-sm font-semibold'
            onClick={() => router.push('/raw-materials/analytics-insights')}
          >
            See More
          </Button>
        </div>
      </CardHeader>
      <Divider />
      {data?.length > 0 ? <CardBody className="bg-gray-50 p-2">
        <div className="flex flex-col gap-2 ">
          {data.map(
            (card) => (
              <InsightCard
                key={card.id}
                cardData={card}
                overviewPage={true}
                materialSelector={materialSelector}
              />
            ),
          )}
        </div>
      </CardBody>
        : <CardBody className='flex items-center justify-center'>
          <InsightDocsIcon />
        </CardBody>}
    </Card>
  );
};

export default InsightOverview;
