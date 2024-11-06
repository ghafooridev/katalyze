'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import BasicTable from '@/components/BasicTable';
import Breadcrumb from '@/components/BreadCrumb';
import TableSkeleton from '@/components/Skeleton/TableSkeleton';
import { useTableTool } from '@/hooks/useTableTool';
import { Material } from '@/types/RawMaterial';

import { browsingLinks } from '../_components/browsingLinks';
import MaterialNavbar from '../_components/MaterialNavbar';
import { getMaterialsFilter } from '../_services';

import MaterialColumn from './_components/Columns';

const BrowsingMaterials = () => {
  const router = useRouter();
  const {
    data: activeMaterials,
    setData: setActiveMaterials,
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
  } = useTableTool<Material>();

  const onClickRow = (value) => {
    const { id } = value;
    router.push(`/raw-materials/${id}/overview`);
  };

  const getData = async () => {
    const response = await getMaterialsFilter({
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
      setActiveMaterials(response);
    });
  }, [page, search, orderBy, desc]);

  return (
    <div className='flex flex-row h-full w-full bg-gray-200'>
      <div className='min-w-[264px] bg-white border-r border-gray-200
      flex flex-col items-stretch justify-start min-h-[calc(100vh-60px)]'>
        <MaterialNavbar links={browsingLinks} />
      </div>

      <div className='flex w-full bg-gray-200 flex-col items-stretch
      justify-start h-full  overflow-auto'>
        <Breadcrumb
          path={['Raw Materials']}
          urlPath={['raw materials']}
        />

        <div className='flex flex-col gap-4 p-4'>
          <div>
            {activeMaterials?.data ? <BasicTable
              columns={MaterialColumn.filter(
                (item) => ['GMID', 'LMID', 'MATERIALNAME',
                  'AVAILABILITY', 'DigitizedVendorBatches', 'products', 'vendor']
                  .includes((item as any).accessorKey),
              )}
              data={activeMaterials.data}
              rows={activeMaterials.pagination.total}
              isHeader
              isPagination
              onClickRow={onClickRow}
              setSearch={setSearch}
              setOrderBy={setOrderBy}
              setDesc={setDesc}
              setPage={setPage}
              setPageSize={setPageSize}
              title='Browsing Materials'
            /> : <TableSkeleton numberOfColumns={7} numberOfRows={10} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsingMaterials;
