import { NoChartIcon } from '@/icons/NoChartIcon';

export const NoChartData = (props: { text: string, style?: any, className?: string }) => {
  const { text, style, className } = props;
  return (
    <div style={style}
      className={`absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 ${className}`}>
      <div className='flex justify-center flex-col items-center'>
        <NoChartIcon />
        <p className='text-medium font-semibold'>
          {text}
        </p>
      </div>
    </div>
  );
};

export default NoChartData;
