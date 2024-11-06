'use client';

import React, { FC, useMemo, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';

import { handleJsonDownload } from '@/app/documents/_components/JsonDownload';
import DocumentReportIssueModal from '@/app/documents/_modals/DocumentReportIssueModal';
import DocumentZoomController from '@/components/OriginalDocumentViewer/DocumentZoomController';
import { HighlightRegionCtx } from '@/components/OriginalDocumentViewer/HighLightRegionCtx';
import DownloadIcon from '@/icons/DownloadIcon';
import FragmentIcon from '@/icons/FragmentIcon';
import RedFlagIssueIcon from '@/icons/RedFlagIssueIcon';
import VerticalEllipsisIcon from '@/icons/VerticalEllipsisIcon';
import { DigitalData } from '@/types/DigitalData.schema';
import { Digitalization } from '@/types/Digitalization.schema';

import { ExtractedDataForm } from './ExtractedDataForm';

export const DualDocumentContainer: FC<{
  jsonData: Digitalization;
  data: Digitalization;
  nextId: string;
  currentId: string;
  flattenJson: DigitalData[];
  currentFile: string;
  materials: Array<{
    id: string;
    name: string;
  }>;
  vendors: Array<{
    id: string;
    name: string;
  }>;
}> = ({
  jsonData,
  data,
  nextId,
  flattenJson,
  currentId,
  currentFile,
  materials,
  vendors,
}) => {
  const [heighLightIndex, setHeighLightIndex] = useState<number>(0);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [isTableView, setIsTableView] = useState(true);
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  const reportIssueModal = useDisclosure();

  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  const value = useMemo(
    () => ({
      visible: visibility,
      setVisibility,
      index: heighLightIndex,
      setIndex: (i: number) => {
        setHeighLightIndex(i);
      },
    }),
    [visibility, heighLightIndex],
  );

  return (
    <div className="flex h-full max-h-fit flex-col gap-0 xl:flex-row px-6">
      <HighlightRegionCtx.Provider value={value}>
        <div className="flex-1 h-1/2 xl:h-auto max-w-full xl:max-w-[50%] xl:pr-2 min-w-[400px]">
          <div>
            <div className="relative">
              <div
                className={`flex items-center py-2 px-6 pr-4 rounded-tl-lg rounded-tr-lg border border-gray-200
                   bg-primary-foreground border-b-none justify-between max-w-full overflow-x-auto 
                    ${isBlurred ? 'blur-sm pointer-events-none' : ''}`}
              >
                <h2 className="text-gray-900 text-sm font-semibold leading-tight mr-3">
                  Extracted Data
                </h2>
                <div
                  className="w-auto h-[22px] mr-auto px-2 py-0.5 mix-blend-multiply
                 bg-red-50 rounded-2xl border border-red-200 justify-start items-center inline-flex"
                >
                  <span className="text-center text-red-700 text-xs font-medium">
                    Edit Mode
                  </span>
                </div>
                <div className="flex">
                  <div className='flex items-center justify-start'>
                    <Button
                      className={`ml-2 bg-primary-foreground border-none hover:bg-primary-200
                      hover:bg-opacity-50 min-w-5 h-6 px-0 rounded-none
                      hover:cursor-pointer`}
                      onClick={() => {
                        handleJsonDownload(currentId);
                      }}
                      data-testid="download-json-button"
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
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="px-2.5 mx-2 border-none hover:bg-primary-200 hover:bg-opacity-50 min-w-5 h-6"
                      >
                        <span
                          className="sr-only"
                          data-testid="more-options-button"
                        >
                          Options
                        </span>
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
                        className="hover:cursor-pointer"
                        onClick={() => setIsTableView(!isTableView)}
                        textValue={isTableView ? 'Raw JSON' : 'Table'}
                      >
                        <div className=" flex items-center justify-start">
                          <FragmentIcon />
                          <span className="ml-2 text-gray-700 text-sm font-medium leading-tight">
                            {isTableView ? 'Raw JSON' : 'Table'}
                          </span>
                        </div>
                      </DropdownItem>
                      <DropdownItem
                        key="reportIssueModal"
                        textValue="Report Issue"
                      >
                        <div className=" flex items-center justify-start">
                          <RedFlagIssueIcon />
                          <span className="ml-2 text-red-700 text-sm font-medium leading-tight">
                            Report Issue
                          </span>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <DocumentReportIssueModal disclosure={reportIssueModal} />
              </div>
              {isBlurred && (
                <div className="absolute inset-0 bg-gray-900 rounded rounded-bl-none rounded-br-none opacity-40"></div>
              )}
            </div>
            <div>
              <div>
                <ExtractedDataForm
                  data={jsonData}
                  nextId={nextId}
                  currentId={currentId}
                  flattenJson={flattenJson}
                  tableView={isTableView}
                  originalCreatedAt={data.createdAt}
                  currentFile={currentFile}
                  toggleBlur={toggleBlur}
                  materials={materials}
                  vendors={vendors}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-1/2 xl:h-auto max-w-full pt-5 xl:pt-0 xl:max-w-[50%] xl:pl-2 min-w-[400px]">
          <DocumentZoomController
            data={data}
            id={currentId}
            pdfFile={data.file.url}
          />
        </div>
      </HighlightRegionCtx.Provider>
    </div>
  );
};
