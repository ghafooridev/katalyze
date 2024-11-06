import React from 'react';

// Reusable Circle component
const Circle: React.FC<{ cx: number; cy: number; r: number; fill: string }> = ({ cx, cy, r, fill }) => (
    <circle cx={cx} cy={cy} r={r} fill={fill} />
);

// Reusable Gradient component
const Gradient: React.FC<{ id: string; x1: string; y1: string; x2: string; y2: string }> = ({ id, x1, y1, x2, y2 }) => (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
        <stop stopColor="#E4E7EC" />
        <stop offset="1" stopColor="#F9FAFB" />
    </linearGradient>
);

// Reusable Filter component
const Filter: React.FC<{ id: string; x: string; y: string; width: string; height: string }> = ({ id, x, y, width, height }) => (
    <filter id={id} x={x} y={y} width={width} height={height} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feMorphology radius="6.60236" operator="erode" in="SourceAlpha" result="effect1_dropShadow" />
        <feOffset dy="13.2047" />
        <feGaussianBlur stdDeviation="6.60236" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
    </filter>
);

// Main component
const NoDataChartIcon: React.FC = () => (
    <svg width="263" height="198" viewBox="0 0 263 198" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            {/* Define gradients */}
            <Gradient id="paint0_linear" x1="74.7055" y1="131.157" x2="30.9839" y2="52.2803" />
            <Gradient id="paint1_linear" x1="101.144" y1="111.08" x2="94.8535" y2="21.1151" />
            <Gradient id="paint2_linear" x1="133.047" y1="102.997" x2="165.367" y2="18.8028" />

            {/* Define filters */}
            <Filter id="filter0_dd" x="-1.77351" y="13.6025" width="172.565" height="185.69" />
            <Filter id="filter1_dd" x="65.6406" y="13.5703" width="137.565" height="164.701" />
            <Filter id="filter2_dd" x="97.2839" y="13.5703" width="172.565" height="185.691" />

            {/* Define background filters */}
            <filter id="filter3_b" x="81.681" y="89.4974" width="105.638" height="105.638" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.60236" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
            </filter>
        </defs>

        {/* SVG Content */}
        <Circle cx={134.5} cy={86.1959} r={85.8306} fill="#EAECF0" />

        <g filter="url(#filter0_dd)">
            <path d="M77.9287 130.943L132.792 105.36C135.546 104.076 136.738 100.801 135.454 98.0469L103.054 28.565L81.1139 20.5795L36.2258 41.5112C33.4713 42.7956 32.2795 46.0699 33.564 48.8245L70.6154 128.281C71.8999 131.036 75.1742 132.228 77.9287 130.943Z" fill="url(#paint0_linear)" />
            <path d="M81.1145 20.5801L103.054 28.5655L88.0917 35.5428L81.1145 20.5801Z" fill="#D0D5DD" />
        </g>

        <g filter="url(#filter1_dd)">
            <path d="M104.156 112.248H164.69C167.73 112.248 170.193 109.784 170.193 106.745V30.0798L153.684 13.5703H104.156C101.116 13.5703 98.6523 16.0342 98.6523 19.0735V106.745C98.6523 109.784 101.116 112.248 104.156 112.248Z" fill="url(#paint1_linear)" />
            <path d="M153.684 13.5703L170.194 30.0798H153.684V13.5703Z" fill="#D0D5DD" />
        </g>

        <g filter="url(#filter2_dd)">
            <path d="M135.283 105.328L190.146 130.911C192.901 132.196 196.175 131.004 197.46 128.249L229.86 58.7676L221.874 36.8277L176.986 15.896C174.232 14.6116 170.957 15.8033 169.673 18.5579L132.621 98.0148C131.337 100.769 132.529 104.044 135.283 105.328Z" fill="url(#paint2_linear)" />
            <path d="M221.875 36.8262L229.86 58.7661L214.898 51.7888L221.875 36.8262Z" fill="#D0D5DD" />
        </g>

        <Circle cx={43.7175} cy={18.5215} r={8.25295} fill="#F2F4F7" />
        <Circle cx={38.7658} cy={180.28} r={11.5541} fill="#F2F4F7" />
        <Circle cx={248.391} cy={58.1362} r={11.5541} fill="#F2F4F7" />
        <Circle cx={230.234} cy={13.5701} r={6.60236} fill="#F2F4F7" />

        <g filter="url(#filter3_b)">
            <rect x="94.8857" y="102.702" width="79.2283" height="79.2283" rx="39.6141" fill="#344054" fillOpacity="0.4" />
            <path d="M131.199 125.81V133.502C131.199 133.861 131.199 134.04 131.144 134.182C131.093 134.317 131.024 134.415 130.916 134.509C130.801 134.61 130.614 134.678 130.242 134.814C125.503 136.551 122.121 141.101 122.121 146.442C122.121 153.279 127.663 158.821 134.5 158.821C141.337 158.821 146.879 153.279 146.879 146.442C146.879 141.101 143.498 136.551 138.758 134.814C138.386 134.678 138.199 134.61 138.084 134.509C137.975 134.415 137.907 134.317 137.856 134.182C137.801 134.04 137.801 133.861 137.801 133.502V125.81H131.199Z" fill="#F2F4F7" />
        </g>
    </svg>
);

export default NoDataChartIcon;



