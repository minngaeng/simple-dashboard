import React from 'react';
import MyLineChart from './MyLineChart';

const MyLineCard: React.FC = () => {
  const data: number[] = [
    732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154,
    273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
  ];

  return <MyLineChart data={data} width={389} height={128} />;
};

export default MyLineCard;
