'use client';
import React, { useState } from 'react';

interface MyLineChartProps {
  data: number[];
  width: number;
  height: number;
}

const MyLineChart: React.FC<MyLineChartProps> = ({ data, width, height }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // 정규화
  const normalizeData = (originData: number[]) => {
    // originData를 이용해서 정규화된 데이터를 만들어서 리턴
    // max 데이터를 찾기
    const maxV = Math.max(...originData);
    return originData.map((data) => (data / maxV) * height);
  };

  const normalizedData = normalizeData(data);

  // path d 계산
  const pathD = normalizedData.reduce((acc, point, index) => {
    // normalizeData의 각 요소, svg 요소의 높이
    // (index / length - 1) * 300
    const command = index === 0 ? 'M' : 'L';
    const x = (index / (normalizedData.length - 1)) * width;
    const y = height - point;

    return `${acc} ${command} ${x},${y}`;
  }, '');

  return (
    <>
      <svg width={width} height={height} overflow={'visible'}>
        <path d={pathD} fill="none" stroke="blue" strokeWidth={'2'} />
        {normalizedData.map((point, index) => (
          <circle
            className="group"
            onMouseEnter={() => setHoveredPoint(index)}
            onMouseLeave={() => setHoveredPoint(null)}
            key={index}
            cx={(index / (normalizedData.length - 1)) * width}
            cy={height - point}
            r="4"
            fill="#8470ff"
          />
        ))}
        {hoveredPoint && (
          <>
            <rect
              x={(hoveredPoint / (data.length - 1)) * width - 20}
              y={height - normalizedData[hoveredPoint] - 30}
              width="40"
              height="30"
              fill="white"
              stroke="black"
              rx="5"
              ry="5"
            />
            <text
              x={(hoveredPoint / (data.length - 1)) * width}
              y={height - normalizedData[hoveredPoint] - 10}
              fontSize="12px"
              textAnchor="middle"
            >
              {data[hoveredPoint]}
            </text>
          </>
        )}
      </svg>
    </>
  );
};

export default MyLineChart;

// className="group-hover:visible invisible"
