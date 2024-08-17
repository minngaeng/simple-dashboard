import React from 'react';
import MyLineCard from '../components/MyLineCard';

const page = () => {
  return (
    <div className="flex flex-col h-screen mx-auto w-full gap-5 items-center">
      <h1>My Line Chart</h1>
      <MyLineCard />
    </div>
  );
};

export default page;
