'use client';

import React, { useContext } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { Button, Checkbox, Tooltip } from '@nextui-org/react';

import { HighlightRegionCtx } from '@/components/OriginalDocumentViewer/HighLightRegionCtx';
import FormToolTip from '@/components/Tooltip/FormToolTip';
import CoordinateIcon from '@/icons/CoordinateIcon';
import FlipBackwardUndoIcon from '@/icons/FlipBackwardUndoIcon';
import PathArrowIcon from '@/icons/PathArrowIcon';
import { convertToTitleCase } from '@/lib/utils';
import { DigitalData } from '@/types/DigitalData.schema';

type FormValues = Record<string, any>;

interface FormInputProps extends UseControllerProps<FormValues> {
  index: number;
  pathData: DigitalData;
  originalCreatedAt: string;
  checkbox?: boolean;
  currentStep?: number;
  handleResetField: (path: string, originalValue: any) => void;
  materials?: Array<{
    id: string;
    name: string;
  }>;
  vendors?: Array<{
    id: string;
    name: string;
  }>;
  onCheckboxChange?: (path: string, checked: boolean) => void;
  isDirty?: boolean;
  isEditing?: boolean;
  disableAllFields?: boolean;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const {
    field: { value, ...field },
    fieldState,
  } = useController(props);

  const pathLength = props.name.split('.').length - 1;
  const indentationClass = pathLength === 1 ? `ml-${pathLength}` : 'ml-6';
  const propertyName = convertToTitleCase(props.name.split('.').pop());

  const handleUndoEdit = () => {
    props.handleResetField(props.pathData.path, props.pathData.value);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onCheckboxChange) {
      props.onCheckboxChange(props.name, e.target.checked);
    }
  };

  const renderUndoTooltip = () => (fieldState.isDirty && props.pathData.version !== -1 ? (
    <Tooltip
      showArrow={true}
      color="foreground"
      content={
        <span className="text-primary-foreground text-xs font-medium leading-[18px]">
            Undo Edit
        </span>
      }
    >
      <Button
        variant="bordered"
        className="absolute right-2 top-[9px] border-gray-300
          font-medium text-xs min-w-fit h-[22px] bg-primary-foreground px-1
          rounded-md shadow flex gap-1"
        onClick={handleUndoEdit}
        data-testid="undo-tooltip-button"
      >
        <FlipBackwardUndoIcon />
      </Button>
    </Tooltip>
  ) : (
    ''
  ));

  const renderCheckbox = () => {
    if (!props.checkbox) return null;
    return (
      <Checkbox
        onChange={handleCheckboxChange}
        size="sm"
        data-testid="checkbox"
        classNames={{
          wrapper: 'm-0 mx-auto',
          label: 'm-0 mx-auto w-10',
          base: 'm-0 mx-auto w-10',
          icon: '',
        }}
      />
    );
  };
  const renderFormToolTip = () => (
    <FormToolTip
      path={props.name}
      pathData={props.pathData}
      fieldStateIsDirty={props.isDirty || fieldState.isDirty}
      inputValue={value}
      isEditing={true}
      originalCreatedAt={props.originalCreatedAt}
      data-testid="form-tooltip"
    />
  );

  const {
    index: highLightIndex,
    setIndex,
    visible,
    setVisibility,
  } = useContext(HighlightRegionCtx);

  const onClickVisibility = () => {
    setIndex(props.index);
    if (props.index === highLightIndex && visible) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  };

  const isDisabled = () => (props.name === 'batchInformation.vendorBatchID'
      && props.currentStep !== 0)
    || !props.isEditing
    || props.disableAllFields === true;

  if (!props.isEditing && !value) return null;
  return (
    <div
      className="flex text-gray-900 text-sm h-10
    font-normal leading-tight border-b border-gray-200"
    >
      <div
        data-testid="checkbox-label-style"
        className={`flex w-[50%] ${props.checkbox ? 'font-bold' : ''}  flex-row`}
      >
        {Object.values(props.pathData.region).some((val) => val !== 0)
          ? <button
            type="button"
            data-testid="visibility-button"
            className="z-10 relative mt-auto mb-auto px-1 flex justify-center content-center hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onClickVisibility();
            }}
          >
            <CoordinateIcon />
          </button> : <div data-testid="empty-space" className="w-[27px]"></div> }
        <label
          data-testid="input-label"
          className={`content-center ${indentationClass}`}
        >
          {props.checkbox || !pathLength ? '' : <PathArrowIcon />}{' '}
          {propertyName}{' '}
        </label>
      </div>
      <div className="border-l flex flex-row w-[50%]">
        <div className={'border-gray-200 flex flex-row w-[calc(100%-2.5rem)]'}>
          <div className="w-full relative">
            <input
              className={`w-full min-h-fit p-2 py-[9.5px] bg-transparent bg-primary-foreground
            border-none border-transparent focus:outline-none font-sans text-sm
            focus:text-gray-900 focus-within:border focus-visible:border text-gray-700
            focus-visible:box-shadow-md focus:bg-primary-50
            ${fieldState.isDirty ? 'bg-primary-foreground text-primary-700 pr-9' : 'text-gray-700'}
            `}
              value={value ?? ''}
              {...field}
              title={value}
              disabled={isDisabled()}
              data-testid="input-field"
            />
            {renderUndoTooltip()}
          </div>
        </div>
        <div className="w-[40px] flex justify-center items-center border-l">
          {props.checkbox ? renderCheckbox() : renderFormToolTip()}
        </div>
      </div>
    </div>
  );
};

FormInput.displayName = 'FormInput';
export default FormInput;
