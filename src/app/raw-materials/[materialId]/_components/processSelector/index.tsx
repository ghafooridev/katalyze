import { FC, useEffect, useState } from 'react';
import {
  Select, SelectItem,
} from '@nextui-org/react';

import { getProcessDropDowns } from '@/app/raw-materials/_services';
import { MaterialProcessMetaData } from '@/types/RawMaterial';

export type ProcessType = {
  process: {
    process: string,
    product: string,
    site: string
    steps?:
    {
      name: string,
      uiName: string
    }[]
  },
  processStep: string
}

type ProcessSelectorProps = {
  onSelectProcess: (value: ProcessType) => void;
  materialId: string
}

const ProcessSelector: FC<ProcessSelectorProps> = (props) => {
  const { onSelectProcess, materialId } = props;
  const [values, setValues] = useState<ProcessType>(
    { process: { process: '', product: '', site: '' }, processStep: '' },
  );
  const [processes, setProcesses] = useState<MaterialProcessMetaData[]>();
  const [selectedProcessIndex, setSelectedProcessIndex] = useState<number | null>(null);

  const isProcessSelected = values.process.process.length && values.processStep.length;

  const getProcessesDropDowns = async () => {
    const response: MaterialProcessMetaData[] = await getProcessDropDowns(materialId);
    setProcesses(response);
  };

  const getProcessDetail = (value) => {
    const process = processes?.find((item) => item.process === value);
    if (process) return process;
    return null;
  };

  const onChangeFiled = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    if (value) {
      if (name === 'process') {
        const selectedProcess = getProcessDetail(value);
        const processIndex = processes?.findIndex((item) => item.process === value);
        setSelectedProcessIndex(processIndex ?? 0);
        setValues({ ...values, process: selectedProcess as MaterialProcessMetaData });
      } else {
        setValues({ ...values, [name]: value });
      }
    }
  };

  useEffect(() => {
    if (typeof onSelectProcess === 'function' && isProcessSelected) {
      onSelectProcess(values);
    }
  }, [values]);

  useEffect(() => {
    getProcessesDropDowns();
  }, []);

  return (
    <>
      {processes && <Select
        data-testid="ProcessSelect"
        name="process"
        id="ProcessSelect"
        variant="bordered"
        label="Process"
        className="w-full"
        defaultSelectedKeys={[values.process.process]}
        onChange={onChangeFiled}
      >
        {processes.map((item) => (
          <SelectItem key={item.process}>
            {`${item.uiProduct}( ${item.site} ${item.process} )`}
          </SelectItem>
        ))}
      </Select>}
      {processes && <Select
        data-testid="ProcessStepSelect"
        name="processStep"
        variant="bordered"
        label="Process Step"
        className="w-full"
        defaultSelectedKeys={[values.processStep]}
        onChange={onChangeFiled}
        isDisabled={typeof selectedProcessIndex !== 'number'}
      >
        {
          typeof selectedProcessIndex === 'number'
            ? processes[selectedProcessIndex].steps.map((step) => (
              <SelectItem key={step.uiName}>
                {step.uiName}
              </SelectItem>
            ))
            : []
        }
      </Select>}
    </>
  );
};

export default ProcessSelector;
