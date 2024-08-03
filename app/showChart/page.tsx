import React from 'react';
import LineCard from '../../components/LineCard';
import BarCard from '../../components/BarCard';

function page() {
  return (
    <div className="flex h-screen mx-auto w-full">
      <div>
        <LineCard />
        <BarCard />
      </div>
    </div>
  );
}

export default page;
