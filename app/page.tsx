import React from 'react';
import MyLineCard from '../components/MyLineCard';
import MyDoughnutCard from '../components/MyDoughnutCard';

const page = () => {
  return (
    <div className="flex flex-col h-screen mx-auto w-full gap-5 items-center">
      <h1>My Line Chart</h1>
      <MyLineCard />
      <h1>My Doughnut Chart</h1>
      <MyDoughnutCard />
    </div>
  );
};

export default page;
