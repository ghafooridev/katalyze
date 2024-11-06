'use client';

import { useForm } from 'react-hook-form';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';

import { rejectPendingDocument } from '@/app/documents/_services';
import CloseRejectIcon from '@/icons/CloseRejectIcon';
import RejectDocLargeIcon from '@/icons/RejectDocLargeIcon';

interface DocumentRejectionModalProps {
  fileName: string;
  nextDocId?: string;
}

const DocumentRejectionModal: React.FC<DocumentRejectionModalProps> = ({
  fileName,
  nextDocId,
}) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ reason: string }>();

  const onSubmit = async (data: { reason: string }) => {
    if (!data.reason.trim()) {
      return;
    }
    await rejectPendingDocument(id, data.reason);
    if (!nextDocId) {
      router.replace('/documents/tasks');
    } else {
      router.replace(`/documents/tasks/${nextDocId}`, {
        scroll: false,
      });
    }
    router.refresh();
  };

  return (
    <>
      <Button
        variant="bordered"
        className="bg-primary-foreground rounded-lg shadow border border-red-300 gap-0
        text-red-700 text-sm font-semibold leading-tight hover:text-red-700 px-3.5"
        onPress={onOpen}
      >
        <CloseRejectIcon />
        <span className="ml-2 mt-0.5">Reject Document</span>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='sm:max-w-[300px] md:max-w-[640px]'
        size={'xl'}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>
                <RejectDocLargeIcon />
                <div className='ml-2'>
                  <h2 className='text-gray-900'>Reject digital document</h2>
                  <p className='text-gray-600 text-sm font-normal'>
                    The document will not be available to anyone and will be send back to be investigated.
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-1 py-4">
                  <div className="items-left gap-1 flex flex-col text-left">
                    <label
                      htmlFor="name"
                      className="text-gray-700 text-sm font-medium leading-tight"
                    >
                      Original File Name
                    </label>
                    <Input
                      id="name"
                      value={fileName}
                      className="col-span-3 p-1 rounded-lg shadow border bg-gray-50 "
                      disabled
                    />
                  </div>
                  <div className="items-left gap-1 flex flex-col text-left mt-2">
                    <label
                      htmlFor="comment"
                      className="text-gray-700 text-sm font-medium leading-tight"
                    >
                      Comments*
                    </label>
                    <textarea
                      id='comment'
                      placeholder='Please provide notes and comments to help system admins
                        investigate the cause and resolve the issue.'
                      className={`col-span-3 p-2 rounded-lg shadow border text-gray-900
                        text-base font-normal 
                        leading-normal border-gray-300 ${errors.reason && 'border-red-500'}`}
                      rows={4}
                      {...register('reason', { required: true })}
                    />
                    {errors.reason && <span className='text-red-500'>
                      Please write your comments before rejecting the document.
                    </span>}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between sm:justify-between">
                <Button onPress={onClose} variant='ghost' className='flex-1 text-base font-semibold rounded-lg'>
                  Go Back
                </Button>
                <Button type='submit' variant='flat'
                  className='flex-1 bg-danger text-primary-foreground text-base font-semibold rounded-lg'>
                  Reject Document
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentRejectionModal;
