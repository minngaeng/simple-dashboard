import React from 'react';
import LineCard from '../../components/LineCard';
import BarCard from '../../components/BarCard';
import DoughnutCard from '../../components/DoughnutCard';

function page() {
  return (
    <div className="flex h-screen mx-auto w-full">
      <div>
        <LineCard />
        <BarCard />
        <DoughnutCard />
      </div>
    </div>
  );
}

export default page;
