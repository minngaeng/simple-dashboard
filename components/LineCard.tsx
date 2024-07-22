'use client';

import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

function LineCard() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas.current) return;

    const chart = new Chart(canvas.current, {
      type: 'line',
      data: {
        labels: [
          '12-01-2022',
          '01-01-2023',
          '02-01-2023',
          '03-01-2023',
          '04-01-2023',
          '05-01-2023',
          '06-01-2023',
          '07-01-2023',
          '08-01-2023',
          '09-01-2023',
          '10-01-2023',
          '11-01-2023',
          '12-01-2023',
          '01-01-2024',
          '02-01-2024',
          '03-01-2024',
          '04-01-2024',
          '05-01-2024',
          '06-01-2024',
          '07-01-2024',
          '08-01-2024',
          '09-01-2024',
          '10-01-2024',
          '11-01-2024',
          '12-01-2024',
          '01-01-2025',
        ],
        datasets: [
          {
            label: 'Chart01',
            data: [
              732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391,
              192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
            ],
            fill: false,
            borderColor: 'rgb(75,0,130)',
            tension: 0.2,
            pointStyle: false,
          },
          {
            label: '',
            data: [
              532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234,
              234, 314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642,
            ],
            fill: false,
            borderColor: 'rgb(128,128,130)',
            tension: 0.2,
            pointHitRadius: 7,
            pointRadius: 0.1,
          },
        ],
      },
      options: {
        interaction: {
          mode: 'point',
        },
        // events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
        // onHover: function (event, elements) {
        //   console.log(elements);
        //   if (elements.length) {
        //     elements[0].element.options.radius = 5; // Hover 시 포인트를 보이게 설정
        //   }
        // },

        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,

            enabled: true,
            backgroundColor: 'rgb(255,255,255)',
            boxWidth: 1,
            bodyColor: '#FF0000',
            bodyFont: {
              size: 14,
              family: 'Arial',
              style: 'normal',
              weight: 'normal',
              lineHeight: 1.2,
            },
            callbacks: {
              title: function () {
                return '';
              },
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },

        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [canvas]);

  return <canvas ref={canvas} width={389} height={128}></canvas>;
}

export default LineCard;
