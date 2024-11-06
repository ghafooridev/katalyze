import { redirect } from 'next/navigation';

import {
  getDocumentById,
  getMetadata,
  getMetrics,
  getPendingDocuments,
} from '@/app/documents/_services';
import { Digitalization } from '@/types/Digitalization.schema';

import { DualDocumentContainer } from './_components/DualDocumentContainer';

export default async function Page(
  props: Readonly<{ params: { id: string } }>,
) {
  const data = await getDocumentById(props.params.id);
  const { json, flattenJson } = await getDocumentById(props.params.id);
  const flattenedData = flattenJson || [];
  const { materials, vendors } = await getMetadata();

  const { pending } = await getMetrics();
  const allPages = Math.ceil(pending / 50);
  const promises:Promise<Digitalization[]>[] = [];
  for (let i = 1; i <= allPages; i += 1) {
    promises.push(getPendingDocuments(i));
  }
  const docs = await Promise.all(promises);
  const allDocs: Digitalization[] = [];
  docs.forEach((doc) => {
    if (Array.isArray(doc)) allDocs.push(...doc);
  });

  const ids = allDocs.map((doc) => doc.id);
  const currIndex = ids.findIndex((id) => id === props.params.id);
  if (currIndex === -1) {
    redirect('/documents/tasks/');
  }
  const nextId = currIndex + 1 < pending ? ids[currIndex + 1] : '';

  return (
    <DualDocumentContainer
      jsonData={json}
      data={data}
      nextId={nextId}
      currentId={props.params.id}
      currentFile={allDocs[currIndex].file.name}
      flattenJson={flattenedData}
      materials={materials}
      vendors={vendors}
    />
  );
}
