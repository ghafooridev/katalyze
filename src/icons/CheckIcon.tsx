import React from 'react';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        width='12'
        height='13'
        viewBox='0 0 12 13'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            d='M11 6.04286V6.50286C10.9994 7.58107 10.6503 8.6302 10.0047 9.49377C9.35908 10.3573 8.45164 10.9891 7.41768 11.2948C6.38372 11.6005 5.27863 11.5638 4.26724 11.1902C3.25584 10.8165 2.39233 10.1259 1.80548 9.2214C1.21863 8.31688 0.939896 7.24689 1.01084 6.17102C1.08178 5.09514 1.4986 4.07103 2.19914 3.2514C2.89968 2.43177 3.84639 1.86055 4.89809 1.62293C5.9498 1.38532 7.05013 1.49403 8.035 1.93286M11 2.5L6 7.505L4.5 6.005'
            stroke='#17B26A'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

export default CheckIcon;
