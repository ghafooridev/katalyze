'use client';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import DiscardNextLargeIcon from '@/icons/DiscardNextLargeIcon';

import { useModal } from './ModalContext';

interface DocumentConfirmExitModal {
  next: boolean;
  id: string | null;
}

const DocumentConfirmExitModal: React.FC<DocumentConfirmExitModal> = ({
  next,
  id,
}) => {
  const {
    openModal, edits,
  } = useModal();
  const router = useRouter();
  const handleExit = () => {
    router.push(`/documents/tasks/${id}`);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (openModal === false) {
    return (
      <Link
        href={`/documents/tasks/${id}`}
        passHref
        legacyBehavior
        scroll={false}
      >
        <Button
          isDisabled={id === null}
          data-testid={'document-button'}
          className="px-2 bg-primary-foreground rounded-lg min-w-10 self-center
          shadow border border-gray-300 justify-center items-center gap-0 inline-flex hover:bg-gray-100">
          <div className="w-5 h-5 flex justify-center items-center">
            {next === false ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          </div>
        </Button>
      </Link>
    );
  }
  return (
    <>

      <Button
        className="px-2 bg-primary-foreground rounded-lg min-w-10 self-center
        shadow border border-gray-300 justify-center items-center gap-0 inline-flex hover:bg-gray-100"
        onPress={onOpen}
        data-testid={'isDirty-document-button'}
        isDisabled={id === null}>
        <div className="w-5 h-5 flex justify-center items-center">
          {next === false ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </div>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="sm:max-w-[450px] md:max-w-[450px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col'>
                <DiscardNextLargeIcon />
                <div className='mt-2'>
                  <h2 className='text-gray-900'>You are about to discard changes</h2>
                  <div className="my-2 text-slate-600 text-sm font-normal">
                    {`You have made ${edits} changes to the document.`}
                    {'Do you want to save those changes or revert back to original stete?'}
                  </div>
                </div>
              </ModalHeader>
              <ModalFooter className="flex justify-between sm:justify-between">
                <Button onPress={onClose} variant='ghost' className='text-base font-semibold rounded-lg'>
                  Go Back
                </Button>

                <Button
                  onClick={() => {
                    handleExit();
                  }}
                  data-testid={'discard-document-button'}
                  variant='flat'
                  className="bg-red-50 text-base font-semibold rounded-lg border-[#fecdc9] shadow"
                >
                  <span className='text-red-700 text-base font-semibold leading-normal'>
                    Discard Changes and Go to {next === false ? 'Previous' : 'Next'}
                  </span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentConfirmExitModal;
