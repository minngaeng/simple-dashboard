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
            backgroundColor: ['#8470FF', '#67BFFF', '#4634B1'],
          },
        ],

        labels: ['United States', 'Italy', 'Other'],
      },
      options: {
        cutout: '80%',
        plugins: {
          legend: {
            display: true,
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

// onClick: function (e, legendItem, legend) {
//   console.log('e', e);
//   console.log('legendItem', legendItem);
//   console.log('legend', legend);
//   const index = legendItem.index;

//   const ci = legend.chart;

//   console.log('meta', ci.getDatasetMeta(0));

//   if (index === undefined) return;
//   const meta = ci.getDatasetMeta(0); // Assuming you have only one dataset
//   const item = meta.data[index];

//   if (ci.isDatasetVisible(index)) {
//     ci.hide(0, index);
//     // legendItem.hidden = false;
//   } else {
//     ci.show(0, index);
//     // legendItem.hidden = false;
//   }
//   ci.update();
// },
