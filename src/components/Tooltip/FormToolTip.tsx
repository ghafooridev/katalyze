import React, { useState } from 'react';
import { Chip, Tooltip } from '@nextui-org/react';
import { useParams } from 'next/navigation';

import { getDocumentEditsById } from '@/app/documents/_services';
import ConfidenceCheckMarkIcon from '@/icons/ConfidenceCheckMarkIcon';
import ConfidenceFlaggedIcon from '@/icons/ConfidenceFlaggedIcon';
import ConfidenceLowIcon from '@/icons/ConfidenceLowIcon';
import EditInputIcon from '@/icons/EditInputIcon';
import UserEditInputIcon from '@/icons/UserEditInputIcon';
import { DigitalData } from '@/types/DigitalData.schema';
import { EditPathEvent } from '@/types/EditPathEvent.schema';

interface Props {
  path: string;
  pathData: DigitalData;
  fieldStateIsDirty: boolean;
  inputValue: string | number | null;
  isEditing: boolean;
  originalCreatedAt: string;
}

export const TooltipMultipleVersion = ({
  edits,
  flagReasons,
  version,
  isDirty,
}: {
  edits: EditPathEvent[];
  flagReasons?: string;
  version: number;
  isDirty: boolean;
}) => {
  const hasValue = edits.some((edit) => edit.value !== null && edit.value !== '');
  return (
    <div data-testid='tooltip-multiple-version' className='w-full'>
      <ul className='flex flex-col gap-2 justify-between list-disc list-inside'>
        {edits.map((edit, index) => (
          <div key={edit.id} className='flex'>
            <div className='flex'>
              <li className='max-w-[15px]'></li>
              <div className='inline-block w-auto'>
                <span
                  className={`text-xs font-semibold leading-[18px] 
              ${index === 0 ? 'text-[#d6bbfb]' : 'text-gray-300'}`}
                >
                  {edit.value}
                </span>{' '}
              </div>
            </div>
            <div className='text-xs text-right leading-[18px] text-primary-foreground ml-auto'>
              <span className='inline-block text-right text-xxs font-normal leading-[18px] mr-2'>
                {edit.createdBy}
              </span>
              <span
                className={`text-right text-xxs font-semibold leading-[18px] min-w-[50px] 
            ${index === 0 ? '' : 'text-gray-300'}`}
              >
                {edit.createdAt
                  ? new Date(edit.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })
                  : ''}
              </span>
            </div>
          </div>
        ))}
      </ul>
      <div className='border-t border-gray-300 my-2'></div>
      <div className='flex flex-row gap-2 justify-between items-center'>
        <span className='text-right text-primary-foreground text-xxs font-normal leading-[18px]'>
        Initial Confidence level:
        </span>
        {hasValue && (!flagReasons || flagReasons.length === 0) ? (
          <Chip
            variant='bordered'
            color='success'
            classNames={{
              base: 'border-success-300 h-5',
              content: 'px-0',
            }}
          >
            <div className='flex gap-1 justify-between items-center'>
              <ConfidenceCheckMarkIcon />
              <span className='text-center text-success-300 text-xs font-medium leading-[18px]'>
              OK
              </span>
            </div>
          </Chip>
        ) : (
          <Chip
            variant='bordered'
            color='danger'
            classNames={{
              base: 'border-red-300 h-5',
              content: 'px-0',
            }}
          >
            <div className='flex gap-1 justify-between items-center'>
              <ConfidenceFlaggedIcon />
              <span className='text-center text-red-300 text-xs font-medium leading-[18px]'>
              Flagged
              </span>
            </div>
          </Chip>
        )}
      </div>
    </div>
  );
};

const FormTooltip: React.FC<Props> = ({
  path,
  pathData,
  fieldStateIsDirty,
  inputValue,
}) => {
  const { id } = useParams<{ id: string }>();
  const [edits, setEdits] = useState<EditPathEvent[]>([]);
  const userEdits: EditPathEvent = {
    value: inputValue,
    createdBy: '',
    createdAt: new Date().toISOString(),
    id: Number(id),
    version: 1,
  };

  const renderTooltipContent = (icon: JSX.Element) => (
    <Tooltip
      delay={50}
      onOpenChange={async () => {
        const data = await getDocumentEditsById(id, path);
        setEdits(data);
      }}
      color={'foreground'}
      placement={'right'}
      showArrow={true}
      classNames={{
        base: 'w-[273px]',
        content: 'p-3 py-3 px-3',
      }}
      content={
        <TooltipMultipleVersion
          edits={fieldStateIsDirty ? [userEdits, ...edits] : edits}
          flagReasons={pathData.flagReasons}
          version={pathData.version}
          isDirty={fieldStateIsDirty}
        />
      }
    >
      <span>{icon}</span>
    </Tooltip>
  );

  const renderTooltip = () => {
    if (pathData.version === 0) {
      return (
        pathData.flagReasons
        && pathData.flagReasons.length > 0
        && renderTooltipContent(<ConfidenceLowIcon />)
      );
    }
    return renderTooltipContent(<EditInputIcon />);
  };

  return (
    <div className='flex justify-center '>
      {fieldStateIsDirty ? (
        <Tooltip
          delay={50}
          onOpenChange={async () => {
            const data = await getDocumentEditsById(id, path);
            setEdits(data);
          }}
          color={'foreground'}
          placement={'right'}
          showArrow={true}
          classNames={{
            base: 'w-[273px]',
            content: 'p-3 py-3 px-3',
          }}
          content={
            <TooltipMultipleVersion
              edits={[userEdits, ...edits]}
              flagReasons={pathData.flagReasons}
              version={pathData.version}
              isDirty={fieldStateIsDirty}
            />
          }
        >
          <span data-testid='edit-input-icon'>
            <UserEditInputIcon />
          </span>
        </Tooltip>
      ) : (
        renderTooltip()
      )}
    </div>
  );
};
FormTooltip.displayName = 'FormTooltip';

export default FormTooltip;
