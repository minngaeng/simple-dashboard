'use client';

import { useState } from 'react';
import DonutChart from './MyDoughnutChart';

const MyDoughnutCard = () => {
  const [percentage, setPercentage] = useState(74);

  const handleClick = () => {
    // click 로직 구현
    setPercentage((prev) => {
      const newPercentage = prev + 10;
      return newPercentage > 100 ? 100 : newPercentage;
    });
  };

  return (
    <>
      <div
        className={
          'flex items-center justify-center bg-blue-500 rounded-[12px] p-6'
        }
      >
        <DonutChart percentage={percentage} radius={66} strokeWidth={32} />
      </div>
      <button onClick={handleClick}>Increase</button>
    </>
  );
};

export default MyDoughnutCard;
