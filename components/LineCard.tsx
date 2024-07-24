'use client';
import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

function LineCard() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas.current) return;

    const ctx = canvas.current.getContext('2d');

    if (ctx) {
      const chart = new Chart(ctx, {
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
              label: '',
              data: [
                732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391,
                192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
              ],
              fill: true,
              borderColor: '#8470FF',
              backgroundColor: ({ chart }) => {
                const { chartArea } = chart;
                if (chartArea) {
                  const gradient = ctx.createLinearGradient(
                    0,
                    chartArea.bottom,
                    0,
                    chartArea.top,
                  );
                  gradient.addColorStop(0, 'red');
                  gradient.addColorStop(1, 'blue');
                  return gradient;
                }
                return 'transparent';
              },
              tension: 0.2,
              pointHitRadius: 10,
              pointRadius: 0.1,
              pointHoverBorderWidth: 0.1,
              pointBackgroundColor: '#8470FF',
            },
            {
              label: '',
              data: [
                532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234,
                234, 314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642,
              ],
              fill: false,
              borderColor: '#B3B6C7',
              tension: 0.2,
              pointHitRadius: 10,
              pointRadius: 0.1,
              pointHoverBorderWidth: 0.1,
            },
          ],
        },
        options: {
          interaction: {
            mode: 'point',
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              borderColor: 'rgb(229, 231, 235)',
              borderWidth: 1,
              caretSize: 0,
              caretPadding: 15,
              enabled: true,
              backgroundColor: 'rgb(255,255,255)',
              boxWidth: 1,
              bodyColor: 'rgb(75, 85, 99)',
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
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
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
    }
  }, [canvas]);

  return <canvas ref={canvas} width={389} height={128}></canvas>;
}

export default LineCard;
