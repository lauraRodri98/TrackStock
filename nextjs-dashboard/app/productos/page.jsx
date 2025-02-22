'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus, faCircle, faChevronRight, faChevronLeft, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import ModalEliminar from './ModalEliminar';
import ModalEdit from './ModalEdit';
import api from "../../api/api";
import useArrayCategorias from "../component";
import Footer from '../Footer'

const page = () => {  
  const [isOpenModalEliminar, setIsModalEliminarOpen] = useState(false);
  const [isOpenModalEdit, setIsModalEdit] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [productoActualizar ,setProductoActualizar] = useState(null)
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [categorias, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [productosOriginales, setProductosOriginales] = useState([])
  const [totalProductos, setTotalProductos] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtrar, setFiltrar] = useState("");
  const itemsPage = 12;
  const {subcategory} = useArrayCategorias();
  const [arrSubcategory, setArrSubcategory] = useState([]);
  const [alertasCerradas, setAlertasCerradas] = useState([]);
  const [desvaneciendo, setDesvaneciendo] = useState({});
  const [productoEdit, setProductoEdit] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, movementRes, categoryRes] = await Promise.all([
          fetch(`${api}product`, { method: 'GET' }),
          fetch(`${api}moviment`, { method: 'GET' }),
          fetch(`${api}category`, { method: 'GET' }),
        ]);

        const productData = await productRes.json();
        const movementData = await movementRes.json();
        const categoryData = await categoryRes.json();

        if (productData.status === "error") {
          setError(productData.mensaje);
        } else {
          setProductos(productData.productos);
          setProductosOriginales(productData.productos);
          setTotalProductos(productData.productos.length);
        }

        if (movementData.status === "error") {
          setError(movementData.mensaje);
        } else {
          setMovimientos(movementData.movement);
        }

        if (categoryData.status === "error") {
          setError(categoryData.mensaje);
        } else {
          setCategory(categoryData.category);
        }
      } catch (err) {
        setError('Hubo un error al hacer la llamada a la API');
      }
    };

    fetchData();
  }, [shouldFetch]);

  const actualizarProductos = (event) => {
    const idCategoria = event.target.value;
    
    if (idCategoria === "" || idCategoria === "Todas") {
      setProductos(productosOriginales)
      setTotalProductos(productosOriginales.length)
      setArrSubcategory([])

    } else {
      setProductos(productosOriginales.filter((pro) => pro.category === idCategoria))
      setTotalProductos(productosOriginales.filter((pro) => pro.category === idCategoria).length)

      setArrSubcategory(subcategory.filter((s) => s.categoryId === idCategoria)); //Subcategorias del select/option
    }
  }

  const actualizarProductosPorSubcategoria = (event) => {
    const idSubcategoria = event.target.value;

    if (idSubcategoria === "" || idSubcategoria === "Todas") {
      setProductos(productosOriginales);
      setTotalProductos(productosOriginales.length);
    } else {
      const productosFiltrados = productosOriginales.filter((p) => p.subCategory === idSubcategoria);
      setProductos(productosFiltrados);
      setTotalProductos(productosFiltrados.length);
    }
  };

  // Actualizamos los valores de entrada y salida
  const calcularEntrada = (id) => {
    return movimientos.filter((mov) => mov.product_id === id && mov.type == "entrada")
      .reduce((acc, mov) => acc + mov.quantity, 0);
  }

  const calcularSalida = (id) => {
    return movimientos.filter((mov) => mov.product_id === id && mov.type == "salida")
      .reduce((acc, mov) => acc + mov.quantity, 0);
  }

  const nombreCategoria = (id_categoria) => {
    const categoria = categorias.find(cat => cat._id === id_categoria);
    return categoria ? categoria.name : "Desconocida";
  };

  const nombreSubcategoria = (id_subcategory) => {
    const nombre = subcategory.find(s => s._id === id_subcategory);
    
    if(nombre){
      return nombre.name;
    }else{
      return "Desconocido"
    }
  }

  const truncarDecimal =(numero, decimal) => {
    const factor = Math.pow(10, decimal);
    return Math.trunc(numero * factor) / factor;
  }

  const openModalEliminar = (productoId) => {
    setProductoAEliminar(productoId); 
    setIsModalEliminarOpen(true);
  };

  const openModalEdit = (productoId) => {
    setProductoActualizar(productoId)
    setIsModalEdit(true)
  }

  const eliminarProducto = async (id_producto) => {
    if (!productoAEliminar) return;
  
    try {
      // Llamada a la API para eliminar el producto
      const response = await fetch(`${api}deleteproduct/${id_producto}`, { method: 'DELETE' });
      if (response.ok) {
        // Si la respuesta es exitosa, actualizamos el estado de productos
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto._id !== id_producto)
        );

        closeModalEliminar();
        setShouldFetch((prev) => !prev); 
      } else {
        const data = await response.json();
        setError(data.mensaje || "Error al eliminar el producto");
      }
    } catch (error) {
      setError('Hubo un error al hacer la llamada a la API');
    }
  };

  //Buscador
  const buscar = (e) => {
    const palabra = e.target.value;

    setFiltrar(palabra);

    if (palabra === '') {
      setProductos(productosOriginales);
      setTotalProductos(productosOriginales.length) 
    } else {
      const productosFiltrados = productosOriginales.filter((p) => 
        p.name.toLowerCase().includes(palabra.toLowerCase()) 
        || p.id_producto.toLowerCase().includes(palabra.toLowerCase())
      );
      setProductos(productosFiltrados);
      setTotalProductos(productosOriginales.length)//-- Mirar esto
    }
  };

  const getQuantityClass = (quantity) => {
    if (!quantity) return "Sin cantidad";
    if (quantity < 10) return "text-red-600 font-semibold";
    if (quantity < 20) return "text-orange-400 font-semibold";
    return "";
  };

  const totalPages = Math.ceil(productos.length / itemsPage);
  const indexOfLastItem = currentPage * itemsPage;
  const indexOfFirstItem = indexOfLastItem - itemsPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const cerrarAlerta = (id) => {
    setDesvaneciendo((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAlertasCerradas((prev) => [...prev, id]);
    }, 200);
  };

  const closeModalEliminar = () => {
    setIsModalEliminarOpen(false)
    setShouldFetch((prev) => !prev); // Actualiza los datos después de cerrar el modal
  };
  const closeModalEdit = () => {
    setIsModalEdit(false);
    setShouldFetch((prev) => !prev); // Actualiza los datos después de cerrar el modal
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setShouldFetch((prev) => !prev);
  };
  const openModal = () => setIsModalOpen(true);

  return (
    <div >
      <header className={`text-xl pb-6 text-end transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>Gestión de Productos</header>
      
      <main className={`flex-1 ml-64 mb-14 transition-all flex flex-col min-h-screen duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      {productos && productos.length ? (
          productos.map((p) => (
            p.quantity <= 10 && !alertasCerradas.includes(p._id) ? (
              <div
                key={p._id}
                className={`rounded-xl p-2 bg-red-300 w-full mb-2 text-gray-800 shadow-md border-red-600 flex justify-between transition-opacity duration-500 ease-out ${
                  desvaneciendo[p._id] ? 'opacity-0' : 'opacity-100'
                }`}
              >
                El producto {p.name} se encuentra por debajo del Stock
                <button onClick={() => cerrarAlerta(p._id)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ) : null
          ))
        ) : (
          <></>
        )}
      
        <div className='flex items-center justify-between mb-5 bg-white p-4 shadow-lg shadow-gray-300 rounded-lg'>
          <div>
            <button onClick={openModal} className='bg-amber-500 px-8 py-2 rounded flex text-white hover:bg-amber-400 transition-all duration-300 ease-out'>
              NUEVO
              <FontAwesomeIcon className='size-4 mt-1 ms-2' icon={faPlus} />
            </button>
          </div>
          <form>
            <div className="flex items-center me-5">
              <input
                onChange={buscar}
                value={filtrar}
                className="search max-w-lg w-full border-gray-300 border-1 bg-gray-100 rounded"
                placeholder="Nombre, id ..."
              />
              <button type="button">
                <FontAwesomeIcon className="size-5 pl-2" icon={faMagnifyingGlass} />
              </button>
            </div>
          </form>
          <form className='flex items-center space-x-4'>
            <div className='me-5'>
              <label>Por Categoría:</label>
              <select id="cars" name="cars" className='ml-2 border-gray-300 border-1 bg-gray-100 rounded w-44' onChange={actualizarProductos}>
                <option value="Todas">Todas</option>
              {categorias.length > 0 ? (
                categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))
              ) : (
                <option>No hay categorías disponibles</option>
              )}
              </select>             
            </div>
            <div>
              <label>Por Subcategoría:</label>
              <select id="cars" name="cars" className='ml-2 border-gray-300 border-1 bg-gray-100 rounded w-52'  onChange={actualizarProductosPorSubcategoria}>
                <option value="Todas">Todas</option>
                {arrSubcategory && arrSubcategory.length > 0 ? (
                  arrSubcategory.map((arrSub) => {
                    return(
                      <option key={arrSub._id} value={arrSub._id}>{arrSub.name}</option>
                    )
                  })
                ):(
                  <option>No hay subcateogorías</option>
                )}
              </select>              
            </div>
          </form>

        </div>

        <div className='bg-white p-4 px-5 shadow-lg shadow-gray-300 rounded-lg mb-5 flex justify-between'>
          <p className='text-gray-500'>{totalProductos} artículos registrados</p>
          <div className='flex flex-row flex-wrap'>
            <p className='font-semibold me-3'><FontAwesomeIcon icon={faCircle} className='text-orange-300' /> Stock Bajo</p>
            <p className='font-semibold '><FontAwesomeIcon icon={faCircle} className='text-red-700' /> Sin Stock</p>
          </div>
        </div>

        <div className='bg-white p-4 shadow-lg shadow-gray-300 rounded-lg'>
          {(!currentItems) ? 
            (<p>{error}</p>) : (
            <table className='table-auto w-full'>
              <thead className="bg-sky-900 text-white">
                <tr>
                  <th className='px-4 py-2'>Nombre</th>
                  <th className='px-4 py-2'>Id</th>
                  <th className='px-4 py-2'>Categoría</th>
                  <th className='px-4 py-2'>Subcategoría</th>
                  <th className='px-4 py-2'>Cant de Stock</th>
                  <th className='px-4 py-2'>Entrada</th>
                  <th className='px-4 py-2'>Salidas</th>
                  <th className='px-4 py-2'>Precio Unitario</th>
                  <th className='px-4 py-2'>Precio Neto</th>
                  <th className='px-4 py-2'>Precio Total</th>
                  <th className='px-4 py-2'></th>
                  <th className='px-4 py-2'></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentItems) && currentItems.length > 0 ? (
                  currentItems.map((product) => (
                    <tr key={product._id}>
                      <td className="px-4 py-2 text-center">{product.name}</td>
                      <td className="px-4 py-2 text-center">{!product.id_producto ? 0 : product.id_producto}</td>
                      <td className="px-4 py-2 text-center">{nombreCategoria(product.category)}</td>
                      <td className="px-4 py-2 text-center">{nombreSubcategoria(product.subCategory)}</td>
                      {
                        <td className={`px-4 py-2 text-center ${getQuantityClass(product.quantity)}`}>
                          {product.quantity || "Sin cantidad"}
                        </td>
                      }
                      <td className="px-4 py-2 text-center">{calcularEntrada(product._id)}</td>
                      <td className="px-4 py-2 text-center">{calcularSalida(product._id)}</td>
                      <td className="px-4 py-2 text-center">{product.price}€</td>
                      <td className="px-4 py-2 text-center">{truncarDecimal((product.price)*(product.quantity), 2)}€</td>
                      <td className="px-4 py-2 text-center">{truncarDecimal((product.price*(product.quantity)*1.21), 2)}€</td>
                      <td className="px-4 py-2 text-center hover:text-sky-900">
                        <button onClick={() => openModalEdit(product)}><FontAwesomeIcon className='size-4 text-sky-95' icon={faPen}/></button>
                      </td>
                      <td className="px-4 py-1 text-center hover:text-sky-900">
                        <button onClick={() => openModalEliminar(product._id)}>
                          {/* {setProductoEdit(product._id)} */}
                          <FontAwesomeIcon className='size-4 text-sky-95' icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={10} className="text-center">No se encontraron productos</td></tr>
                )}
              </tbody>
            </table>)}
            {productos.length >12  && productos ? (
              <div className='flex justify-center mt-5'>
                <button className='border border-spacing-1 border-gray-600 rounded px-3 py-1 me-1 hover:bg-sky-800 hover:text-white transition duration-300' onClick={prevPage} disabled={currentPage === 1}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
  
                <button className='border border-spacing-1 border-gray-600 rounded px-3 py-1 hover:bg-sky-800 hover:text-white transition duration-300' onClick={nextPage} disabled={currentPage === totalPages}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            ):(
              <div></div>
            )}
        </div>
      </main>
      <Footer/>
      <ModalEliminar className="transition-opacity opacity-0 duration-500 ease-in-out transform" isOpen={isOpenModalEliminar} onClose={closeModalEliminar} onConfirm={() => eliminarProducto(productoAEliminar)} />
      <ModalEdit isOpen={isOpenModalEdit} onClose={closeModalEdit} producto={productoEdit} categorias={categorias} selectedProduct={productoActualizar}/>
      <Modal isOpen={isOpenModal} onClose={closeModal}  categorias={categorias}/>
    </div>
  );
};

export default page;

//-- Hacer "funcional" el botón de editar