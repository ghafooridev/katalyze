import React from "react";

// Reusable gradient component
const Gradient = ({ id, x1, y1, x2, y2, stops }) => (
  <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
    {stops.map(({ offset, color }, index) => (
      <stop key={`${index}-${+new Date()}`} offset={offset} stopColor={color} />
    ))}
  </linearGradient>
);

// Reusable filter component
const Filter = ({ id, x, y, width, height, children }) => (
  <filter id={id} x={x} y={y} width={width} height={height} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    {children}
  </filter>
);

// Main component
const InsightDocsIcon = () => (
  <svg
    width="264"
    height="198"
    viewBox="0 0 264 198"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="135" cy="85.9459" r="85.8306" fill="#EAECF0" />

    {/* Filter and path group 1 */}
    <g filter="url(#filter0_dd)">
      <path
        d="M78.4287 130.694L133.292 105.111C136.046 103.827 137.238 100.552 135.954 97.7978L103.554 28.316L81.6139 20.3305L36.7258 41.2622C33.9713 42.5466 32.7795 45.8209 34.064 48.5754L71.1154 128.032C72.3999 130.787 75.6742 131.979 78.4287 130.694Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M81.6147 20.332L103.555 28.3175L88.592 35.2947L81.6147 20.332Z"
        fill="#D0D5DD"
      />
    </g>

    {/* Filter and path group 2 */}
    <g filter="url(#filter1_dd)">
      <path
        d="M104.656 111.998H165.191C168.23 111.998 170.694 109.534 170.694 106.495V29.8298L154.184 13.3203H104.656C101.617 13.3203 99.1528 15.7842 99.1528 18.8235V106.495C99.1528 109.534 101.617 111.998 104.656 111.998Z"
        fill="url(#paint1_linear)"
      />
      <path
        d="M154.184 13.3203L170.694 29.8298H154.184V13.3203Z"
        fill="#D0D5DD"
      />
    </g>

    {/* Filter and path group 3 */}
    <g filter="url(#filter2_dd)">
      <path
        d="M135.783 105.078L190.646 130.661C193.401 131.946 196.675 130.754 197.96 127.999L230.36 58.5176L222.374 36.5777L177.486 15.646C174.732 14.3616 171.457 15.5533 170.173 18.3079L133.121 97.7648C131.837 100.519 133.029 103.794 135.783 105.078Z"
        fill="url(#paint2_linear)"
      />
      <path
        d="M222.375 36.5762L230.36 58.5161L215.398 51.5388L222.375 36.5762Z"
        fill="#D0D5DD"
      />
    </g>

    {/* Static circles */}
    <circle cx="44.2178" cy="18.2725" r="8.25295" fill="#F2F4F7" />
    <circle cx="39.2655" cy="180.029" r="11.5541" fill="#F2F4F7" />
    <circle cx="248.891" cy="57.8862" r="11.5541" fill="#F2F4F7" />
    <circle cx="230.734" cy="13.3192" r="6.60236" fill="#F2F4F7" />

    {/* Filter and path group 4 */}
    <g filter="url(#filter3_b)">
      <rect
        x="95.3857"
        y="102.451"
        width="79.2283"
        height="79.2283"
        rx="39.6141"
        fill="#344054"
        fillOpacity="0.4"
      />
      <path
        d="M122.621 158.572V150.319M122.621 133.813V125.561M118.494 129.687H126.747M118.494 154.446H126.747M136.651 127.211L133.788 134.653C133.323 135.864 133.09 136.469 132.728 136.978C132.407 137.429 132.013 137.823 131.562 138.144C131.053 138.506 130.448 138.739 129.238 139.204L121.795 142.066L129.238 144.929C130.448 145.394 131.053 145.627 131.562 145.989C132.013 146.31 132.407 146.704 132.728 147.155C133.09 147.664 133.323 148.269 133.788 149.479L136.651 156.922L139.513 149.479C139.979 148.269 140.211 147.664 140.573 147.155C140.894 146.704 141.288 146.31 141.739 145.989C142.248 145.627 142.853 145.394 144.064 144.929L151.506 142.066L144.064 139.204C142.853 138.739 142.248 138.506 141.739 138.144C141.288 137.823 140.894 137.429 140.573 136.978C140.211 136.469 139.979 135.864 139.513 134.653L136.651 127.211Z"
        stroke="white"
        strokeWidth="3.30118"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>

    <defs>
      {/* Define gradients */}
      <Gradient
        id="paint0_linear"
        x1="75.2055"
        y1="130.908"
        x2="31.4839"
        y2="52.0313"
        stops={[
          { offset: "0%", color: "#E4E7EC" },
          { offset: "100%", color: "#F9FAFB" },
        ]}
      />
      <Gradient
        id="paint1_linear"
        x1="101.644"
        y1="110.83"
        x2="95.3539"
        y2="20.8651"
        stops={[
          { offset: "0%", color: "#E4E7EC" },
          { offset: "100%", color: "#F9FAFB" },
        ]}
      />
      <Gradient
        id="paint2_linear"
        x1="133.547"
        y1="102.747"
        x2="165.867"
        y2="18.5528"
        stops={[
          { offset: "0%", color: "#E4E7EC" },
          { offset: "100%", color: "#F9FAFB" },
        ]}
      />

      {/* Define filters */}
      <Filter id="filter0_dd" x="-1.27351" y="13.3535" width="172.565" height="185.69">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="6.60236"
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="13.2047" />
        <feGaussianBlur stdDeviation="6.60236" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="6.60236"
          operator="erode"
          in="SourceAlpha"
          result="effect2_dropShadow"
        />
        <feOffset dy="33.0118" />
        <feGaussianBlur stdDeviation="19.8071" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </Filter>
      <Filter id="filter1_dd" x="66.141" y="13.3203" width="137.565" height="164.701">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="6.60236"
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="13.2047" />
        <feGaussianBlur stdDeviation="6.60236" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="6.60236"
          operator="erode"
          in="SourceAlpha"
          result="effect2_dropShadow"
        />
        <feOffset dy="33.0118" />
        <feGaussianBlur stdDeviation="19.8071" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </Filter>
      <Filter id="filter2_dd" x="97.7841" y="13.3203" width="172.565" height="185.69">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="6.60236"
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="13.2047" />
        <feGaussianBlur stdDeviation="6.60236" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="6.60236"
          operator="erode"
          in="SourceAlpha"
          result="effect2_dropShadow"
        />
        <feOffset dy="33.0118" />
        <feGaussianBlur stdDeviation="19.8071" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </Filter>
      <Filter id="filter3_b" x="82.181" y="89.2465" width="105.638" height="105.638">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.60236" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur"
          result="shape"
        />
      </Filter>
    </defs>
  </svg>
);

export default InsightDocsIcon;
