import { columns } from '@/app/documents/_components/columns';
import { getDocumentsByFilter } from '@/app/documents/_services';
import Breadcrumb from '@/components/BreadCrumb';

import { DocumentsDataTable } from '../_components/DocumentsDataTable';
import { Metrics } from '../_components/metrics';

export default async function Files() {
  const { data, pagination } = await getDocumentsByFilter({
    page: 1,
    pageSize: 15,
    status: 'approved',
  });

  const metrics = await Metrics();

  return (
    <section className="" id="root">
      <div>
        <Breadcrumb
          path={['Documents', 'Browse']}
          urlPath={['documents', 'browse']}
        />
        {metrics}
      </div>
      <DocumentsDataTable
        columns={columns}
        data={data}
        rows={pagination.total}
        docStatus={'approved'}
      />
    </section>
  );
}

export const dynamic = 'force-dynamic';
