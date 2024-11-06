import { FC } from 'react';

import TableSkeleton from '@/components/Skeleton/TableSkeleton';
import { BatchCharacteristicSpecification } from '@/types/RawMaterial';

import batchCoaColumn from './_components/Columns';
import BatchCoaTable from './_components/Table';

const BatchCoa: FC<{ item?: BatchCharacteristicSpecification[], pdfDocument?: string }> = ({ item }) => (
  item ? < BatchCoaTable
    columns={batchCoaColumn}
    data={item}
    isHeader
  /> : <TableSkeleton numberOfColumns={5} numberOfRows={2} />
);

export default BatchCoa;
