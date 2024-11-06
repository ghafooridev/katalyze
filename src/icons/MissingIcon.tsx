import React from 'react';

const MissingIcon: React.FC<{ className?: string }> = ({ className }) => (
<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
<path d="M5 2.5V1.5M8 10.5V11.5M2.5 5H1.5M10.5 8H11.5M2.95711 2.95711L2.25 2.25M10.0429 10.0429L10.75 10.75M6.5 9.32843L5.43934 10.3891C4.65829 11.1701 3.39196 11.1701 2.61091 10.3891C1.82986 9.60804 1.82986 8.34171 2.61091 7.56066L3.67157 6.5M9.32843 6.5L10.3891 5.43934C11.1701 4.65829 11.1701 3.39196 10.3891 2.61091C9.60804 1.82986 8.34171 1.82986 7.56066 2.61091L6.5 3.67157" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

);

export default MissingIcon;
