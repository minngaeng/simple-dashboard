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
  borderColor: string;
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
          borderColor: dataset.borderColor as string,
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
            label: 'Direct',
            data: [800, 1600, 900, 1300, 1950, 1700],
            backgroundColor: '#1f2021',
            borderColor: '#67BFFF',

            borderRadius: 10,
          },
          {
            categoryPercentage: 0.3,
            barPercentage: 1.0,
            barThickness: 'flex',
            maxBarThickness: 10,
            label: 'Indirect',
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
            console.log(legendItems);
            const { value, label, index, isHidden, borderColor } = item;
            return (
              <li key={index}>
                {/* TODO: tailwind 사용해서 스타일링 */}
                <button
                  onClick={() => handleLegendClick(index)}
                  className="flex items-center"
                >
                  <span
                    style={{ borderColor: isHidden ? '#D1D5DB' : borderColor }}
                    className="inline-block w-2 h-2 border-4 border-current rounded-full bg-white box-content {}"
                  ></span>
                  {/* value는 format */}
                  <span
                    className={`ml-2 font-semibold ${
                      isHidden ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {formatValue(value)}
                  </span>
                  <span
                    className={`ml-2 font-light ${
                      isHidden ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
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

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `$${parseFloat((value / 1000).toFixed(2))}K`;
  }
  return `$${value}`;
};
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

//const myChart = new Chart(
// document.getElementById('myChart'),
