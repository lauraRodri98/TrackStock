import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, LineController, PointElement } from 'chart.js';

// Registrar todos los elementos necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement
);

const LineChart = ({ categorias, productos, movimientos }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);
  const [borderColor, setBorderColor] = useState([
    'rgba(242, 140, 40, 1)', // Tangerine
    'rgba(255, 200, 87, 1)', // Sunglow
    'rgba(230, 57, 70, 1)',  // Red Pantone
    'rgba(255, 179, 133, 1)', // Sandy Brown
    'rgba(227, 86, 35, 1)',  // Flame
    'rgba(192, 57, 43, 1)',  // Persian Red
    'rgba(255, 215, 0, 1)'   // Gold
  ]);

  useEffect(() => {
    if (movimientos && productos && categorias) {
      const gastosPorCategoria = categorias.map((categoria) => {
        const gastosPorMes = Array(12).fill(0); // Inicializamos un array con 12 meses en 0
  
        // Filtrar los productos que pertenecen a la categoría
        const productosDeCategoria = productos.filter(
          (producto) => producto.category.toString() === categoria._id.toString()
        );
  
        // Obtenemos la fecha límite para los últimos 12 meses (desde el mes actual)
        const fechaLimite = new Date();
        fechaLimite.setMonth(fechaLimite.getMonth() - 12); // Para los últimos 12 meses
  
        // Filtrar los movimientos de tipo salida para la categoría
        movimientos.forEach((movimiento) => {
          const dateMov = new Date(movimiento.date);
          const añoMov = dateMov.getFullYear();
          const mesMovimiento = dateMov.getMonth();
          
          // Si el movimiento es de tipo 'salida' y está dentro de los últimos 12 meses
          if (movimiento.type === 'salida' && dateMov >= fechaLimite) {
            productosDeCategoria.forEach((producto) => {
              if (producto._id.toString() === movimiento.product_id.toString()) {
                const gasto = movimiento.quantity * producto.price; // Gasto por este movimiento
                gastosPorMes[mesMovimiento] += gasto; // Sumar al mes correspondiente
              }
            });
          }
        });
  
        return {
          categoria: categoria.name,
          gastosPorMes,
        };
      });
      
      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };
  
      // Configurar las etiquetas y los datos para la gráfica
      const labels = [];
      const currentDate = new Date();
      
      // Generar los últimos 12 meses
      for (let i = 11; i >= 0; i--) {
        const month = new Date(currentDate);
        month.setMonth(currentDate.getMonth() - i);
        const monthName = month.toLocaleString('es-ES', { month: 'long' });
        labels.push(capitalizeFirstLetter(monthName)); // Capitaliza la primera letra
      }
  
      const datasets = gastosPorCategoria.map((item, index) => ({
        label: item.categoria,
        data: item.gastosPorMes,
        fill: false,
        borderColor: borderColor[index % borderColor.length],
        pointRadius: 4,
        pointBackgroundColor: 'rgba(255,255,255, 1)',

      }));
      console.log(datasets)
  
      setLabel(labels);
      setData(datasets);
    }
  }, [movimientos, productos, categorias]);
  

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: label,
          datasets: data,
        },
        options: {
          responsive: true,
          borderWidth: 2,
          maintainAspectRatio: false,
          tension:0.2,
          plugins: {
            title: {
              display: true,
              text: 'Gastos por mes por categoría',
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 20,
                max: Math.max(...data.flatMap((dataset) => dataset.data)) + 20, // Ajustar el máximo según los datos
                min: 0,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, label]);

  return <canvas ref={chartRef} className="w-full" style={{ height: '300px' }}></canvas>;
};

export default LineChart;
