import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface dane{
  income:Array<number>;
  months:Array<string>;
}
interface ChartComponentProps {
  data: dane
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.months,
            datasets: [{
              label: 'Monthly Income',
              data: data.income,
              backgroundColor: '#2B3143',
              borderColor: '#a8a9aa',
              borderWidth: 0
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data.income, data.months]);

  return (
    <div className='align-bottom'>
      <canvas ref={chartRef} className='w-screen mb-6' >
      </canvas>
    </div>
  );
};
  export default ChartComponent