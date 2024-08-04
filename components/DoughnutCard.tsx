'use client';

import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';

function DoughnutCard() {
  const myChart = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chart = new Chart(myChart.current as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            borderWidth: 0,
          },
        ],

        labels: ['United States', 'Italy', 'Other'],
      },
      options: {
        cutout: '80%',
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={myChart}></canvas>;
}

export default DoughnutCard;
