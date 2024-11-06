import React, { useEffect, useRef, useState } from 'react';
import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { flatten } from 'flat';

import FormInput from '@/app/documents/_components/FormInput';
import { handleJsonDownload } from '@/app/documents/_components/JsonDownload';
import DocumentAddObjectModal from '@/app/documents/_modals/DocumentAddObjectModal';
import DocumentCancelModal from '@/app/documents/_modals/DocumentCancelModal';
import DocumentConfirmEditModal from '@/app/documents/_modals/DocumentConfirmEditModal';
import DocumentReportIssueModal from '@/app/documents/_modals/DocumentReportIssueModal';
import {
  approveEditsDocument,
} from '@/app/documents/_services';
import { ExtractedDataJson } from '@/components/ExtractedData/ExtractedDataJson';
import DownloadIcon from '@/icons/DownloadIcon';
import EditFormIcon from '@/icons/EditFormIcon';
import FragmentIcon from '@/icons/FragmentIcon';
import PathArrowIcon from '@/icons/PathArrowIcon';
import RedFlagIssueIcon from '@/icons/RedFlagIssueIcon';
import VerticalEllipsisIcon from '@/icons/VerticalEllipsisIcon';
import { convertToTitleCase, updateGroupedPaths } from '@/lib/utils';
import { DigitalData } from '@/types/DigitalData.schema';
import { Digitalization } from '@/types/Digitalization.schema';

interface Props {
  jsonData: Digitalization['json'];
  flattenJson: DigitalData[];
  currentId: string;
  originalCreatedAt: string;
}

type FormValues = Record<string, any>;

