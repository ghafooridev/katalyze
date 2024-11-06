'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import BasicTable from '@/components/BasicTable';
import Breadcrumb from '@/components/BreadCrumb';
import TableSkeleton from '@/components/Skeleton/TableSkeleton';
import { useTableTool } from '@/hooks/useTableTool';
import { ApiResponse, MaterialBatch } from '@/types/RawMaterial';

import { browsingLinks } from '../_components/browsingLinks';
import MaterialNavbar from '../_components/MaterialNavbar';
import { getMaterialBatchesFilter } from '../_services';

import batchColumn from './_components/Columns';

export default function BrowsingBatches() {
  const {
    data: materialBatches,
    setData: setMaterialBatches,
    search,
    setSearch,
    orderBy,
    setOrderBy,
    desc,
    setDesc,
    page,
    setPage,
    pageSize,
    setPageSize,
  } = useTableTool<MaterialBatch>();
  const router = useRouter();

  const onClickRow = (value) => {
    const {
      batchId,
      material: { id },
    } = value;
    router.push(`/raw-materials/${id}/${batchId}`);
  };

  const getData = async () => {
    const response: ApiResponse<MaterialBatch[]> = await getMaterialBatchesFilter({
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

  return (
    <div className="flex flex-row h-full w-full bg-gray-200">
      <div className="min-w-[264px] bg-white border-r border-gray-200
      flex flex-col items-stretch justify-start min-h-[calc(100vh-60px)]">
        <MaterialNavbar links={browsingLinks} />
      </div>

      <div className="flex w-full bg-gray-200 flex-col items-stretch
      justify-start h-full overflow-auto">
        <Breadcrumb
          path={['Raw Materials']}
          urlPath={['raw materials']}
        />

        <div className="flex flex-col gap-4 p-4">
          <div>
            {materialBatches?.data ? (
              <BasicTable
                columns={batchColumn.filter((item) => [
                  'batchId',
                  'vendorBatchId',
                  'materialId',
                  'materialName',
                  'vendor',
                  'expireDate',
                  'availability',
                ].includes((item as any).accessorKey))}
                data={materialBatches.data}
                rows={materialBatches.pagination.total}
                isHeader
                isPagination
                onClickRow={onClickRow}
                setSearch={setSearch}
                setOrderBy={setOrderBy}
                setDesc={setDesc}
                setPage={setPage}
                setPageSize={setPageSize}
                title="Browsing Batches"
              />
            ) : (
              <TableSkeleton numberOfColumns={8} numberOfRows={10} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
