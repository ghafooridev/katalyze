'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import type { UseDisclosureReturn } from '@nextui-org/use-disclosure';
import { useRouter } from 'next/navigation';

import GreenFlagIssueLargeIcon from '@/icons/GreenFlagIssueLargeIcon';
import RedFlagIssueLargeIcon from '@/icons/RedFlagIssueLargeIcon';

interface DocumentReportIssueModalProps {
  disclosure: UseDisclosureReturn;
}

const DocumentReportIssueModal: React.FC<DocumentReportIssueModalProps> = ({
  disclosure,
}) => {
  const toastMessage = () => (
    <div className='flex flex-row items-center'>
      <GreenFlagIssueLargeIcon />
      <span className='ml-2'>Issue submitted successfully</span>
    </div>
  );
  const { isOpen, onOpenChange } = disclosure;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ reason: string }>();

  const onSubmit = () => {
    router.refresh();
    toast(toastMessage);
    disclosure.onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='top-center'
      className='sm:max-w-[300px] md:max-w-[640px]'
      size={'xl'}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <RedFlagIssueLargeIcon />
              <div className='ml-2'>
                <h2 className='text-gray-900'>Report Issue</h2>
                <p className='text-gray-600 text-sm font-normal'>
                  A ticket on this document will be assigned to a member of
                  staff to investigate and take actions.
                </p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='items-left gap-1 flex flex-col text-left mt-2'>
                <label
                  htmlFor='comments'
                  className="text-gray-700 text-sm font-medium leading-tight"
                >
                  Explanation*
                </label>
                <textarea
                  id='comments'
                  placeholder='Please provide thorough explanation to help investigate the cause and resolve the issue.'
                  className={`col-span-3 p-2 rounded-lg shadow border text-gray-900 text-base font-normal 
                  leading-normal border-gray-300 ${errors.reason && 'border-red-500'}`}
                  rows={4}
                  {...register('reason', { required: true })}
                />
                {errors.reason && (
                  <span className='text-red-500 text-sm font-normal leading-tight'>
                    You cannot report an issue without providing an explanation.
                  </span>
                )}
              </div>
            </ModalBody>
            <ModalFooter className='flex'>
              <Button onPress={onClose} variant='ghost' className='flex-1 text-base font-semibold rounded-lg'>
                Go Back
              </Button>
              <Button type='submit' variant='flat'
                className='flex-1 bg-red-600 text-primary-foreground text-base font-semibold rounded-lg'>
                Report Issue
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DocumentReportIssueModal;
