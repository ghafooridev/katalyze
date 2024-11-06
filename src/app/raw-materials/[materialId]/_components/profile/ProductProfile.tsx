'use client';

import React from 'react';
import {
  Card, CardBody, CardHeader, Chip,
} from '@nextui-org/react';

import { MultipleChips } from '@/app/raw-materials/_components/DynamicChips';

import MolecularImg from './MolecularImage';

const ProductProfile = ({
  materialProfile, materialName, materialDetails,
}) => {
  const TextBox = ({ title, text }: { title: string; text: string }) => (
    <div className="grid grid-rows-2 gap-1 bg-white border border-gray-200 rounded-lg p-1 pl-2">
      <p className="text-gray-600 text-sm font-regular">{title}</p>
      <p className="text-gray-900 text-sm font-medium pb-[2px]">{text}</p>
    </div>
  );

  const renderChips = (chips) => {
    if (!chips || !chips.length) return null;
    if (chips.length > 1) {
      return <MultipleChips chipData={chips} width={'150'} />;
    }
    return chips[0]?.name
      && <Chip classNames={{
        base: 'border-[1.5px] border-gray-600',
        content: 'font-medium text-xs text-gray-700',
      }} size='sm' variant='bordered'>
        <p className={'font-medium  truncate'}>{chips[0].name}</p>
      </Chip>;
  };
  const ChipBox = ({ title, chips }: { title: string; chips: { name: string }[] }) => (
    <div className="flex flex-col gap-1 bg-white border border-gray-200 rounded-lg p-1 pl-2">
      <p className="text-gray-600 text-sm font-regular">{title}</p>
      {renderChips(chips)}
    </div>
  );
  const renderFormula = (formula: string) => formula.split('').map((char, index) => {
    if (/\d/.test(char)) {
      return <sub key={index} className="text-xs font-medium text-gray-900">{char}</sub>;
    }
    return <span key={index}>{char}</span>;
  });

  if (!materialProfile) return <div></div>;

  return (
    <div data-testid="product-profile">
      {materialProfile[0] && <Card className="border border-gray-200 w-full shadow">
        <CardHeader className="p-4">
          <p className="text-gray-900 text-lg font-semibold">
            {materialName && `${materialName} Profile`}
          </p>
        </CardHeader>
        <CardBody className="bg-gray-50 p-2">
          <div className="flex xl:flex-row gap-2 items-top flex-col">
            <div className='flex gap-2  w-full xl:w-[50%]'>
              <div
                className={`w-full xl:w-[50%] text-sm
                 text-gray-900 font-normal p-2 bg-white border border-gray-200 rounded-lg`}>
                {materialProfile[0].description}
              </div>
              <div className=" w-full xl:w-[50%] flex flex-col p-2 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600 font-normal">
                  Molecular Formula
                </p>
                <p className="font-medium text-sm text-gray-900">
                  {materialProfile[0].formula === 'null' ? '' : renderFormula(materialProfile[0].formula)}
                </p>
                <MolecularImg imgStr={materialProfile[0].img} />
              </div>
            </div>
            <div className="flex gap-2 w-full xl:w-[50%]">
              <div className='flex flex-col gap-2 w-full xl:w-1/2'>
                <TextBox title='CAS Number' text={materialProfile[0].cas} />
                <TextBox title='Form' text={materialProfile[0].form_type} />
                <ChipBox title='Source' chips={materialProfile[0].source} />
              </div>
              <div className='flex flex-col gap-2 w-full xl:w-1/2'>
                {materialDetails && <ChipBox title='Used in' chips={materialDetails.products} />}
                {materialDetails && <ChipBox title='Vendors' chips={materialDetails.vendors} />}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>}
    </div>
  );
};

export default ProductProfile;
