import React from 'react';

const ConfidenceHighIcon = React.forwardRef<SVGSVGElement>(() => (
  <svg
    width='23'
    height='22'
    viewBox='0 0 23 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g>
      <rect x='1' y='0.5' width='21' height='21' rx='10.5' fill='#F9FAFB' />
      <rect x='1' y='0.5' width='21' height='21' rx='10.5' stroke='#EAECF0' />
      <path
        d='M15.5 8L10 13.5L7.5 11'
        stroke='#667085'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
));

ConfidenceHighIcon.displayName = 'ConfidenceHighIcon';

export default ConfidenceHighIcon;
