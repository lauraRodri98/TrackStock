'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useArrayCategorias from '../component';
import Footer from "../Footer";

const page = () => {
  const { supplier, error, product, movement } = useArrayCategorias();
  const [registro, setRegistro] = useState([]);
  const [nombre, setNombre] = useState('');
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [visible, setVisible] = useState(false);
  const [filtrar, setFiltrar] = useState("");
  const [proveedores, setProveedores] = useState([]);
  
  useEffect(() => {
    setVisible(true);
    setProveedores(supplier); // Inicializa proveedores con los datos de supplier
  }, [supplier]); // Solo se ejecutará cuando supplier cambie

  const filtrarProductoPorProveedor = (id_proveedor) => {
    const productos = product.filter((p) => p.supplier === id_proveedor);
    return productos.map((p) => p.name);
  };

  const nombreProducto = (id) => {
    const nombre = product.filter((p) => p._id === id).map((p) => p.name);
    return nombre;
  };

  const buscar = (e) => {
    const palabra = e.target.value;
    setFiltrar(palabra);

    if (palabra === '') {
      setProveedores(supplier); // Restaurar todos los proveedores si no hay filtro
    } else {
      const proveedoresFiltrados = supplier.filter((s) =>
        s.name.toLowerCase().includes(palabra.toLowerCase()) ||
        s.email.toLowerCase().includes(palabra.toLowerCase()) ||
        s.phone.toLowerCase().includes(palabra.toLowerCase()) ||
        s.address.toLowerCase().includes(palabra.toLowerCase())
      );
      setProveedores(proveedoresFiltrados); // Actualizar el estado con los proveedores filtrados
    }
  };

  const mostrarProveedor = (id_proveedor) => {
    const proveedor = supplier.find((s) => s._id === id_proveedor);
    if (proveedor) {
      setNombre(proveedor.name);
      setProveedorSeleccionado(id_proveedor);
    }
    // Obtenemos los movimientos del proveedor
    const prod = product.filter((p) => p.supplier === id_proveedor)
      .map((n) => {
        const registrosProveedores = movement.filter((m) => (m.product_id === n._id) && m.type === "entrada");
        return registrosProveedores;
      }).flat();
    setRegistro(prod);
  };

  const convertirFecha = (date) => {
    const fecha = date.split('T', 1);
    const hora = date.slice(11, 16);
    return fecha + ' - ' + hora + 'h';
  };

  const precioTotal = (id, quantity) => {
    const precio = product.filter((p) => p._id === id).map((p) => p.price);
    return precio * quantity + '€';
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <header className={`text-xl pb-6 text-end transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} >Gestión de Proveedores</header>

      <main className={`flex-1 ml-64 text-xl pb-6 h-screen text-end transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} >
        <div className='flex gap-4 items-center justify-between flex-wrap mb-5 bg-white p-4 shadow-lg shadow-gray-300 rounded-lg'>
          <button className='bg-amber-500 px-5 py-3 rounded flex text-white hover:bg-amber-400 transition-all duration-300 ease-out'>
            NUEVO 
            <FontAwesomeIcon className='size-4 mt-1 ms-2' icon={faPlus} />
          </button>

          <form className='flex items-center w-96 space-x-4 min-w-24 '>
            <input className='search max-w-lg w-full border-gray-300 border-1 bg-gray-100 rounded' value={filtrar} onChange={buscar} placeholder='Nombre, categorias, productos, calle, ' />
            <FontAwesomeIcon className='size-5' icon={faMagnifyingGlass} />
          </form>
        </div>
        <div className='flex justify-between'>
          <div className="flex flex-wrap justify-between w-full gap-5">
            {proveedorSeleccionado && registro.length > 0 && (
              <div className="bg-white p-5 rounded-lg shadow-lg flex-auto w-3/12 mt-4">
                <h2 className="font-semibold text-3xl me-7">{nombre}</h2>
                <h2 className="text-gray-500 text-sm me-7">Historial de pedidos</h2>
              <div className="p-7">

                <div className='flex justify-center gap-7 mb-9 '>
                    <button className='bg-amber-500 px-5 py-3 w-64 rounded flex justify-center items-center text-white hover:bg-amber-400 transition-all duration-300 ease-out'>
                      Editar proveedor
                    </button>
                    <button className='bg-red-600 px-5 py-3 w-64 rounded flex justify-center items-center text-white hover:bg-red-500 transition-all duration-300 ease-out'>
                      Eliminar proveedor
                    </button>
                  </div>
                  <table className='table-auto w-full'>
                    <thead className="bg-sky-900 text-white">
                      <tr className='text-center'>
                        <th className='px-4 py-2'>Fecha</th>
                        <th className='px-4 py-2'>Productos</th>
                        <th className='px-4 py-2'>Unid</th>
                        <th className='px-4 py-2'>Precio total</th>
                        <th className='px-4 py-2'>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registro.map((m) => (
                        <tr key={m._id} >
                          <td className='p-4 text-center border-t border-gray-300 text-sm'>{convertirFecha(m.date)}</td>
                          <td className='p-4 text-center border-t border-gray-300 text-sm'>{nombreProducto(m.product_id)}</td>
                          <td className='p-4 text-center border-t border-gray-300 text-sm'>{m.quantity}</td>
                          <td className='p-4 text-center border-t border-gray-300 text-sm'>{precioTotal(m.product_id, m.quantity)}</td>
                          <td className='p-4 text-center border-t border-gray-300 text-sm'>{m.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg mt-4 px-5 flex-auto ">
              <p className='text-sm mt-5 text-start'>*Seleccion un proveedor para ver el Historial de pedidos</p>
              <table className='table-auto w-full mt-7'>
                <thead className="bg-sky-900  text-white">
                  <tr className='bg-sky-900 text-white text-center'>
                    <th className='px-4 py-2'>Nombre</th>
                    <th className='px-4 py-2'>Correo</th>
                    <th className='px-4 py-2'>Teléfono</th>
                    <th className='px-4 py-2'>Dirección</th>
                    <th className='px-4 py-2'>Suministra</th>
                  </tr>
                </thead>
                <tbody>
                  {proveedores && proveedores.length > 0 ? (
                    proveedores.map((m) => (
                      <tr onClick={() => mostrarProveedor(m._id)} className='hover:bg-slate-100 cursor-pointer' key={m._id}>
                        <td className='px-4 text-sm text-center py-2 border-t border-gray-300'>{m.name}</td>
                        <td className='px-4 text-sm text-center py-2 border-t border-gray-300'>{m.email}</td>
                        <td className='px-4 text-sm text-center py-2 border-t border-gray-300'>{m.phone}</td>
                        <td className='px-4 text-sm text-center py-2 border-t border-gray-300'>{m.address}</td>
                        <td className='w-80 text-sm text-center px-4 py-2 border-t border-gray-300'>
                          {filtrarProductoPorProveedor(m._id).length > 0 ? filtrarProductoPorProveedor(m._id).join(", ") : 'No hay productos'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No hay datos para mostrar</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
        <Footer/>
    </div>
  );
}

export default page;
