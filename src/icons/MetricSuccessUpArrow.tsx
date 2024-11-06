import React from "react";

interface MetricSuccessUpArrowProps {
  type: "success" | "danger";
}

const MetricSuccessUpArrow: React.FC<MetricSuccessUpArrowProps> = ({
  type,
}) => {
  const color = type === "success" ? "#17B26A" : "#F04438";

  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.90002 8.5V1.5M4.90002 1.5L1.40002 5M4.90002 1.5L8.40002 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MetricSuccessUpArrow;
