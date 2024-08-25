import React, { useEffect, useState } from 'react';

interface IDoughnutProps {
  displayedPercentage: number;
  radius: number;
  strokeWidth: number;
}

const DonutChart = ({
  displayedPercentage,
  radius,
  strokeWidth,
}: IDoughnutProps) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercentage(displayedPercentage);
    }, 100);
  }, []);

  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={radius * 2} height={radius * 2}>
      <circle
        stroke="lightgrey"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        className="transition-[stroke-dashoffset] duration-1000 ease-in-out"
        stroke="blue"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20px"
        fill="black"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default DonutChart;
