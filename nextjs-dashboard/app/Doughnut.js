'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, DoughnutController, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Doughnut = ({categorias, productos}) => {
  const [nombresCategorias, setNombresCategorias] = useState([]);
  const [cantidadStock, setCantidadStock] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Actualizar los datos cuando cambien las props
  useEffect(() => {
    if (categorias) {
      setNombresCategorias(categorias.map((c) => c.name));
    }
  }, [categorias]);


  useEffect(() => {
    // Sacar el numero del mes 
    
    if (productos && categorias) {
      // Crear un array para almacenar las cantidades por categoría
      const cantidadesPorCategoria = categorias.map((categoria) => {

        // Filtrar los productos que pertenecen a esta categoría
        const productosDeCategoria = productos.filter(
          (producto) => producto.category === categoria._id
        );
  
        // Sumar las cantidades de productos en esta categoría
        return productosDeCategoria.reduce(
          (total, producto) => total + producto.quantity,
          0
        );
      });
  
      // Actualizar el estado con las cantidades calculadas
      setCantidadStock(cantidadesPorCategoria);
    }
  }, [productos, categorias]);

  // Crear o actualizar el gráfico
  useEffect(() => {
    if (chartRef.current && nombresCategorias.length > 0 && cantidadStock.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Destruir el gráfico anterior si existe
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Crear el nuevo gráfico
      chartInstanceRef.current = new ChartJS(ctx, {
        type: 'doughnut',
        data: {
          labels: nombresCategorias,
          datasets: [
            {
              
              label: 'Stock por Categoría',
              data: cantidadStock,
              backgroundColor: [
                'rgba(242, 140, 40, 0.8)', 
                'rgba(255, 200, 87, 0.8)',   
                'rgba(230, 57, 70, 0.8)',
                'rgba(255, 179, 133, 0.8)',
                'rgba(227, 86, 35, 0.8)',
                'rgba(192, 57, 43, 0.8)',
                'rgba(255, 215, 0, 0.8)', 
              ],
              borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
              ],
              hoverOffset: 4,
              borderRadius:5,
              borderWidth:2,
            },
          ],
        },
        options:{
          cutout: '40%'
        }
      });
    }
  }, [nombresCategorias, cantidadStock]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Doughnut;
