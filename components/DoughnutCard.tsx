'use client';

import { Chart, LegendItem } from 'chart.js';
import { useEffect, useRef, useState } from 'react';

const Legend = (props: {
  items: LegendItem[];
  onClickItem: (index: number) => void;
}) => {
  const { items, onClickItem } = props;

  return (
    <>
      {items.map((item, index) => {
        return (
          <p key={index} onClick={() => onClickItem(index)}>
            {item.text}
          </p>
        );
      })}
    </>
  );
};

function DoughnutCard() {
  const myChart = useRef<HTMLCanvasElement | null>(null);

  const [chart, setChart] = useState<Chart<'doughnut'> | null>(null);
  const [legendItems, setLegendItems] = useState<LegendItem[]>([]);

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
          },
        },
      },
    });
    setChart(chart);
    updateLegendItems(chart);

    return () => chart.destroy();
  }, []);

  const handleLegendClick = (index: number) => {
    if (chart) {
      chart.toggleDataVisibility(index);
      chart.update();
      updateLegendItems(chart);
    }
  };

  const updateLegendItems = (chart: Chart<'doughnut'>) => {
    if (!chart) return;
    const generator = chart?.options?.plugins?.legend?.labels?.generateLabels;
    setLegendItems(generator ? generator(chart as Chart) : []);
  };

  return (
    <>
      <canvas ref={myChart}></canvas>
      <div>
        <Legend items={legendItems} onClickItem={handleLegendClick} />
      </div>
    </>
  );
}

export default DoughnutCard;
