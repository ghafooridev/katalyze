import { Chip, Tooltip } from '@nextui-org/react';

export const MultipleChips = ({ chipData, width }) => {
  const chipStyle = { base: 'border-[1.5px] border-gray-600', content: 'font-medium text-xs text-gray-700' };
  return (
    <Tooltip showArrow={true} color="foreground"
      classNames={{ content: 'py-2 pt-3 pb-2' }}
      content={chipData.map((item) => (
        <Chip size='sm' variant='bordered' className='w-[100px]' key={item.id ? item.id : item.name}>
          <p className='font-medium truncate text-white'>{item.name}</p>
        </Chip>
      ))}>
      <div className="flex flex-row gap-1">
        <Chip classNames={chipStyle} size='sm' variant='bordered'>
          <p className={'font-medium truncate '}
            style={{ maxWidth: `${chipData[0].name.length > 10 && `${width}px`}` }}
          >{chipData[0].name}</p>
        </Chip>
        <Chip classNames={chipStyle} size='sm' variant='bordered' className=''>
          <p>+{chipData.length - 1}</p>
        </Chip></div>
    </Tooltip>
  );
};

export const SingleChip = ({ chipData, width }) => {
  const chipStyle = { base: 'border-[1.5px] border-gray-600', content: 'font-medium text-xs text-gray-700' };

  if (chipData.length > 14) {
    return (
      <Tooltip showArrow={true} color="foreground"
        classNames={{ content: 'py-2 pt-3 pb-2' }}
        content={
          <Chip size='sm' variant='bordered' className='p-1'>
            <p className='font-medium text-white'>{chipData}</p>
          </Chip>
        }>
        <Chip classNames={chipStyle} size='sm' variant='bordered'>
          <p className={'font-medium truncate'} style={{ maxWidth: `${width}px` }}>{chipData}</p>
        </Chip>
      </Tooltip>
    );
  }
  return (
    <Chip classNames={chipStyle} size='sm' variant='bordered' className='w-full'>
      <p className='font-medium'>{chipData}</p>
    </Chip>
  );
};
