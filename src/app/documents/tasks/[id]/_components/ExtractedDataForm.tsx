'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { flatten } from 'flat';

import FormInput from '@/app/documents/_components/FormInput';
import DocumentAddObjectModal from '@/app/documents/_modals/DocumentAddObjectModal';
import DocumentApprovalModal from '@/app/documents/_modals/DocumentApprovalModal';
import DocumentRejectionModal from '@/app/documents/_modals/DocumentRejectionModal';
import { useModal } from '@/app/documents/_modals/ModalContext';
import { approvePendingDocument } from '@/app/documents/_services';
import { ExtractedDataJson } from '@/components/ExtractedData/ExtractedDataJson';
import CheckmarkIcon from '@/icons/CheckmarkIcon';
import PathArrowIcon from '@/icons/PathArrowIcon';
import { convertToTitleCase, updateGroupedPaths } from '@/lib/utils';
import { DigitalData } from '@/types/DigitalData.schema';
import { Digitalization } from '@/types/Digitalization.schema';

interface Props {
  data: Digitalization;
  flattenJson: DigitalData[];
  nextId: string;
  currentId: string;
  tableView: boolean;
  originalCreatedAt: string;
  currentFile: string;
  toggleBlur: () => void;
  materials: Array<{
    id: string;
    name: string;
  }>;
  vendors: Array<{
    id: string;
    name: string;
  }>;
}

const steps = [
  {
    id: 'Step 1',
    name: 'Validate core data',
  },
  {
    id: 'Step 2',
    name: 'Validate all data',
  },
];

type FormValues = Record<string, any>;

