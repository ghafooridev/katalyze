import { Chip } from '@nextui-org/react';
import Link from 'next/link';

import { getDocumentById } from '@/app/documents/_services';
import Breadcrumb from '@/components/BreadCrumb';
import ApprovalStatusSmallIcon from '@/icons/ApprovalStatusSmallIcon';
import FolderIcon from '@/icons/FolderIcon';
import PendingHourGlassIcon from '@/icons/PendingHourGlassIcon';

import { DualDocumentContainer } from './_components/DualDocumentContainer';

export default async function Page(
  props: Readonly<{ params: { id: string } }>,
) {
  const data = await getDocumentById(props.params.id);
  const { json, flattenJson } = await getDocumentById(props.params.id);
  const flattenedData = flattenJson || [];

  return (
    <div className=" mb-7 mx-auto px-0">
      <div className="relative ">
        <div className="flex flex-wrap flex-col md:flex-row pb-6 gap-y-4">
          <Breadcrumb
            path={['Documents', 'Browse', data.file.name]}
            urlPath={['documents', 'browse', props.params.id]}
          />
          <div className="flex h-6 flex-wrap items-center flex-row pt-0 mt-auto">
            <div className="pl-1.5 pr-1.5 flex mb-auto pb-4 sm:pb-0 mr-0">
              <Link
                href={'/documents/browse'}
                target="_self"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Chip
                  size="sm"
                  variant="bordered"
                  classNames={{
                    base: 'bg-primary-foreground rounded-md shadow border border-gray-300',
                    content: 'text-gray-700 text-xs font-medium p-0',
                  }}
                >
                  <span className="flex">
                    <span className="z-10 relative mt-auto mb-auto pr-1 pl-1"><FolderIcon /></span>
                    <p>
                      RM Certificate of Analysis
                    </p>
                  </span>
                </Chip>
              </Link>
            </div>
            {data.status === 'pending' ? (
              <Chip
                size="sm"
                variant="bordered"
                classNames={{
                  base: 'mix-blend-multiply bg-warning-50 rounded-2xl border border-warning-200',
                  content: 'text-warning-700 text-xs font-medium p-0',
                }}
              >
                <span className="flex">
                  <span className="z-10 relative mt-auto mb-auto pr-1 pl-1">
                    <PendingHourGlassIcon />
                  </span>
                  <p>Pending Approval</p>
                </span>
              </Chip>
            ) : (
              <Chip
                size="sm"
                variant="bordered"
                classNames={{
                  base: 'mix-blend-multiply bg-success-50 rounded-2xl border border-success-200 h-5',
                  content: 'text-success-700 text-xs font-medium p-0',
                }}
              >
                <span className="flex">
                  <span className="z-10 relative mt-auto mb-auto pr-1 pl-1">
                    <ApprovalStatusSmallIcon />
                  </span>
                  <p>
                    Approved
                  </p>
                </span>
              </Chip>
            )}
          </div>
        </div>
        <DualDocumentContainer
          jsonData={json}
          data={data}
          currentId={props.params.id}
          flattenJson={flattenedData}
        />
      </div>
    </div>
  );
}
