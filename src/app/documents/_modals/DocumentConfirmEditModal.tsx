import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import SaveDocLargeIcon from '@/icons/SaveDocLargeIcon';
import SaveFloppyDiscIcon from '@/icons/SaveFloppyDiscIcon';

interface DocumentConfirmEditModal {
  onConfirm: () => void;
  numberOfEdits: number;
}
const DocumentConfirmEditModal: React.FC<DocumentConfirmEditModal> = ({
  onConfirm,
  numberOfEdits,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (numberOfEdits === 0) {
    return (
      <Button
        variant="bordered"
        className="bg-primary-700 text-primary-foreground text-sm font-semibold rounded-lg
         leading-tight  border-none hover:bg-primary-foreground hover:text-underline
         opacity-50 pointer-events-none"
        onClick={handleConfirm}
      >
        <SaveFloppyDiscIcon />
        <span className="ml-2">{'Save Changes'}</span>
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="bordered"
        className="bg-primary-700 text-primary-foreground text-sm font-semibold rounded-lg
        leading-tight border-none hover:bg-primary-500 hover:text-underline"
        onPress={onOpen}
      >
        <SaveFloppyDiscIcon />
        <span className="ml-2">{'Save Changes'}</span>
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
                <SaveDocLargeIcon />
                <div className='mt-2'>
                  <h2 className='text-gray-900'>Save Changes</h2>
                  <div className="my-2 text-slate-600 text-sm font-normal">
                    {`You have made ${numberOfEdits} change${numberOfEdits !== 1 ? 's' : ''} to the document. 
                    By confirming these changes will be saved and document will be edited for everyone.`}
                  </div>
                </div>
              </ModalHeader>
              <ModalFooter className="flex justify-between sm:justify-between">
                <Button onPress={onClose} variant='ghost' className='flex-1 text-base font-semibold rounded-lg'>
                  Go Back
                </Button>

                <Button
                  onClick={handleConfirm}
                  variant='flat'
                  className="flex-1 bg-primary-600 rounded-lg shadow border border-primary-500
                  text-primary-foreground hover:text-primary-foreground text-base font-semibold  leading-tight"
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentConfirmEditModal;
