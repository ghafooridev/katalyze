import { Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import AtomIcon from '@/icons/AtomIcon';
import BeakerIcon from '@/icons/BeakerIcon';
import GraphIcon from '@/icons/GraphIcon';
import { getMaterialNameById } from '@/lib/utils';
import { InsightCardProps, MaterialInsight } from '@/types/RawMaterial';

const InsightCard = ({
  cardData,
  overviewPage = false,
  OnSelectCard,
  selectedInsight,
  materialSelector,
}: InsightCardProps) => {
  const CardSelected = (card: MaterialInsight) => (selectedInsight as MaterialInsight).id === card.id;

  const router = useRouter();

  const materialName = getMaterialNameById(materialSelector, cardData.material_id);

  const onClickReview = () => {
    const insightId = cardData.id;
    router.push(`/raw-materials/analytics-insights?insight=${encodeURIComponent(insightId)}`);
  };

  return (
    <Card
      className={`rounded-md shadow-sm border border-gray-200 max-h-[240px] 
        ${!overviewPage && 'cursor-pointer'}
        ${!overviewPage && CardSelected(cardData) && 'bg-primary-50'}
        `}
    >
      <CardBody
        className="p-4 h-full flex flex-col"
        onClick={() => OnSelectCard && OnSelectCard(cardData)}
      >
        <div className="flex gap-4 w-full flex-grow">
          <GraphIcon />
          <div className="flex flex-col w-full h-full">
            <p className="text-typo-900 text-sm font-semibold">
              {cardData.card_data.title}
            </p>
            <p className="text-sm font-normal text-gray-600 mt-[6px]
            overflow-hidden line-clamp-4 2xl:line-clamp-none">
              {cardData.card_data.body}
            </p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-row gap-2 items-center">
                <div className="flex gap-[2px] items-center text-xs">
                  <AtomIcon />
                  <p className="font-medium mt-0.5">{materialName}</p>
                </div>
                <div className="flex gap-[2px] items-center text-xs">
                  <BeakerIcon />
                  <p className="font-medium mt-0.5">{cardData.process_id}</p>
                </div>
              </div>
              {overviewPage && (
                <div className="flex gap-3">

                  <p role="button" className="text-sm text-primary-700 cursor-pointer"
                    onClick={() => onClickReview()}
                  >
                    Review
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default InsightCard;
