import { columns } from '@/app/documents/_components/columns';
import { getDocumentsByFilter } from '@/app/documents/_services';
import Breadcrumb from '@/components/BreadCrumb';

import { DocumentsDataTable } from '../_components/DocumentsDataTable';

export default async function Task() {
  const { data, pagination } = await getDocumentsByFilter({
    page: 1,
    pageSize: 15,
    status: 'pending',
  });

  return (
    <section className="" id="root">
      <Breadcrumb
        path={['Documents', 'Tasks']}
        urlPath={['documents', 'tasks']}
      />
      <div className="mb-6"></div>
      <DocumentsDataTable
        columns={columns}
        data={data}
        rows={pagination.total}
        docStatus={'pending'}
      />
    </section>
  );
}

export const dynamic = 'force-dynamic';
