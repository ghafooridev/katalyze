'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';

import FilterSearchIcon from '@/icons/FilterSearchIcon';
import InsightDocsIcon from '@/icons/InsightsDocsIcon';
import SearchIcon from '@/icons/SearchIcon';
import { InsightListProps, MaterialInsight } from '@/types/RawMaterial';

import InsightCard from './InsightCard';

const InsightList = ({
  data,
  setSelectedInsight,
  selectedInsight,
  materialSelector,
}: InsightListProps) => {
  const [filter, setFilter] = useState<string>('');

  const OnSelectCard = (card: MaterialInsight) => {
    setSelectedInsight(card);
  };

  return (
    <div className="w-full lg:w-1/3">
      <Card className="rounded-xl shadow-sm border border-gray-200 w-full">
        <CardHeader className="pt-4 pl-4 pr-4 pb-4">
          <div className="flex flex-col w-full gap-2 justify-between items-center xl:flex-row">
            <div className="flex items-center justify-between w-full">
              <p className="font-semibold text-lg text-gray-900 min-w-[160px]">
                Analytics Insights
              </p>
              <Chip variant="bordered" color="primary">
                {data.length}
              </Chip>
            </div>
            <div className="hidden flex gap-2 items-center
            justify-between p-0 m-0 h-[28px] w-full">
              <Input
                size="sm"
                variant="bordered"
                placeholder="Search..."
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                startContent={<SearchIcon />}
              />
              <Popover>
                <PopoverTrigger>
                  <Button isIconOnly variant="light" aria-label="Like">
                    <FilterSearchIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col  justify-start min-w-52">
                  <div></div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <Divider />

        {data.length ? <CardBody className="bg-gray-50 p-2 xl:h-[65vh]">
          <div className="flex flex-col gap-2 ">
            {data.map((card) => (
              <InsightCard
                key={card.id}
                cardData={card}
                overviewPage={false}
                OnSelectCard={OnSelectCard}
                selectedInsight={selectedInsight}
                materialSelector={materialSelector}
              />
            ))}
          </div>
        </CardBody> : <CardBody className="xl:h-[65vh]">
          <div className="flex flex-col text-center items-center justify-center h-full">
            <InsightDocsIcon />
          </div>
        </CardBody>}
      </Card>
    </div>
  );
};

export default InsightList;
