'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

const BarChart = (props) => {
  const chartRef = useRef(null);
  const pro = props.productos;  
  const chartInstanceRef = useRef(null);
  const arrTotalCant = pro.map((p) => p.quantity);
  const arrnombrePro = pro.map((p) => p.name)


  const datos = {
    labels: arrnombrePro, 
    datasets: [{
      label: "Categorías",
      data: arrTotalCant, 
      backgroundColor: [
        'rgba(242, 140, 40, 0.6)',
        'rgba(255, 200, 87, 0.6)',
        'rgba(230, 57, 70, 0.6)',
        'rgba(255, 179, 133, 0.6)',
        'rgba(227, 86, 35, 0.6)',
        'rgba(192, 57, 43, 0.6)',
        'rgba(255, 215, 0, 0.6)'
      ],
      borderColor: [
        'rgba(242, 140, 40, 1)', // Tangerine
        'rgba(255, 200, 87, 1)', // Sunglow
        'rgba(230, 57, 70, 1)',  // Red Pantone
        'rgba(255, 179, 133, 1)', // Sandy Brown
        'rgba(227, 86, 35, 1)',  // Flame
        'rgba(192, 57, 43, 1)',  // Persian Red
        'rgba(255, 215, 0, 1)'   // Gold
      ],
      borderWidth: 1,
      borderRadius: 5,
      barThickness: 40, 

    }],
  };

  useEffect(() => {
    if (arrnombrePro.length > 0 && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstanceRef.current = new ChartJS(ctx, {
        type: 'bar',
        data: datos,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Análisis de los productos con mayores ventas',
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0)',
              },
              ticks: {
                display:true,
                color: 'rgba(0, 0, 0, 0.9)'
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0)',
              },
              ticks: {
                display:true,
                color: 'rgba(0, 0, 0, 0.9)'
              }
            }
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [arrnombrePro]);


  return (
    <div>
      <canvas className=' p-10' ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
