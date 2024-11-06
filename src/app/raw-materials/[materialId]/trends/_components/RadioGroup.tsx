import {
  Radio, RadioGroup,
} from '@nextui-org/react';

export type RadioGroupProps = {
    options: {
        value: string;
        label: string
    }[]
    label: string;
    color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined
    onChange: (value: string) => void,
    loading: boolean
}

const TrendsRadioGroup = (props: RadioGroupProps) => {
  const {
    options, label, color, onChange, loading,
  } = props;

  const onChangeRadio = (_value: string) => {
    onChange(_value);
  };

  return (
    <RadioGroup
      label={label}
      className='font-bold text-gray-900'
      size='sm'
      onValueChange={onChangeRadio}
      color={color}
      isDisabled={loading}

    >
      {options.map((item) => <Radio key={item.value} value={item.value}>
        <span className='text-sm text-gray-700 font-normal'>{item.label}</span>
      </Radio>)}
    </RadioGroup>
  );
};

export default TrendsRadioGroup;
