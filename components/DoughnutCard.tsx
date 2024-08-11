'use client';

import { Chart, LegendItem } from 'chart.js';
import { useEffect, useRef, useState } from 'react';

interface LegendItemData {
  index: number;
  text: string;
  fillStyle: string;
}

function DoughnutCard() {
  const myChart = useRef<HTMLCanvasElement | null>(null);

  const [chartInstance, setChartInstance] = useState<Chart<'doughnut'> | null>(
    null,
  );
  const [legendItems, setLegendItems] = useState<LegendItemData[]>([]);

  const updateLegendItems = (chart: any) => {
    const generateLabels =
      chart.options.plugins?.legend?.labels?.generateLabels;

    if (generateLabels) {
      const items = generateLabels(chart) as LegendItemData[];

      setLegendItems(items);
    }
  };

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
            display: false,
            position: 'bottom',
            labels: {
              generateLabels: function (chart): LegendItem[] {
                const data = chart.data;

                if (data.labels && data.datasets.length > 0) {
                  return data.labels.map((label, index) => {
                    return {
                      index,
                      text: label as string,
                      fillStyle: '#ffff00',
                    };
                  });
                }
                return [];
              },
            },
          },
        },
      },
    });

    setChartInstance(chadrt);
    updateLegendItems(chart);

    return () => chart.destroy();
  }, []);

  const handleClick = (index: number) => {
    if (chartInstance) {
      chartInstance.toggleDataVisibility(index);
      chartInstance.update();
    }
  };

  return (
    <>
      <canvas ref={myChart}></canvas>
      {legendItems.map((el, index) => (
        <div key={index} onClick={() => handleClick(index)}>
          {el.text}
        </div>
      ))}
    </>
  );
}

export default DoughnutCard;
