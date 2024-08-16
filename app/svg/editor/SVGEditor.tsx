'use client';
import React, { useState } from 'react';
import { tailwindTheme } from '../../lib/tailwind-theme';

interface Circle {
  id: number;
  fill: string;
  // TODO: task1. 필요한 속성 추가
  cx: number;
  cy: number;
  r: number;
}

const SVGEditor: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);

  const addCircle = () => {
    const newCircle: Circle = {
      id: Date.now(),
      fill: tailwindTheme.colors.amber[500],
      // TODO: task1. 필요한 속성 추가
      cx: 400,
      cy: 400,
      r: 40,
    };
    setCircles([...circles, newCircle]);
  };

  const handleCircleClick = (circle: Circle) => {
    setSelectedCircle(circle);
  };

  const changeColor = (color: string) => {
    // TODO: task3. 선택된 원의 색상을 변경하세요.
    if (selectedCircle) {
      // setCircles
      // setSelectedCircle
    }
  };

  const changeSize = (size: number) => {
    // TODO: task4. 선택된 원의 크기를 변경하세요.
    if (selectedCircle) {
      // setCircles
      // setSelectedCircle
    }
  };

  const deleteCircle = () => {
    if (selectedCircle) {
      const updatedCircles = circles.filter(
        (circle) => circle.id !== selectedCircle.id,
      );
      setCircles(updatedCircles);
      setSelectedCircle(null);
    }
  };

  return (
    <div className="p-4">
      <svg width="400" height="400" className="border border-gray-300">
        {circles.map((circle) => (
          <g key={circle.id}>
            <circle
              // TODO: task1. 필요한 속성 추가
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill={circle.fill}
              onClick={() => handleCircleClick(circle)}
              className="cursor-pointer"
            />
            {selectedCircle && selectedCircle.id === circle.id && (
              <circle
                // TODO: task2. 선택된 원의 테두리를 표시하세요.
                cx={circle.cx}
                cy={circle.cy}
                r={circle.r}
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}
          </g>
        ))}
      </svg>
      <div className="mt-4 space-x-2">
        <button
          onClick={addCircle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          원 추가
        </button>
        <button
          onClick={deleteCircle}
          disabled={!selectedCircle}
          className={`font-bold py-2 px-4 rounded ${
            selectedCircle
              ? 'bg-red-500 hover:bg-red-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          삭제
        </button>
      </div>
      <div className="mt-4 space-x-2">
        <input
          type="color"
          onChange={(e) => changeColor(e.target.value)}
          disabled={!selectedCircle}
          className={`h-10 w-10 ${!selectedCircle && 'opacity-50 cursor-not-allowed'}`}
        />
        <input
          type="range"
          min="1"
          max="100"
          onChange={(e) => changeSize(Number(e.target.value))}
          disabled={!selectedCircle}
          className={`w-40 ${!selectedCircle && 'opacity-50 cursor-not-allowed'}`}
        />
      </div>
    </div>
  );
};

export default SVGEditor;
