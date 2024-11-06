'use client';

import {
  Button, Card, CardBody, CardHeader,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import TableSkeleton from '@/components/Skeleton/TableSkeleton';

import SimpleTable from '../../_components/SimpleTable';

import { columnsBatches, columnsMaterials } from './Columns';
import Link from 'next/link';

const Header = (props: { title: string, route: string }) => {
  const { title, route } = props;

  return (
    <CardHeader className='flex justify-between items-center pl-6 pr-2 py-4'>
      <div className='flex justify-between items-center gap-2'>
        <h2 className='text-lg font-semibold'>{title}</h2>
      </div>
      <Button color='primary' variant='light' className='text-sm font-semibold'>
        <Link href={`/raw-materials/${route}`}>
          See More
        </Link>
      </Button>
    </CardHeader>
  );
};

export const MaterialBatchesTable = ({ data }) => {
  const router = useRouter();

  const onClickRowBatches = (value) => {
    const { batchId, material: { id } } = value;
    router.push(`/raw-materials/${id}/${batchId}`);
  };

  return (<Card className='w-full h-[480px]'>
    <Header title='Latest Raw Material Batches' route="browsing-batches" />
    <CardBody className='p-0 rounded-none'>

      {data?.length
        ? <SimpleTable
          columns={
            columnsBatches.filter((item) => [
              'batchId', 'materialName', 'vendor']
              .includes((item as any).accessorKey)) as any}
          data={data}
          onClickRow={onClickRowBatches}
        />
        : <TableSkeleton numberOfColumns={3} numberOfRows={8} />}
    </CardBody>
  </Card>);
};

export const OnBoardedMaterialTable = ({ data }) => {
  const router = useRouter();

  const onClickRowMaterial = (value) => {
    const { id } = value;
    router.push(`/raw-materials/${id}/overview`);
  };

  return (
    <Card className='w-full h-[480px]'>
      <Header title='Latest Onboarded Materials' route="browsing-materials" />
      <CardBody className='p-0'>
        {data?.length
          ? <SimpleTable
            columns={columnsMaterials.filter(
              (item) => ['materialName', 'GMID', 'vendors']
                .includes((item as any).accessorKey),
            )}
            data={data}
            onClickRow={onClickRowMaterial}
          />
          : <TableSkeleton numberOfColumns={3} numberOfRows={8} />}

      </CardBody>
    </Card>
  );
};
