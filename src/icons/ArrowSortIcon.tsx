import React from 'react';

const ArrowSortIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        width='14'
        height='13'
        viewBox='0 0 14 13'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            d='M10.3333 1.16675V11.8334M10.3333 11.8334L7.66667 9.16675M10.3333 11.8334L13 9.16675M3.66667 11.8334V1.16675M3.66667 1.16675L1 3.83341M3.66667 1.16675L6.33333 3.83341'
            stroke='#98A2B3'
            strokeWidth='1.33333'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

export default ArrowSortIcon;
