'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import BasicTable from '@/components/BasicTable';
import TableSkeleton from '@/components/Skeleton/TableSkeleton';
import { getMaterialNameById } from '@/lib/utils';
import { ApiResponse, MaterialBatch, MaterialMetaData } from '@/types/RawMaterial';

import { getMaterialBatchesByIdFilter, getMaterialSelector } from '../../_services';
import BreadcrumbByMaterialId from '../_components/common/BreadcrumbByMaterialId';
import { materialLinksFactory } from '../materialLinksFactory';
import { MaterialNavSelector } from '../MaterialNavSelector';

import batchColumn from './_components/Columns';

const SpecificBatch: FC<{ params: { materialId: string } }> = ({
  params,
}) => {
  const router = useRouter();
  const [materialSelector, setMaterialSelector] = useState<{ id: string; name: string }[]>();
  const [materialBatches, setMaterialBatches] = useState<ApiResponse<MaterialBatch[]>>();

  const getMaterialOptions = async () => {
    const response: MaterialMetaData = await getMaterialSelector();
    setMaterialSelector(response.materials);
  };
  const [selectedMaterial, setSelectedMaterial] = useState(`${params.materialId}`);
  const [search, setSearch] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [desc, setDesc] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const onClickRow = (value) => {
    const { batchId, material: { id } } = value;
    router.push(`/raw-materials/${id}/${batchId}`);
  };

  const getData = async () => {
    const response = await getMaterialBatchesByIdFilter(selectedMaterial, {
      page,
      desc,
      search,
      orderBy,
      pageSize,
    });

    return response;
  };

  useEffect(() => {
    getData().then((response) => {
      setMaterialBatches(response);
    });
  }, [page, search, orderBy, desc]);

  const onChangeSelector = (key: React.Key | null) => {
    const value = key as string;
    if (key === null) {
      return;
    }
    setSelectedMaterial(value);
    router.push(`/raw-materials/${value}/specific-batches`);
  };

  useEffect(() => {
    getMaterialOptions();
  }, []);

  return (
    <div className='flex flex-row h-full w-full bg-gray-200' data-testid="specific-batch">
      <div className='min-w-[264px] bg-white border-r border-gray-200
      flex flex-col items-stretch justify-start min-h-[calc(100vh-60px)]' >
        <MaterialNavSelector links={materialLinksFactory(params.materialId)}
          placeholder={getMaterialNameById(materialSelector, selectedMaterial)}
          materialSelector={materialSelector}
          selectedMaterial={selectedMaterial}
          onChangeSelector={onChangeSelector} />
      </div >

      <div className='flex w-full bg-gray-200 flex-col items-stretch
      justify-start h-full overflow-auto'>
        <BreadcrumbByMaterialId selectedMaterial={selectedMaterial} materialSelector={materialSelector} />
        <div className='flex flex-col gap-4 p-6'>
          {materialBatches?.data ? <BasicTable
            columns={batchColumn.filter(
              (item) => ['batchId', 'vendorBatchId', 'materialId', 'materialName',
                'rating', 'vendor', 'expireDate', 'availability']
                .includes((item as any).accessorKey),
            )}
            data={materialBatches.data}
            rows={materialBatches.pagination.total}
            isHeader
            isPagination
            onClickRow={onClickRow}
            title={`${getMaterialNameById(materialSelector, selectedMaterial)} Batches`}
            setSearch={setSearch}
            setOrderBy={setOrderBy}
            setDesc={setDesc}
            setPage={setPage}
            setPageSize={setPageSize}
          /> : <TableSkeleton numberOfColumns={8} numberOfRows={10} />}
        </div>
      </div>
    </div>

  );
};

export default SpecificBatch;