export const ExtractedDataForm: React.FC<Props> = React.memo(
  ({
    data: json,
    nextId,
    flattenJson,
    currentId,
    tableView,
    originalCreatedAt,
    currentFile: fileName,
    toggleBlur,
    materials,
    vendors,
  }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [checkedPaths, setCheckedPaths] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [inputPaths, setInputPaths] = useState<string[]>(
      Object.keys(flatten(json)),
    );
    const [flatJson, setFlatJson] = useState<DigitalData[]>(flattenJson);
    const groupedPaths: Record<
      string,
      string[] | { [key: string]: string[] }[]
    > = {};
    updateGroupedPaths(inputPaths, groupedPaths);

    useEffect(() => {
      setOpen(true);
    }, []);

    const next = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((step) => step + 1);
      }
    };

    useEffect(() => {
      updateGroupedPaths(inputPaths, groupedPaths);
    }, [inputPaths]);

    const {
      handleSubmit,
      control,
      formState: { dirtyFields },
      resetField,
      setValue,
    } = useForm({
      defaultValues: json as FormValues,
    });
    const handleResetField = (path, originalValue) => {
      resetField(path, { defaultValue: originalValue });
    };
    const { setOpenModal, setEdits } = useModal();

    useEffect(() => {
      if (Object.keys(flatten(dirtyFields)).length > 0) {
        setOpenModal(true);
      } else {
        setOpenModal(false);
      }
      setEdits(Object.keys(flatten(dirtyFields)).length);
    }, [Object.keys(flatten(dirtyFields)).length, setOpenModal]);

    const groupMaterialAttributes = () => {
      const materialAttributes = Object.keys(groupedPaths).filter((key) => key.startsWith('materialAttributes'));
      const materialAttributesArray = materialAttributes.map((key) => ({
        [key]: groupedPaths[key],
      }));
      materialAttributes.forEach((key) => {
        delete groupedPaths[key];
      });
      groupedPaths.materialAttributes = materialAttributesArray as {
        [key: string]: string[];
      }[];
    };
    groupMaterialAttributes();

    const handleAddObjectTask = (
      newMaterialAttribute: string[],
      newDigitalDataArr: DigitalData[],
    ) => {
      setInputPaths((prevInputPaths) => [
        ...prevInputPaths,
        ...Object.values(newMaterialAttribute),
      ]);
      setFlatJson((prev) => [...prev, ...newDigitalDataArr]);
      newMaterialAttribute.forEach((path: string) => {
        if (
          Object.keys(flatten(dirtyFields))
            .map((_path) => _path)
            .includes(path)
        ) return;
        setValue(path, '', { shouldDirty: true });
      });
    };

    const handleDiscardObjectTask = (newMaterialAttribute: string[]) => (
      newMaterialAttribute.forEach((path: string) => (resetField(path, { keepDirty: false })))
    );

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
      const flat = flatten(formData);
      const edited = Object.keys(flatten(dirtyFields)).map((path) => ({
        path,
        value: (flat as FormValues)[path] || '',
      }));
      if (edited.length === 0) {
        edited.push({ path: '', value: '' });
      }
      await approvePendingDocument(currentId, edited);
    };

    const handleCheckboxChange = (path: string, checked: boolean) => {
      setCheckedPaths((prev) => (checked ? [...prev, path] : prev.filter((p) => p !== path)));
    };

    const findItemFn = (flatJsonData: DigitalData[], path: string) => flatJsonData.find(
      (item: DigitalData) => (item.path === path),
    );

    const allDisplayedChecked = flatJson
      .filter((item) => [
        'vendorInformation.vendorName',
        'batchInformation.materialName',
        'batchInformation.vendorBatchID',
      ].includes(item.path))
      .every((item) => checkedPaths.includes(item.path));

    const formInputReturn = (
      pathData: DigitalData | undefined,
      path: string,
    ) => {
      if (!pathData) return null;
      const globalInd = flattenJson.findIndex(
        (item) => item.path === path,
      );
      return (
        <FormInput
          key={path}
          index={globalInd}
          control={control as any}
          name={path}
          pathData={pathData}
          originalCreatedAt={originalCreatedAt}
          materials={materials}
          vendors={vendors}
          currentStep={currentStep}
          handleResetField={handleResetField}
          isEditing={true}
        />
      );
    };

    return (
      <div>
        <div className={`relative ${tableView ? '' : 'hidden'}`}>
          <div ref={containerRef} />
          <form
            className={`max-w-screen-lg relative 
                ${currentStep === 0 ? 'blur-sm bg-gray-900 opacity-60 pointer-events-none' : ''}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Modal
              isOpen={open && currentStep === 0}
              onClose={() => setOpen(false)}
              hideCloseButton={true}
              backdrop={'transparent'}
              shouldBlockScroll={false}
              isDismissable={false}
              placement={'top'}
              size='2xl'
              portalContainer={containerRef.current ?? undefined}
              classNames={{
                wrapper: 'w-auto h-auto absolute z-40',
                body: 'px-0',
                header: 'px-0',
                footer: 'px-0',
              }}
            >
              <ModalContent>
                <ModalHeader className='pt-3 pb-1'>
                  <span className='text-gray-900 text-sm font-semibold my-0 px-6 block'>
                    Review, edit and then verify the data fields below
                  </span>
                </ModalHeader>
                <ModalBody>
                  <div>
                    <div className='border border-gray-200'>
                      <div
                        className='bg-gray-50 shadow-sm sticky top-0 z-30 py-2 px-0 text-left
                          align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0
                          flex border-b border-gray-200'
                      >
                        <div
                          className='flex w-[50%] flex-row pl-7 my-auto
                          text-gray-500 text-xs font-normal leading-[18px]'
                        >
                          Property
                        </div>
                        <div
                          className='flex w-[calc(50%-2.5rem)] flex-row pl-2 my-auto text-gray-500
                            text-xs font-normal leading-[18px]'
                        >
                          Value
                        </div>
                        <div
                          className='flex w-10 flex-row justify-center pl-0
                            my-auto text-gray-500 text-xs font-normal leading-[18px]'
                        ></div>
                      </div>
                      <div
                        className='text-sm border-0 bg-primary-foreground shadow-sm relative
                        w-full border-t-0 border-b-0'
                      >
                        {Object.entries(groupedPaths).map(
                          ([header, _paths]) => {
                            const filteredPaths = (_paths as string[]).filter(
                              (path) => path === 'vendorInformation.vendorName'
                                || path === 'batchInformation.materialName'
                                || path === 'batchInformation.vendorBatchID',
                            );
                            return (
                              <div key={header}>
                                {filteredPaths.map((path, index) => {
                                  const pathData = flatJson.find(
                                    (item: DigitalData) => item.path === path,
                                  );
                                  if (!pathData) return null;
                                  const globalInd = flattenJson.findIndex(
                                    (item) => item.path === path,
                                  );
                                  return (
                                    <FormInput
                                      key={String(path)}
                                      index={globalInd}
                                      control={control as any}
                                      name={path.toString()}
                                      pathData={pathData}
                                      originalCreatedAt={originalCreatedAt}
                                      checkbox={true}
                                      onCheckboxChange={handleCheckboxChange}
                                      materials={materials}
                                      vendors={vendors}
                                      currentStep={currentStep}
                                      data-testid={`input-${path}`}
                                      handleResetField={handleResetField}
                                      isEditing={true}
                                    />
                                  );
                                })}
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className='flex justify-between sm:justify-between mx-6 pb-5 pt-3'>
                  <DocumentRejectionModal
                    fileName={fileName}
                    nextDocId={nextId}
                  />
                  <Button
                    onClick={() => {
                      next();
                      toggleBlur();
                    }}
                    className={`bg-primary-600 rounded-lg shadow border border-primary-600
                      text-primary-foreground hover:bg-primary-500 hover:text-primary-foreground text-sm font-semibold
                      leading-tight 
                      ${!allDisplayedChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!allDisplayedChecked}
                  >
                    <CheckmarkIcon />
                    Verify Batch Information
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <div>
              <div
                className='h-[35vh] min-h-[373px] max-h-[650px] xl:h-[650px] overflow-y-scroll border-b-0
                  border-t-0 scrollbar-thin scrollbar-thumb-gray-300
                  scrollbar-track-gray-100 border border-gray-200'
              >
                <div
                  className='bg-gray-50 shadow-sm  sticky top-0 z-30 py-2 px-0
                    text-left align-middle font-medium text-muted-foreground
                    [&:has([role=checkbox])]:pr-0 flex  border-b border-gray-200 '
                >
                  <div
                    className='flex w-[50%] flex-row pl-7 my-auto
                    text-gray-500 text-xs font-normal font-["Inter"] leading-[18px]'
                  >
                    Property
                  </div>
                  <div
                    className='flex w-[calc(50%-2.5rem)] flex-row pl-4 my-auto
                    text-gray-500 text-xs font-normal leading-[18px]'
                  >
                    Value
                  </div>
                  <div
                    className='flex w-10 flex-row pl-2 my-auto
                    text-gray-500 text-xs font-normal leading-[18px]'
                  >
                    Info
                  </div>
                </div>
                <div
                  className='text-sm border bg-primary-foreground shadow-sm
                    relative w-full border-t-0 min-w-[450px] border-gray-200'
                >
                  {Object.entries(groupedPaths).map(([header, _paths]) => (
                    <div key={header}>
                      {header !== '' && (
                        <div
                          className='flex text-gray-900 text-sm h-10
                      font-normal leading-tight border-b bg-primary-foreground'
                        >
                          <div className='flex w-[50%] flex-row'>
                            <span className='content-center font-bold ml-7'>
                              {convertToTitleCase(header)}
                            </span>
                          </div>
                          {header === 'materialAttributes' ? (
                            <div className='border-l flex w-[calc(50%-2.5rem)] p-2 items-center'>
                              <Chip
                                variant='bordered'
                                color='default'
                                className='-z-1 relative mt-auto mb-auto pr-1 px-0
                              text-center text-xs font-medium h-[22px] mr-auto'
                                classNames={{
                                  base: 'border-[1.5px] border-gray-600',
                                  content: 'font-medium text-xs text-gray-700',
                                }}
                              >
                                Array ({(groupedPaths.materialAttributes).length})
                              </Chip>
                              <DocumentAddObjectModal
                                handleAddObject={handleAddObjectTask}
                                groupedPaths={groupedPaths}
                                containerRef={containerRef}
                                control={control as any}
                                currentStep={currentStep}
                                handleResetField={handleResetField}
                                handleDiscardObject={handleDiscardObjectTask}
                              />
                            </div>
                          ) : (
                            <div className='border-l flex flex-row w-[calc(50%-2.5rem)] p-2'>
                              <Chip
                                variant='bordered'
                                color='default'
                                className='-z-1 relative mt-auto mb-auto pr-1 px-0
                                    text-center text-xs font-medium h-[22px] mr-auto'
                                classNames={{
                                  base: 'border-[1.5px] border-gray-600',
                                  content: 'font-medium text-xs text-gray-700',
                                }}
                              >
                                object
                              </Chip>
                            </div>
                          )}
                          <div className='w-10 flex justify-center items-center border-l-1'></div>
                        </div>
                      )}
                      {(_paths as []).every((path) => typeof path === 'string')
                        ? (_paths as string[]).map((path) => {
                          const pathData = flatJson.find(
                            (item: DigitalData) => item.path === path,
                          );
                          return formInputReturn(pathData, path);
                        })
                        : Object.entries(_paths as []).map(([, _paths2]) => {
                          const materialHeader: string[] = [];
                          const pathArr = [];
                          Object.keys(_paths2).forEach((key) => {
                            pathArr.push(_paths2[key]);
                            materialHeader.push(key);
                          });
                          return (
                            <div key={materialHeader[0]}>
                              {materialHeader[0] !== '' && (
                                <div
                                  className='flex text-gray-900 text-sm h-10
                                    font-normal leading-tight border-b bg-primary-foreground'
                                >
                                  <div className='flex w-[50%] flex-row'>
                                    <span className='content-center font-medium ml-8'>
                                      <PathArrowIcon />{' '}
                                      {convertToTitleCase(materialHeader[0])}{' '}
                                    </span>
                                  </div>
                                  <div className='border-l flex flex-row w-[calc(50%-2.5rem)] p-2 items-center'>
                                    <Chip
                                      variant='bordered'
                                      color='default'
                                      className='-z-1 relative mt-auto mb-auto pr-1 px-0
                                          text-center text-xs font-medium h-[22px] mr-auto'
                                      classNames={{
                                        base: 'border-[1.5px] border-gray-600',
                                        content:
                                            'font-medium text-xs text-gray-700',
                                      }}
                                    >
                                        object
                                    </Chip>
                                  </div>
                                  <div className='w-10 flex justify-center items-center border-l-1'></div>
                                </div>
                              )}
                              {(pathArr[0] as string[]).map((path, index) => {
                                const pathData = findItemFn(flatJson, path);
                                if (!pathData) return null;
                                return formInputReturn(pathData, path);
                              })}
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className='h-[66px] flex pl-6 pr-4 py-4 bg-primary-foreground  border-gray-200
                  justify-end items-center gap-2 rounded-bl-lg rounded-br-lg border-2 border-t-1'
              >
                <span className='text-gray-600 text-sm font-medium leading-tight'>
                  {Object.keys(flatten(dirtyFields)).length} Edited Fields
                </span>
                <div className='ml-auto flex gap-2'>
                  <div>
                    <DocumentRejectionModal
                      fileName={fileName}
                      nextDocId={nextId}
                    />
                  </div>
                  <div>
                    <DocumentApprovalModal
                      onSubmit={handleSubmit(onSubmit)}
                      nextId={nextId}
                      numberOfEdits={Object.keys(flatten(dirtyFields)).length}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div
            className={`${
              currentStep === 0
                ? 'absolute block inset-0 rounded-tl-none rounded-tr-none opacity-40 rounded bg-gray-900 z-10'
                : ''
            }`}
          ></div>
        </div>
        <div className={`${tableView ? 'hidden' : ''}`}>
          <ExtractedDataJson data={json} />
        </div>
      </div>
    );
  },
);

ExtractedDataForm.displayName = 'ExtractedDataForm';
