'use client';

import { FC, useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  Card, CardBody,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import Breadcrumb from '@/components/BreadCrumb';
import DocumentZoomController from '@/components/OriginalDocumentViewer/DocumentZoomController';
import CertificateNavbar from '@/icons/CertificateNavbar';
import CharacteristicsIcon from '@/icons/CharacteristicsNavbar';
import {
  BatchCharacteristic, MaterialBatch, MaterialMetaData,
} from '@/types/RawMaterial';

import {
  getBatchCharacteristics, getMaterialBatchesById, getMaterialById, getMaterialSelector,
} from '../../_services';

import BatchCoa from './_components/batch-coa';
import BatchDetail from './_components/batch-detail';
import BatchInformation from './_components/batch-information';

const BatchCharacteristics: FC<{ params: { batchId: string, materialId: string } }> = ({
  params,
}) => {
  const LINKS = [
    {
      title: 'Characteristics',
      label: '',
      path: '/raw-materials/overview',
      icon: <CharacteristicsIcon />,
    },
    {
      title: 'Certificate of Analysis',
      label: '',
      path: '/raw-materials/browsing-materials',
      icon: <CertificateNavbar />,
    },
  ];

  const router = useRouter();

  const { batchId, materialId } = params;
  const [batchInfo, setBatchInfo] = useState<BatchCharacteristic>();
  const [materialSelector, setMaterialSelector] = useState<{ id: string; name: string }[]>();
  const [batchSelector, setBatchSelector] = useState<MaterialBatch[]>();
  const [currentField, setCurrentField] = useState<'material' | 'batchId'>('material');

  const [selector, setSelector] = useState<{ material: string, batchId: string }>(
    { material: materialId, batchId },
  );
  const [selectedView, setSelectedView] = useState<string>('Characteristics');
  const pdfDocument = batchInfo?.document.url ?? '';
  const pdfName = batchInfo?.document.name ?? '';

  const getData = async () => {
    const response: BatchCharacteristic = await getBatchCharacteristics(materialId, batchId);
    setBatchInfo(response);
  };

  const getMaterialOptions = async () => {
    const response: MaterialMetaData = await getMaterialSelector();
    setMaterialSelector(response.materials);
  };

  const getBatchSelector = async () => {
    const response: MaterialBatch[] = await getMaterialBatchesById(params.materialId);
    setBatchSelector(response);
  };

  useEffect(() => {
    getData();
    getMaterialOptions();
    getBatchSelector();
  }, [selector]);

  const getMaterialName = async () => {
    const material = await getMaterialById(params.materialId);
    setSelector({ batchId: params.batchId, material: material.id });
  };

  useEffect(() => {
    getMaterialName();
  }, []);

  const onChangeSelector = (key: React.Key | null) => {
    if (!key) return;

    const value = key.toString();
    const newSelector = { ...selector, [currentField]: value };

    setSelector(newSelector);

    if (currentField === 'material') {
      getMaterialBatchesById(newSelector.material).then((batches) => {
        router.push(`/raw-materials/${newSelector.material}/${batches[0].batchId}`);
      });
    } else {
      router.push(`/raw-materials/${newSelector.material}/${newSelector.batchId}`);
    }
  };

  const handleToggleView = (view: string) => {
    setSelectedView(view);
  };

  const selectedMaterial = materialSelector?.find((mat) => mat.id === selector.material);

  return (
    <div className='flex flex-row h-full w-full bg-gray-200'>
      <div className='min-w-[264px] bg-white border-r border-gray-200 flex flex-col
        items-stretch justify-start min-h-[calc(100vh-60px)]'>
        <div className='w-[264px] bg-white border-r border-gray-200 flex-col  items-stretch justify-start h-full fixed'>
          <div className='flex flex-col gap-5 px-4 pt-6'>
            {materialSelector?.length && <Autocomplete
              name="material"
              variant="bordered"
              label="Select Raw Material"
              labelPlacement="outside"
              className="max-w-xs"
              defaultSelectedKey={selector.material}
              onSelectionChange={onChangeSelector}
              onFocus={() => setCurrentField('material')}
              isClearable={false}
              data-testid='material-selector'
            >
              {materialSelector.map((material) => (
                <AutocompleteItem key={material.id} value={material.name}
                  textValue={material.name}>
                  <div className='flex justify-between gap-2'>
                    <p className='truncate'> {material.name}</p>
                    <span className='text-gray-600'>{material.id}</span>
                  </div>
                </AutocompleteItem>
              ))}
            </Autocomplete>}

            {batchSelector?.length && <Autocomplete
              name="batchId"
              variant="bordered"
              label="Select Batch ID"
              labelPlacement="outside"
              className="max-w-xs"
              defaultSelectedKey={selector.batchId}
              onSelectionChange={onChangeSelector}
              onFocus={() => setCurrentField('batchId')}
              isClearable={false}
            >
              {batchSelector.map((batch) => (
                <AutocompleteItem key={batch.batchId} value={batch.batchId}>
                  {batch.batchId}
                </AutocompleteItem>))}
            </Autocomplete>}
            {LINKS.map((link) => (
              <button
                key={link.title}
                onClick={() => handleToggleView(link.title)}
                className={`h-12 p-3 rounded-md justify-start items-center gap-2 inline-flex
                ${selectedView === link.title ? 'bg-primary-100' : ''}`}
              >
                <div className="grow shrink basis-0 h-6 justify-start items-center gap-3 flex">
                  {link.icon}
                  <span
                    className={
                      `text-base font-semibold leading-normal flex justify-between items-center w-full
                      ${selectedView === link.title ? 'text-gray-900' : 'text-gray-700'}`
                    }
                  >
                    {link.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div >

      <div className='flex w-full bg-gray-200 flex-col items-stretch
      justify-start h-full  overflow-auto'>
        {selectedMaterial && <Breadcrumb
          path={['Raw Materials', selectedMaterial.name, selector.batchId]}
          urlPath={['raw materials', materialId, selector.batchId]}
        />}
        {selectedView === 'Characteristics' ? (
          <div className='flex gap-3 p-6 items-start flex-col lg:flex-row'>
            <Card className='min-w-full lg:min-w-[320px] h-full' >
              <CardBody className='p-0'>
                <BatchInformation item={batchInfo} />
              </CardBody>
            </Card>
            <Card className='w-full h-full'>
              <CardBody className='p-0'>
                <BatchDetail item={batchInfo?.specifications} />
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className='flex flex-col xl:flex-row gap-3 p-6'>
            <Card className='w-full xl:w-1/2 h-auto xl:h-full max-h-[778px] bg-gray-50'>
              <CardBody className='p-0 h-full'>
                <BatchCoa item={batchInfo?.specifications} pdfDocument={batchInfo?.document.url} />
              </CardBody>
            </Card>
            <Card className='w-full xl:w-1/2'>
              <CardBody className='p-0'>
                <DocumentZoomController
                  id={batchId}
                  pdfFile={pdfDocument}
                  isRM={true}
                  docName={pdfName}
                />
              </CardBody>
            </Card>
          </div>
        )}
      </div >
    </div>
  );
};

export default BatchCharacteristics;
