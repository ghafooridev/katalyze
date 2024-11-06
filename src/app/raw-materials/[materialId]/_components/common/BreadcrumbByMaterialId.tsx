import React, { FC } from 'react';

import Breadcrumb from '@/components/BreadCrumb';
import { getMaterialNameById } from '@/lib/utils';

const BreadcrumbByMaterialId:
  FC<{ materialSelector?: { id: string; name: string }[], selectedMaterial: string }> = (props) => {
    const { materialSelector, selectedMaterial } = props;
    return (
      <div>
        <Breadcrumb
          path={['Raw Materials', getMaterialNameById(materialSelector, selectedMaterial)]}
          urlPath={['raw materials', `${selectedMaterial}/overview`]}
        />
      </div>
    );
  };

export default BreadcrumbByMaterialId;
