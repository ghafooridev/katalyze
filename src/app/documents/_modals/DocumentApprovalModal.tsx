'use client';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import ApproveDocLargeIcon from '@/icons/ApproveDocLargeIcon';
import CheckmarkIcon from '@/icons/CheckmarkIcon';

interface DocumentApprovalModalProps {
  onSubmit: () => void;
  nextId: string;
  numberOfEdits: number;
}

const DocumentApprovalModal: React.FC<DocumentApprovalModalProps> = ({
  onSubmit,
  nextId,
  numberOfEdits,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleApprove = () => {
    onSubmit();
    if (!nextId) {
      router.replace('/documents/tasks');
    } else {
      router.replace(`/documents/tasks/${nextId}`, {
        scroll: false,
      });
    }
    router.refresh();
  };

  return (
    <>
      <Button
        variant="bordered"
        className="px-2 py-3.5 bg-primary-600 rounded-lg shadow border border-primary-600
         text-primary-foreground hover:bg-primary-500 hover:text-primary-foreground
         text-sm font-semibold leading-tight"
        onPress={onOpen}
      >
        <CheckmarkIcon /> <span className="ml-2">Approve Document</span>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="sm:max-w-[300px] md:max-w-[400px]"
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className='flex flex-col'>
                <ApproveDocLargeIcon />
                <div className='mt-2'>
                  <h2 className='text-gray-900'>Approve digital document</h2>
                  <div className="my-2 text-slate-600 text-sm font-normal">
                    {numberOfEdits > 0 ? `You have made ${numberOfEdits} change${numberOfEdits !== 1 ? 's' : ''} 
                      to this document.` : `You have not made any changes to the document. By approving the document 
                      will be available to all users.`}
                  </div>
                </div>
              </ModalHeader>
              <ModalFooter className="flex justify-between sm:justify-between">
                <Button onPress={onClose} variant='ghost' className='flex-1 text-base font-semibold rounded-lg'>
                  Go Back
                </Button>

                <Button
                  onPress={() => handleApprove()}
                  variant='flat'
                  className="flex-1 bg-primary-600 rounded-lg shadow border border-primary-500
                    text-primary-foreground hover:text-primary-foreground text-base font-semibold leading-tight"
                >
                  Approve Document
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentApprovalModal;
