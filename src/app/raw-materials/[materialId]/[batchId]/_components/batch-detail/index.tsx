import { FC } from 'react';

import SimpleTable from '@/app/raw-materials/_components/SimpleTable';
import TableSkeleton from '@/components/Skeleton/TableSkeleton';
import { BatchCharacteristicSpecification } from '@/types/RawMaterial';

import batchDetailColumn from './_components/Columns';

const BatchInformation: FC<{ item?: BatchCharacteristicSpecification[] }> = ({ item }) => (
  item ? <SimpleTable
    title={'Batch Characteristics'}
    columns={batchDetailColumn}
    data={item as any}
    isHeader
    isClient
  /> : <TableSkeleton numberOfColumns={2} numberOfRows={2} />);

export default BatchInformation;
