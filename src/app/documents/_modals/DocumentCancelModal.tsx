import React from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import DiscardDocLargeIcon from '@/icons/DiscardDocLargeIcon';

interface DocumentConfirmModal {
  onCancel: () => void;
  numberOfEdits: number;
}

const DocumentConfirmModal: React.FC<DocumentConfirmModal> = ({
  onCancel,
  numberOfEdits,
}) => {
  const handleCancel = () => {
    onCancel();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (numberOfEdits === 0) {
    return (
      <Button
        variant="bordered"
        className="text-sm font-semibold leading-tight  hover:bg-primary-foreground
        hover:text-underline rounded-lg"
        onClick={handleCancel}
      >
        {'Discard'}
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="bordered"
        className="text-sm font-semibold leading-tight  hover:bg-primary-foreground
        hover:text-underline rounded-lg"
        onPress={onOpen}
      >
        {'Discard'}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="sm:max-w-[300px] md:max-w-[400px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col'>
                <DiscardDocLargeIcon />
                <div className='mt-2'>
                  <h2 className='text-gray-900'>Discarding Changes</h2>
                  <div className="my-2 text-slate-600 text-sm font-normal">
                    {`You have made ${numberOfEdits} change${numberOfEdits !== 1 ? 's' : ''} to this document. 
                    If you discard, all changes will be lost`}
                  </div>
                </div>
              </ModalHeader>
              <ModalFooter className="flex justify-between sm:justify-between">
                <Button onPress={onClose} variant='ghost' className='flex-1 text-base font-semibold rounded-lg'>
                  Go Back
                </Button>

                <Button
                  onClick={handleCancel}
                  variant='flat'
                  className="flex-1 bg-danger rounded-lg shadow border
                  text-primary-foreground text-base font-semibold leading-tight">
                  Discard changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentConfirmModal;
