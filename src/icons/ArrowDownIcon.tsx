import React from 'react';

const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='16'
    height='17'
    viewBox='0 0 16 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M8.00016 3.58325V12.9166M8.00016 12.9166L12.6668 8.24992M8.00016 12.9166L3.3335 8.24992'
      stroke='#101828'
      strokeWidth='1.33333'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default ArrowDownIcon;
