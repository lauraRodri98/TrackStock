'use client';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faBoxesStacked, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import useArrayCategorias from './component';
import api from "../api/api";
import BarChart from './Barchart';
import Doughnut from './Doughnut';
import Line from './Line';
// import pdfinfo from '../public/pdfs/PDF_info'; //Página para descargar el pdf con la info
import Footer from "./Footer";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PDFViewer from "./PDFViewer";

export default function Page() {
  const [errorF, setErrorF] = useState('');
  const [totalProductos, setTotalProductos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [entradas, setEntradas] = useState(0);
  const [salidas, setSalidas] = useState(0);
  const [arrayProductos, setArrayProductos] = useState([]);
  const [productBajoMovimiento, setProductBajoMovimiento] = useState([]);
  const [totalSalidas, setTotalSalidas] = useState(0);
  const [mesActual, setMesActual] = useState('');
  const [arrayMovimientos, setArrayMovimientos] = useState([]);
  const {category,  error} = useArrayCategorias();
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [fechaActual, setMes] = useState(new Date());
  const [cargando, setCargando] = useState(true); //Cargando la pagina
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const precioProductoEntrada = (ids) => {
    let totalPrecio = 0;
  
    ids.forEach((id) => {
      const producto = arrayProductos.find((idProd) => idProd._id === id);
      if (producto && producto.price) {
        totalPrecio += producto.price;
      }
    });
  
    return totalPrecio;
  };

  useEffect(() => {

  }, [category, error]);

  useEffect(() => {
    const fechaActual =  new Date();
    const mes = fechaActual.getMonth();

    const mesesAño = [
          "Enero", 
          "Febrero", 
          "Marzo", 
          "Abril", 
          "Mayo", 
          "Junio", 
          "Julio", 
          "Agosto", 
          "Septiembre", 
          "Octubre", 
          "Noviembre", 
          "Diciembre"
        ];
    const nombreMes = mesesAño[mes];
    setMesActual(nombreMes);

  },[]);

  useEffect(() => {
    setTimeout (() => {

      const fetchData = async () => {
        try {
          const productosFetch = await fetch(`${api}product`, { method: 'GET' });
          const productosData = await productosFetch.json();
          // console.log(productosData)
    
          if (productosData.status === "success") {
    
            setArrayProductos(productosData.productos);
            setTotalProductos(
              productosData.productos.reduce((total, product) => total + product.quantity, 0)
            );
          
            // Revisar esto, poner la cantidad de tiempo que ha estado sin movimiento
            // const bajoMovimiento = productosData.productos.filter((p) => p.quantity < 10)
            // setProductBajoMovimiento(bajoMovimiento);
    
            setValorTotal(
              productosData.productos.reduce((total, product) => total + product.quantity * product.price, 0)
            );
          } else {
            setErrorF(productosData.mensaje);
          }
    
          const movimientos = await fetch(`${api}moviment`, { method: "GET" });
          const movimientosData = await movimientos.json();
    
          if (movimientosData.status === "success") {
            const entradasMovimientos = movimientosData.movement.filter((m) => m.type === "entrada");
            const salidasMovimientos = movimientosData.movement.filter((m) => m.type === "salida");
    
            setEntradas(entradasMovimientos.reduce((total, m) => total + m.quantity, 0));
            setSalidas(salidasMovimientos.reduce((total, m) => total + m.quantity, 0));
            setArrayMovimientos(movimientosData.movement);

            const precio = precioProductoEntrada(movimientosData.movement.map((m) => m._id));
            setTotalSalidas(precio);

            const fecha = movimientosData.movement.filter((m) =>
            {
              const mesMilisegundos = 30*24*60*60*1000;
              const fechaLimite = Date.now() - mesMilisegundos;

              return Date.parse(m.date) >= fechaLimite && m.quantity === 0;
            }
          )
            console.log(fecha)

          } else {
            setErrorF(movimientosData.mensaje);
          }
        } catch (error) {
          setErrorF("Error al hacer la llamada a la API");
          setTotalProductos(0);
        }
      };

      fetchData();

      setCargando(false);
    }, 2000)
  }, []);

  useEffect(() => {
    if (arrayMovimientos.length > 0 && arrayProductos.length > 0) {
      const mesDateActual = fechaActual.getMonth();
      const añoDateActual = fechaActual.getFullYear();
       
      const productosSalidasMesActual = arrayMovimientos.filter((mov) => {
        const mesProducto = new Date(mov.date).getMonth();
        const añoProducto = new Date(mov.date).getFullYear();
        return (
          mesProducto === mesDateActual &&
          // añoProducto === añoDateActual &&
          mov.type === "salida"
        );
      });

      // console.log(productosSalidasMesActual)
  
      const productosTopCinco = Object.entries(
        productosSalidasMesActual.reduce((acc, mov) => {
          acc[mov.product_id] = (acc[mov.product_id] || 0) + mov.quantity;
          return acc;
        }, {})
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([product_id, quantity]) => {
          const product = arrayProductos.find((p) => p._id === product_id);
          return {
            name: product ? product.name : "Desconocido",
            quantity,
          };
        });
  
      setProductosMasVendidos(productosTopCinco);
    }
  }, [arrayMovimientos, arrayProductos, fechaActual]);
  
//   console.log("productos mas vendidos")
// console.log(productosMasVendidos)
  
  const nombreCategoria = (id_categoria) => {
    const categoria = category.find(cat => cat._id === id_categoria);
    return categoria ? categoria.name : "Desconocida";
  };

  const datosEstadisticas = {
    valorTotal: {valorTotal},
    totalProductos: {totalProductos},
    totalSalidas: {totalSalidas},
    salidas: {salidas},
    entradas: {entradas}
  }

  return (
    <>
      <main  className= {`bg-gray-100 flex-1 ml-64 text-xl pb-6 text-end transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <header className="flex flex-wrap flex-row justify-between">
          <div className="bg-white min-w-[220px] p-5 rounded-lg shadow-lg w-44 text-center m-1 flex justify-center items-center flex-wrap border-2 border-sky-300">
            <p className="uppercase font-semibold flex flex-wrap justify-center">Valor total inventario</p>
            <span className="text-xl text-center font-bold text-sky-600">{valorTotal}€</span>
          </div>
          <div className="bg-white p-5 min-w-[220px] rounded-lg shadow-lg w-44 text-center m-1">
            <p className="uppercase font-semibold flex items-center flex-wrap justify-center">
              Total productos Stock
            </p>
            <span className="text-xl font-bold text-sky-600">{totalProductos}</span>
          </div>
          {/* <div className="bg-white p-5 min-w-[220px] rounded-lg shadow-lg w-44 text-center m-1 flex justify-center items-center flex-wrap">
            <p className="uppercase font-semibold">Total entradas devoluciones</p>
            <span className="text-xl font-bold text-sky-600">{totalSalidas}</span>
          </div> */}
          <div className="bg-white p-5 min-w-[220px] rounded-lg shadow-lg w-44 text-center m-1 flex justify-center items-center flex-col border-2 border-green-300">
            <p className="uppercase font-semibold flex justify-center">Salidas
              <FontAwesomeIcon className="size-4 mt-2 m-2 text-green-400" icon={faArrowDown} />
            </p>
            <span className="text-xl font-bold text-green-400 ">{salidas}</span>
          </div>
          <div className="bg-white min-w-[220px] p-5 rounded-lg shadow-lg w-44 text-center m-1 flex justify-center items-center flex-col border-2 border-red-300">
            <p className="uppercase font-semibold flex justify-center">Entradas
              <FontAwesomeIcon className="size-4 mt-2 m-2 text-red-400" icon={faArrowUp} />
            </p>
            <span className="text-xl font-bold text-red-400 ">{entradas}</span>
          </div>
          <div className="shadow-lg w-44 min-w-[220px] text-center m-1 bg-amber-500 flex items-center flex-wrap hover:bg-amber-400 active:bg-amber-600 transition-all duration-300 ease-in-out text-white p-5 rounded-lg">
            {/* <button onClick={handleDownloadPDF}  className="flex justify-center flex-wrap items-center "> 
              <FontAwesomeIcon className="size-8 mt-1 m-2" icon={faFileArrowDown} />
            </button> */}
            {/* <PDFDownloadLink document={<pdfinfo />} fileName="/pdfs/informe.pdf">
              {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
            </PDFDownloadLink>
            <PDFViewer /> */}

          </div>
        </header>

        <section className="flex flex-wrap justify-between ">

          <div className="flex flex-wrap justify-between w-full gap-5">
            <div className="bg-white rounded-lg shadow-lg mt-4 grid flex-auto text-center">
              <h2 className="font-semibold text-xl mt-5">Productos más vendidos en {mesActual}</h2>
              <BarChart productos={productosMasVendidos} className="h-full"/>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-lg flex-auto w-4/12 mt-4 text-center">
              <h2 className="font-semibold text-xl">Capacidad de stock/productos</h2>
              <div className="mt-8 p-7">
                <Doughnut categorias={category} productos={arrayProductos} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-lg mt-4 lg:ms-4 w-full text-center">
            <h2 className="font-semibold text-xl">Productos sin movimientos en los últimos 30 días</h2>
            <div>
              <table className='table-auto w-full mt-7'>
                {productBajoMovimiento.length > 0 && productBajoMovimiento ? (
                  <thead className="bg-sky-950 text-white">
                    <tr>
                      <th className='px-4 py-2'>Nombre</th>
                      <th className='px-4 py-2'>Categorías</th>
                      <th className='px-4 py-2'>Id</th>
                      <th className='px-4 py-2'>Cant. actual</th>
                      <th className='px-4 py-2'>Días sin movimiento</th>
                      <th className='px-4 py-2'>Valor total</th>
                      <th className='px-4 py-2'>Fecha último movimiento</th>
                    </tr>
                  </thead>
                ) : (
                  <thead></thead>
                )}
                
                <tbody>
                  {productBajoMovimiento.length > 0 && Array.isArray(productBajoMovimiento) ?
                  (
                    (productBajoMovimiento.map((p) =>{
                      return(
                        <tr key={p._id}>
                          <td className="px-4 py-2 text-center">{p.name}</td>
                          <td className="px-4 py-2 text-center">{nombreCategoria(p.category)}</td>
                          <td className="px-4 py-2 text-center">{p.id_producto}</td>
                          <td className="px-4 py-2 text-center">{p.quantity}</td>
                          <td className="px-4 py-2 text-center"></td>
                          <td className="px-4 py-2 text-center">{p.price}€</td>
                          <td className="px-4 py-2 text-center"></td>
                        </tr>                      
                      )
                    }))
                  )
                  :
                  (
                    <tr>
                      <td colSpan="7" className="px-4 py-2 text-center">
                        No hay productos por debajo del stock actualmente
                      </td>
                    </tr>
                  )}
                    
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg mt-4 lg:ms-4 w-full text-center">
            <h2 className="font-semibold text-xl">Evaluación de los últimos 12 meses</h2>
            <div className="h-96 pt-8">
              <Line categorias={category} productos={arrayProductos} movimientos={arrayMovimientos}/>
            </div>
          </div>
        </section>
      </main>
      <Footer/>  
    </>
  );
}

//-- *Productos sin movimientos recientes* -> añadir a la base de datos ejemplos
//-- Crear PDF
//-- Total entradas devoluciones
//-- AÑADIR EL AÑO añoProducto === añoDateActual (BARCHART)


// 'rgba(30, 58, 138, 1)',
// 'rgba(56, 189, 248, 1)',
// 'rgba(34, 197, 94, 1)',