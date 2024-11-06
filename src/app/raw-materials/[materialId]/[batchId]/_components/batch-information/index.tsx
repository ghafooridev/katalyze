import { FC } from 'react';

import SimpleTable from '@/app/raw-materials/_components/SimpleTable';
import TableSkeleton from '@/components/Skeleton/TableSkeleton';
import { BatchCharacteristic } from '@/types/RawMaterial';

import batchInformationColumn from './_components/Columns';

const BatchInformation: FC<{ item?: BatchCharacteristic }> = ({ item }) => {
  const dates = Object.fromEntries(item?.dates.map((date) => [date.type, date.value]) || []);
  const convertData = () => {
    if (item) {
      return [
        { title: 'GMId', value: item.material.gmid },
        { title: 'LMId', value: item.material.lmid },
        { title: 'Material Name', value: item.material.name },
        { title: 'batchId', value: item.batchId },
        { title: 'rating', value: item.rating.value },
        { title: 'vendor', value: item.vendor.name },
        { title: 'VendorBatchId', value: item.vendorBatchId },
        {
          title: 'Date Received',
          value: dates.acceptedDate,
        },
        {
          title: 'Date Of Sampling',
          value: dates.testDate,
        },
        {
          title: 'Date Of Expiration',
          value: item.expiryDate,
        },
        {
          title: 'Date Of Reassay',
          value: dates.retestDate,
        },
        {
          title: 'Date Of Release',
          value: dates.qualityRealeaseDate,
        },
      ];
    }
    return [];
  };

  return (<div>
    {convertData().length
      ? <SimpleTable
        title='Batch Information'
        columns={batchInformationColumn}
        data={convertData() as any}
        isHeader
        isClient
      />
      : <TableSkeleton numberOfColumns={2} numberOfRows={2} />}
  </div>
  );
};

export default BatchInformation;
