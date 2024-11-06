import { getMetrics } from '@/app/documents/_services';
import { MetricCard } from '@/components/MetricCard/index';

export const Metrics = async () => {
  const {
    total, approved, pending, rejected,
  } = await getMetrics();
  return (
    <div className="flex flex-wrap gap-6 p-6">
      <div className="flex-none lg:flex-1 w-full md:w-[calc(50%-12px)] h-auto md:h-[106px]">
        <MetricCard
          className='w-full h-full min-w-[155px] '
          title='Total Imported Documents'
          value={total}
        />
      </div>
      <div className="flex-none lg:flex-1 w-full md:w-[calc(50%-12px)] h-auto md:h-[106px]">
        <MetricCard
          className='w-full h-full min-w-[155px] '
          title="Documents Pending Approval"
          value={pending}
        />
      </div>
      <div className="flex-none lg:flex-1 w-full md:w-[calc(50%-12px)] h-auto md:h-[106px]">
        <MetricCard
          className='w-full h-full min-w-[155px] '
          title="Approved Documents"
          value={approved}
        />
      </div>
      <div className="flex-none lg:flex-1 w-full md:w-[calc(50%-12px)] h-auto md:h-[106px]">
        <MetricCard
          className='w-full h-full min-w-[155px] '
          title="Rejected Documents"
          value={rejected}
        />
      </div>
    </div>
  );
};
