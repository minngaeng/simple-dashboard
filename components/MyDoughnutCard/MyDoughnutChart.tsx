import React from 'react';

interface IDoughnutProps {
  percentage: number;
  radius: number;
  strokeWidth: number;
}

const DonutChart = ({ percentage, radius, strokeWidth }: IDoughnutProps) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  console.log(percentage, radius, strokeWidth);

  return (
    <svg>
      <circle
        stroke="lightgrey"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="blue"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
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