export const ExtractedDataForm: React.FC<Props> = ({
  jsonData,
  flattenJson,
  currentId,
  originalCreatedAt,
}) => {
  const {
    handleSubmit,
    control,
    formState: { dirtyFields },
    reset,
    resetField,
    setValue,
  } = useForm({
    defaultValues: jsonData as FormValues,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTableView, setIsTableView] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [inputPaths, setInputPaths] = useState<string[]>(Object.keys(flatten(jsonData)));
  const [flatJson, setFlatJson] = useState<DigitalData[]>(flattenJson);
  const reportIssueModal = useDisclosure();
  const enterEditMode = () => {
    setIsTableView(true);
    setInputPaths(Object.keys(flatten(jsonData)));
    setIsEditing((prevEditing) => !prevEditing);
    reset(jsonData);
  };

  const exitEditMode = () => {
    setInputPaths(Object.keys(flatten(jsonData)));
    setIsEditing(false);
  };

  const handleResetField = (path, originalValue) => {
    resetField(path, { defaultValue: originalValue });
  };

  const groupedPaths: Record<string, string[] | { [key: string]: string[] }[] | undefined> = {};
  updateGroupedPaths(inputPaths, groupedPaths);
  useEffect(() => { updateGroupedPaths(inputPaths, groupedPaths); }, [inputPaths]);

  const groupMaterialAttributes = () => {
    const materialAttributes = Object.keys(groupedPaths).filter((key) => key.startsWith('materialAttributes'));
    const materialAttributesArray = materialAttributes.map((key) => ({
      [key]: groupedPaths[key],
    }));
    materialAttributes.forEach((key) => {
      delete groupedPaths[key];
    });
    groupedPaths.materialAttributes = materialAttributesArray as { [key: string]: string[] }[];
  };
  groupMaterialAttributes();

  const findItem = (flatJsonData: DigitalData[], path: string) => flatJsonData.find(
    (item: DigitalData) => item.path === path,
  );

  const handleDiscardObject = (newMaterialAttribute: string[]) => {
    newMaterialAttribute.forEach((path: string) => {
      resetField(path, { keepDirty: false });
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const flat = flatten(formData);
    const edited = Object.keys(flatten(dirtyFields)).map((path) => ({
      path,
      value: (flat as FormValues)[path] || '',
    }));
    await approveEditsDocument(currentId, edited);
    window.location.reload();
    exitEditMode();
  };

  const handleAddObject = (newMaterialAttribute: string[], newDigitalDataArr: DigitalData[]) => {
    setInputPaths((prevInputPaths) => [...prevInputPaths, ...Object.values(newMaterialAttribute)]);
    setFlatJson((prev) => [...prev, ...newDigitalDataArr]);

    newMaterialAttribute.forEach((path: string) => {
      if (Object.keys(flatten(dirtyFields)).map((_path) => _path).includes(path)) return;
      setValue(path, '', { shouldDirty: true });
    });
  };

  return (
    <div>
      <div
        className="flex items-center py-2 px-6 pr-4 rounded-tl-lg rounded-tr-lg
       border bg-primary-foreground border-b-none justify-between max-w-full overflow-x-auto"
      >
        <h2 data-testid='header-title'
          className="text-gray-900 text-sm font-semibold leading-tight mr-3">
          Extracted Data
        </h2>
        {isEditing ? (
          <div
            className="w-auto h-[22px] mr-auto px-2 py-0.5 mix-blend-multiply
           bg-red-50 rounded-2xl border border-red-200 justify-start items-center inline-flex"
          >
            <span className="text-center text-red-700 text-xs font-medium" data-testid='edit-mode-text'>
              Edit Mode
            </span>
          </div>
        ) : (
          ''
        )}
        <div className="flex">
          <div className='flex items-center justify-start'>
            <Button
              className={`ml-2 bg-primary-foreground border-none hover:bg-primary-200
              hover:bg-opacity-50 min-w-5 h-6 px-0 rounded-none
              hover:cursor-pointer`}
              onClick={() => {
                handleJsonDownload(currentId);
              }}
              data-testid='download-button'
            >
              <Tooltip content={'download'} color={'foreground'} delay={0} closeDelay={0} >
                <div className=" flex items-center justify-start px-2.5">
                  <div><DownloadIcon /></div>
                  <span className="sr-only">
                    Download
                  </span>
                </div>
              </Tooltip>

            </Button>
          </div>
          <div className='flex items-center justify-start'>
            <Button
              onClick={enterEditMode}
              className={`ml-2 bg-primary-foreground border-none hover:bg-primary-200
              hover:bg-opacity-50 min-w-5 h-6 px-0 rounded-none
              hover:cursor-pointer ${isEditing ? 'hidden' : ''}`}
              data-testid='edit-button'
            >
              <Tooltip content={'edit mode'} color={'foreground'} delay={0} closeDelay={0} >
                <div className=" flex items-center justify-start px-2.5">
                  <div><EditFormIcon /></div>
                  <span className="sr-only">
                    Edit mode
                  </span>
                </div>
              </Tooltip>
            </Button>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="px-2.5 mx-2 border-none hover:bg-primary-200 hover:bg-opacity-50 min-w-5 h-6"
                data-testid='more-options-button'
              >
                <span className="sr-only">More options</span>
                <VerticalEllipsisIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              className="flex-col flex"
              onAction={(key) => {
                if (key === 'reportIssueModal') {
                  reportIssueModal.onOpen();
                }
              }}
            >
              <DropdownItem
                className={`hover:cursor-pointer ${isEditing ? 'hidden' : ''}`}
                onClick={() => {
                  setIsTableView(!isTableView);
                  exitEditMode();
                }}
                data-testid='toggle-view-button'
              >
                <div className=" flex items-center justify-start">
                  <FragmentIcon />
                  <span className="ml-2 text-gray-700 text-sm font-medium leading-tight" data-testid='tableview-text'>
                    {isTableView ? 'Raw JSON' : 'Table View'}
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem key="reportIssueModal" textValue='Report Issue' data-testid='report-issue'>
                <div className=" flex items-center justify-start">
                  <RedFlagIssueIcon />
                  <span className="ml-2 text-red-700 text-sm font-medium leading-tight">
                    Report Issue
                  </span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <DocumentReportIssueModal disclosure={reportIssueModal} />
        </div>
      </div>

      {isTableView ? (
        <div className="relative">
          <div ref={containerRef} />
          <form className="max-w-screen-lg" onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`h-[35vh] min-h-[439px] ${isEditing
                ? 'xl:h-[652px] border-b-1 min-h-[379px]'
                : 'xl:h-[716px] rounded-bl-lg rounded-br-lg border-b-2'}
                overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 border`}
            >
              <div
                className=" shadow-sm  sticky
             top-0 z-30 py-2 px-0 text-left align-middle  bg-gray-50
              font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 flex  border-b border-gray-200 "
              >
                <div
                  className="flex w-[50%] flex-row pl-7 my-auto
               text-gray-500 text-xs font-normal leading-[18px]"
                >
                  Property
                </div>
                <div
                  className="flex w-[calc(50%-2.5rem)] flex-row pl-4 my-auto
               text-gray-500 text-xs font-normal leading-[18px]"
                >
                  Value
                </div>
                <div
                  className="flex w-10 flex-row pl-2 my-auto
               text-gray-500 text-xs font-normal leading-[18px]"
                >
                  Info
                </div>
              </div>
              <div
                className="text-sm rounded-bl-lg rounded-br-lg
              border-0 bg-primary-foreground shadow-sm relative w-full border-t-0 min-w-[450px]"
              >
                {Object.entries(groupedPaths).map(([header, _paths]) => (
                  <div key={header}>
                    {header !== '' && (
                      <div
                        className="flex text-gray-900 text-sm h-10
                      font-normal leading-tight border-b bg-primary-foreground"
                      >
                        <div className="flex w-[50%] flex-row">
                          <span className="content-center font-bold ml-7">
                            {convertToTitleCase(header)}{' '}
                          </span>
                        </div>
                        {header === 'materialAttributes' ? (
                          <div className="border-l flex flex-row w-[calc(50%-2.5rem)] p-2">
                            <Chip variant='bordered' color='default'
                              className="-z-1 relative mt-auto mb-auto pr-1 px-0
                          text-center text-xs font-medium h-[22px] mr-auto"
                              classNames={{
                                base: 'border-[1.5px] border-gray-600',
                                content: 'font-medium text-xs text-gray-700',
                              }}>
                              Array ({(groupedPaths.materialAttributes || []).length})
                            </Chip>
                            {isEditing && (
                              <DocumentAddObjectModal
                                handleAddObject={handleAddObject}
                                groupedPaths={groupedPaths}
                                containerRef={containerRef}
                                control={control as any}
                                handleResetField={handleResetField}
                                handleDiscardObject={handleDiscardObject}
                              />
                            )}
                          </div>
                        )
                          : (
                            <div className="border-l flex flex-row items-center w-[calc(50%-2.5rem)] p-2">
                              <Chip variant='bordered' color='default'
                                className="-z-1 relative mt-auto mb-auto pr-1 px-0
                            text-center text-xs font-medium h-[22px] mr-auto"
                                classNames={{
                                  base: 'border-[1.5px] border-gray-600',
                                  content: 'font-medium text-xs text-gray-700',
                                }}>
                                object
                              </Chip>
                            </div>
                          )}
                        <div className="w-10 flex justify-center items-center border-l-1"></div>
                      </div>
                    )}
                    {(_paths as []).every((path) => typeof path === 'string')
                      ? (
                        (_paths as string[]).map((path, index) => {
                          const pathData = flatJson.find(
                            (item: DigitalData) => item.path === path,
                          );
                          if (!pathData) return null;
                          return (
                            <FormInput
                              key={path}
                              index={index}
                              control={control as any}
                              name={path}
                              pathData={pathData}
                              isEditing={isEditing}
                              originalCreatedAt={originalCreatedAt}
                              handleResetField={handleResetField}
                            />
                          );
                        })
                      )
                      : (Object.entries(_paths as []).map(([, _paths2]) => {
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
                                className="flex text-gray-900 text-sm h-10
                                font-normal leading-tight border-b bg-primary-foreground"
                              >
                                <div className="flex w-[50%] flex-row">
                                  <span className="content-center font-medium ml-8">
                                    <PathArrowIcon /> {convertToTitleCase(materialHeader[0])}{' '}
                                  </span>
                                </div>
                                <div className="border-l flex flex-row w-[calc(50%-2.5rem)] p-2 items-center">
                                  <Chip variant='bordered' color='default'
                                    className="-z-1 relative mt-auto mb-auto pr-1 px-0
                                  text-center text-xs font-medium h-[22px] mr-auto"
                                    classNames={{
                                      base: 'border-[1.5px] border-gray-600',
                                      content: 'font-medium text-xs text-gray-700',
                                    }}>
                                    object
                                  </Chip>
                                </div>
                                <div className="w-10 flex justify-center items-center border-l-1"></div>
                              </div>)}
                            {(pathArr[0] as string[]).map((path, index) => {
                              const pathData = findItem(flatJson, path);
                              if (!pathData) return null;
                              return (
                                <FormInput
                                  key={path}
                                  index={index}
                                  control={control as any}
                                  name={path}
                                  pathData={pathData}
                                  isEditing={isEditing}
                                  originalCreatedAt={originalCreatedAt}
                                  handleResetField={handleResetField}
                                />
                              );
                            })}
                          </div>
                        );
                      }))

                    }
                  </div>
                ))}
              </div>
            </div>
            {isEditing ? (
              <div
                className="h-[66px] flex pl-6 pr-4 py-4 bg-primary-foreground  border-gray-200
             justify-end items-center gap-2 rounded-bl-lg rounded-br-lg border-2 border-t-0"
              >
                <span className="text-gray-600 text-sm font-medium leading-tight">
                  {Object.keys(flatten(dirtyFields)).length} Edited Fields
                </span>
                <div className="ml-auto flex gap-2">
                  <div>
                    <DocumentCancelModal
                      onCancel={() => {
                        setInputPaths(Object.keys(flatten(jsonData)));
                        reset(jsonData);
                        exitEditMode();
                      }}
                      numberOfEdits={Object.keys(flatten(dirtyFields)).length}
                      data-testid='discard-button'
                    />
                  </div>
                  <div>
                    <DocumentConfirmEditModal
                      onConfirm={handleSubmit(onSubmit)}
                      numberOfEdits={Object.keys(flatten(dirtyFields)).length}
                      data-testid='save-edit-button'
                    />
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </form>
        </div>
      ) : (
        <ExtractedDataJson data={jsonData} />
      )}
    </div>
  );
};
