'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { getMaterialNameById } from '@/lib/utils';

import BreadcrumbByMaterialId from '../../_components/common/BreadcrumbByMaterialId';
import { materialLinksFactory } from '../../materialLinksFactory';
import { MaterialNavSelector } from '../../MaterialNavSelector';

export const BreadCrumb = ({ materialId, materialSelector }) => (
  <BreadcrumbByMaterialId selectedMaterial={materialId} materialSelector={materialSelector} />
);

export const MaterialSelector = ({ materialId, materialSelector }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(materialId);
  const router = useRouter();

  const onChangeSelector = (key: React.Key | null) => {
    const value = key as string;

    if (key === null) {
      return;
    }
    setSelectedMaterial(value);
    router.push(`/raw-materials/${value}/overview`);
  };

  return (
    <div className='min-w-[264px] bg-white border-r border-gray-200
    flex flex-col items-stretch justify-start min-h-[calc(100vh-60px)]'>
      <MaterialNavSelector
        links={materialLinksFactory(materialId)}
        placeholder={getMaterialNameById(materialSelector, selectedMaterial)}
        selectedMaterial={selectedMaterial}
        onChangeSelector={onChangeSelector}
        materialSelector={materialSelector}
      />
    </div>
  );
};
