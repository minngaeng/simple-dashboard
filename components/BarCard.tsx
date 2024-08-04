'use client';
import { Chart } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import TooltipOptions from './TooltipOptions';

interface LegendItemData {
  label: string;
  value: number;
  index: number;
  isHidden: boolean;
}
const BarCard = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [legendItems, setLegendItems] = useState<LegendItemData[]>([]);

  const updateLegendItems = (chart: Chart) => {
    if (!chart) return;
    const items: LegendItemData[] = chart.data.datasets.map(
      (dataset, index) => {
        return {
          value: (dataset.data as number[]).reduce((prev, cur) => {
            return prev + cur;
          }, 0),
          label: dataset.label || '',
          isHidden: !chart.isDatasetVisible(index),
          index,
        };
      },
    );

    setLegendItems(items);
  };

  useEffect(() => {
    if (canvas.current) {
      const labels = [
        '12-01-2022',
        '01-01-2023',
        '02-01-2023',
        '03-01-2023',
        '04-01-2023',
        '05-01-2023',
      ];
      const formattedLabels = labels.map(formatDateLabel);
      const data = {
        labels: formattedLabels,
        datasets: [
          {
            categoryPercentage: 0.3,
            barPercentage: 1.0,
            barThickness: 'flex',
            maxBarThickness: 8,
            label: 'green',
            data: [800, 1600, 900, 1300, 1950, 1700],
            backgroundColor: '#67BFFF',
            borderColor: '#67BFFF',

            borderRadius: 10,
          },
          {
            categoryPercentage: 0.3,
            barPercentage: 1.0,
            barThickness: 'flex',
            maxBarThickness: 10,
            label: 'blue',
            data: [4900, 2600, 5350, 4800, 5200, 4800],
            backgroundColor: '#8470FF',
            borderColor: '#8470FF',
            borderRadius: 10,
          },
        ],
      };

      const config = {
        type: 'bar',
        data: data,

        options: {
          scales: {
            x: {
              border: {
                display: false,
              },
              grid: {
                display: false,
              },
            },

            y: {
              border: {
                display: false,
              },
              grid: {
                display: false,
              },
              beginAtZero: true,
              ticks: {
                callback: function (val: number) {
                  console.log(val);
                  if (val === 0) return 0;
                  return `$${val / 1000}K`;
                },
                stepSize: 2000,
              },
            },
          },
          plugins: {
            tooltip: TooltipOptions(),
            legend: {
              display: false,
            },
          },
        },
      };

      const chartInstance = new Chart(
        canvas.current,
        config as ChartConfiguration,
      );
      setChartInstance(chartInstance);
      updateLegendItems(chartInstance);

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  // chartInstance
  const handleLegendClick = (index: number) => {
    if (chartInstance) {
      const isVisible = chartInstance.isDatasetVisible(index);
      chartInstance.setDatasetVisibility(index, !isVisible);
      chartInstance.update();
      updateLegendItems(chartInstance);
    }
  };

  return (
    <>
      <div>
        <ul>
          {legendItems.map((item) => {
            const { value, label, index, isHidden } = item;
            return (
              <li key={index}>
                {/* TODO: tailwind 사용해서 스타일링 */}
                <button onClick={() => handleLegendClick(index)}>
                  <span>동그라미</span>
                  {/* value는 format */}
                  <span className="text-red-500">{value}</span>
                  <span className={isHidden ? 'text-red-500' : 'text-black'}>
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <canvas ref={canvas} width={389} height={128}></canvas>
    </>
  );
};

export default BarCard;

const formatDateLabel = (dateLabel: string) => {
  const date = new Date(dateLabel);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

//const myChart = new Chart(
// document.getElementById('myChart'),
