import { PropsWithChildren } from 'react';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import {
  getDocumentById,
  getMetrics,
  getPendingDocuments,
} from '@/app/documents/_services';
import Breadcrumb from '@/components/BreadCrumb';
import ApprovalStatusSmallIcon from '@/icons/ApprovalStatusSmallIcon';
import FolderIcon from '@/icons/FolderIcon';
import PendingHourGlassIcon from '@/icons/PendingHourGlassIcon';
import { Digitalization } from '@/types/Digitalization.schema';

import DocumentConfirmExitModal from '../../_modals/DocumentConfirmExitModal';
import { ModalProvider } from '../../_modals/ModalContext';

export default async function PendingReviewLayout(
  props: PropsWithChildren<{
    params: { id: string };
  }>,
) {
  const { pending } = await getMetrics();
  const totalPages = Math.ceil(pending / 50);
  const allPromises: Promise<Digitalization[]>[] = [];
  for (let i = 1; i <= totalPages; i += 1) {
    allPromises.push(getPendingDocuments(i));
  }
  const docPromises = await Promise.all(allPromises);
  const allDocs: Digitalization[] = [];
  docPromises.forEach((document) => {
    if (Array.isArray(document)) allDocs.push(...document);
  });

  const data = await getDocumentById(props.params.id);
  const ids = allDocs.map((doc) => doc.id);
  const currIndex = ids.findIndex((id) => id === props.params.id);
  if (currIndex === -1) {
    redirect('/documents/tasks/');
  }
  const nextId = currIndex + 1 < allDocs.length ? ids[currIndex + 1] : null;
  const prevId = currIndex - 1 >= 0 ? ids[currIndex - 1] : null;
  return (
    <ModalProvider>
      <div className="mb-7 mx-auto px-0">
        <div className="relative">
          <div className="flex flex-wrap flex-col md:flex-row pb-6 gap-y-4">
            <Breadcrumb
              path={['Documents', 'Tasks', data.file.name]}
              urlPath={['documents', 'tasks', props.params.id]}
            />
            <div className="flex flex-wrap flex-col sm:flex-row pt-3 md:pt-0 mr-auto mt-auto px-5">
              <div className="pl-1.5 pr-1.5 flex pb-4 sm:pb-0 mr-0">
                <Link
                  href={'/documents/tasks'}
                  target="_self"
                  rel="noopener noreferrer"
                  className="flex items-center"
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
                      <span className="z-10 relative mt-auto mb-auto pr-1 pl-1">
                        <FolderIcon />{' '}
                      </span>
                      <p>
                        RM Certificate of Analysis
                      </p>
                    </span>
                  </Chip>
                </Link>
              </div>
              {data.status === 'pending' ? (
                <div className="pl-1.5 pr-1.5 flex pb-4 sm:pb-0 mr-0">
                  <Chip
                    size="sm"
                    variant="bordered"
                    classNames={{
                      base: 'mix-blend-multiply bg-warning-50 rounded-2xl border border-warning-200 h-6',
                      content: 'text-warning-700 text-xs font-medium p-0',
                    }}
                  >
                    <span className="flex">
                      <span className="z-10 relative mt-auto mb-auto pr-1 pl-1">
                        <PendingHourGlassIcon />
                      </span>
                      <p>
                        Pending Approval
                      </p>
                    </span>
                  </Chip>
                </div>
              ) : (
                <Chip
                  size="sm"
                  variant="bordered"
                  classNames={{
                    base: 'mix-blend-multiply bg-success-50 rounded-2xl border border-success-200',
                    content: 'text-success-700 text-xs font-medium p-0',
                  }}
                >
                  <span className="flex">
                    <span className="z-10 relative pr-1 pl-1">
                      <ApprovalStatusSmallIcon />
                    </span>
                    <p>
                      Approved
                    </p>
                  </span>
                </Chip>
              )}
            </div>
            <div className="flex justify-start items-start h-6 mt-auto px-6">
              <DocumentConfirmExitModal next={false} id={prevId} />
              <div>
                <span className="text-slate-600 text-sm font-medium leading-tight mx-3">
                  {currIndex + 1}/{pending} Document
                  {pending > 1 ? 's' : ''}
                </span>
              </div>
              <DocumentConfirmExitModal next={true} id={nextId} />
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </ModalProvider>
  );
}
