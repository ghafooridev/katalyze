'use client';

import { UseControllerProps } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import AddObjectIcon from '@/icons/AddObjectIcon';
import { DigitalData } from '@/types/DigitalData.schema';

import FormInput from '../_components/FormInput';

interface DocumentAddObjectModalProps {
  handleAddObject: (
    newMaterialAttribute: string[],
    newDigitalDataArr: DigitalData[]
  ) => void;
  handleDiscardObject: (newMaterialAttribute: string[]) => void;
  groupedPaths: Record<
    string,
    string[] | { [key: string]: string[] }[] | undefined
  >;
  containerRef: React.RefObject<HTMLDivElement>;
  control: UseControllerProps<DigitalData>;
  currentStep?: number;
  handleResetField: (path: string, originalValue: string) => void;
}

const DocumentAddObjectModal: React.FC<DocumentAddObjectModalProps> = ({
  handleAddObject,
  handleDiscardObject,
  groupedPaths,
  containerRef,
  control,
  currentStep,
  handleResetField,
}) => {
  const toastMessage = () => (
    <div className="flex flex-row items-center">
      <span className="ml-2">Object Added successfully</span>
    </div>
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const newMaterialAttributeIndex = (groupedPaths.materialAttributes || [])
    .length;
  const newMaterialAttribute = [
    `materialAttributes.${newMaterialAttributeIndex}.attributeName`,
    `materialAttributes.${newMaterialAttributeIndex}.resultMaxInclusive`,
    `materialAttributes.${newMaterialAttributeIndex}.resultMaxValue`,
    `materialAttributes.${newMaterialAttributeIndex}.resultMinInclusive`,
    `materialAttributes.${newMaterialAttributeIndex}.resultMinValue`,
    `materialAttributes.${newMaterialAttributeIndex}.resultOriginal`,
    `materialAttributes.${newMaterialAttributeIndex}.resultValue`,
    `materialAttributes.${newMaterialAttributeIndex}.specificationMaxInclusive`,
    `materialAttributes.${newMaterialAttributeIndex}.specificationMaxValue`,
    `materialAttributes.${newMaterialAttributeIndex}.specificationMinInclusive`,
    `materialAttributes.${newMaterialAttributeIndex}.specificationMinValue`,
    `materialAttributes.${newMaterialAttributeIndex}.specificationOriginal`,
    `materialAttributes.${newMaterialAttributeIndex}.testMethod`,
    `materialAttributes.${newMaterialAttributeIndex}.unitOfMeasurement`,
  ];

  const newDigitalDataArr: DigitalData[] = newMaterialAttribute.map((key) => {
    const newDigitalData: DigitalData = {
      path: `${key}`,
      value: '',
      type: 'String' as 'String' | 'Object' | 'Array',
      region: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      flagReasons: '',
      createdBy: { id: 'User' },
      createdAt: new Date().toISOString(),
      version: -1,
    };
    return newDigitalData;
  });
  const handleSubmit = () => {
    handleAddObject(newMaterialAttribute, newDigitalDataArr);
    toast(toastMessage);
  };
  const handleDiscard = () => {
    handleDiscardObject(newMaterialAttribute);
  };
  return (
    <>
      <Button
        onPress={onOpen}
        variant="bordered"
        data-testid="add-object-button"
        className="bg-primary-foreground rounded-md border border-grey-300 gap-0
        text-gray-700 text-xs font-medium px-1 h-[22px] ml-auto
        shadow justify-start items-center inline-flex"
      >
        <div className="flex items-center justify-center mt-[0.5px]">
          <AddObjectIcon />
          <span className="ml-1">Add New Object</span>
        </div>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className=""
        size={'xl'}
        placement="top"
        portalContainer={containerRef.current || undefined}
        hideCloseButton={true}
        shouldBlockScroll={false}
        isDismissable={false}
        data-testid="add-object-modal"
        classNames={{
          wrapper: 'w-auto h-auto absolute z-40',
          base: '',
          body: 'px-0',
          header: 'px-0',
          footer: 'px-0',
          backdrop: 'w-auto h-auto absolute z-40 ',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>
                <div className="ml-2">
                  <h2 data-testid="header-title" className="text-gray-900">
                    Adding Object: Material Attribute{' '}
                    {newMaterialAttributeIndex}
                  </h2>
                  <p className="text-gray-600 text-sm font-normal">
                    You are about to add a new object to the array. please fill
                    the applicable values below.
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <div>
                  <div className="border border-gray-200">
                    <div
                      className="bg-gray-50 shadow-sm sticky top-0 z-40 py-2 px-0 text-left
                      align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0
                      flex border-b border-gray-200"
                    >
                      <div
                        className="flex w-[50%] flex-row pl-7 my-auto
                      text-gray-500 text-xs font-normal leading-[18px]"
                      >
                        Property
                      </div>
                      <div
                        className="flex w-[calc(50%-2.5rem)] flex-row pl-2 my-auto text-gray-500
                        text-xs font-normal leading-[18px]"
                      >
                        Value
                      </div>
                      <div
                        className="flex w-10 flex-row justify-center pl-0
                        my-auto text-gray-500 text-xs font-normal leading-[18px]"
                      ></div>
                    </div>
                    <div
                      className="text-sm border-0 bg-primary-foreground shadow-sm relative
                    w-full border-t-0 border-b-0"
                    >
                      {Object.entries(newMaterialAttribute).map(
                        ([index, _paths]) => {
                          const pathData = newDigitalDataArr.find(
                            (item: DigitalData) => item.path === _paths,
                          );
                          if (!pathData) return null;
                          return (
                            <div key={index}>
                              <FormInput
                                key={String(_paths)}
                                index={Number(index)}
                                control={control as any}
                                name={_paths.toString()}
                                pathData={pathData}
                                originalCreatedAt={pathData.createdAt}
                                currentStep={currentStep}
                                handleResetField={handleResetField}
                                isDirty={
                                  !pathData.flagReasons
                                  || pathData.flagReasons.length === 0
                                }
                                isEditing={true}
                              />
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex px-2 pt-0">
                <Button
                  onClick={() => {
                    handleDiscard();
                    onClose();
                  }}
                  data-testid="discard-button"
                  variant="ghost"
                  className="flex-1 text-base font-semibold rounded-lg"
                >
                  Discard
                </Button>
                <Button
                  variant="flat"
                  data-testid="submit-button"
                  onClick={() => {
                    handleSubmit();
                    onClose();
                  }}
                  className="flex-1 bg-primary-700 text-primary-foreground text-base font-semibold rounded-lg"
                >
                  Add Object
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentAddObjectModal;
