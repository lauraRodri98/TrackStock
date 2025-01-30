'use client';
import api from "../../api/api";
import { useEffect, useState } from 'react';
import useArrayCategorias from '../component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, children, categorias}) => {
    // const [color, setColor] = useState("undefined");
    const [formProducto, setFormProductos] = useState({
      name:'',
      id_producto:'',
      description:'',
      price: 0,
      quantity: 0,
      category: '',
      subCategory: '',
      supplier: '',
    });
    const {supplier, subcategory} = useArrayCategorias();
    // const [selectCategoria, setSelectCategoria] = useState('');
    const [selectSubcategoria, setSelectSubcategoria] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Hacer llamada a la API
    console.log(formProducto);
  
    try {
      const url = `${api}create`;
      const data = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formProducto)
      });
  
      // Verifica si la respuesta es exitosa
      if (data.ok) {
        const response = await data.json();
        setShouldFetch((prev) => !prev);
        
        // Verifica la respuesta JSON
        alert("El producto se ha actualizado con éxito: ");
        e.target.reset();
        onClose();
      } else {
        const errorResponse = await data.json();
        alert("No se ha actualizado el producto: " + (errorResponse.mensaje || "Error desconocido"));
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error en la solicitud.");
    }
  };
  

  // const filtrarSubCar = (id_categoria) => {
  //   setSelectSubcategoria(subcategory.filter((c) => c.categoryId === id_categoria))
  // }

  const handleCategoriaChange = (e) => {
    const { value } = e.target;
    setFormProductos((prevState) => ({
      ...prevState,
      category: value,
      subCategory: '', // Resetea la subcategoría al cambiar la categoría
    }));
    // Filtra subcategorías basándote en la categoría seleccionada
    const subcategoriasFiltradas = subcategory.filter(
      (sub) => sub.categoryId === value
    );
    setSelectSubcategoria(subcategoriasFiltradas);
  };

  const handleSupplierChange = (e) => {
    const { value } = e.target; // ID del proveedor seleccionado
    setFormProductos((prevState) => ({
      ...prevState,
      supplier: value, // Actualiza el proveedor en el estado
    }));
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProductos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div onClick={handleOverlayClick} className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-white p-5 w-modalFormulario px-8 rounded-lg shadow-lg flex flex-row flex-wrap">
            <div className='flex w-full justify-around items-center mb-7'>
            <p className=" text-center text-2xl">Añadir nuevo producto</p>
              <button
                onClick={onClose}
                className= "text-xl text-gray-600"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div>{children}</div>
            
            <div className="w-full">
              <form className="w-full" onSubmit={handleSubmit}>

                <div className="flex flex-wrap flex-row flex-1 justify-between">
                  <div className="flex flex-col flex-wrap justify-start">
                    <label className='mb-3' htmlFor="">Nombre</label><br />
                    <input className='bg-gray-100 border-gray-200 rounded mt-2 mb-4 h-8 w-40' name='name' onChange={handleChange} required type="text" /><br />

                    <label className='mb-3' htmlFor="">Descripcion</label><br />
                    <input className='bg-gray-100 border-gray-200 rounded mb-4 mt-2 h-8 w-40' name='description' onChange={handleChange} required type="text" /><br />
                  
                    <label className='mb-3' htmlFor="">Categoría</label><br />
                    <select className='bg-gray-100 border-gray-200 rounded mt-2 mb-4' onChange={handleCategoriaChange} value={formProducto.category} required name="category">
                      <option>Seleccionar</option>
                      {categorias && categorias.length > 0 ? (
                        categorias.map((c) => (
                        <option key={c._id} value={c._id} className='bg-gray-100 border-gray-200 rounded mb-4 h-8'>{c.name}</option>
                        ))
                      ):(
                        <option className='bg-gray-100 border-gray-200 rounded mb-4'>No hay categorías</option>
                      )
                    }
                    </select><br />

                    <label className='mb-3' htmlFor="">Subcategoría</label><br />
                    <select className='bg-gray-100 border-gray-200 rounded mt-2 mb-4' name="subCategory">
                      <option>Seleccionar</option>
                      {selectSubcategoria && selectSubcategoria.length > 0 ? (
                        selectSubcategoria.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))
                      ) : (
                        <option value="">Seleccionar</option>
                      )}
                      <option value="null">Sin subcategoría</option>
                    </select>
                    <br/>
                  </div>

                  <div className="flex flex-col flex-wrap justify-start">
                    <label htmlFor="" className="mb-3">Cantidad</label>
                    <input type="number" className= "mt-2 mb-4 w-20 bg-gray-100 border-gray-200 rounded h-8" name="quantity" id="" onChange={handleChange} required />

                    <label htmlFor="" pattern='[0-9]' className="mb-3">Precio &#40;€&#41;</label><br/>
                    <input type="text" className="mt-2 mb-4 w-20 bg-gray-100 border-gray-200 rounded h-8" name="price" id="" onChange={handleChange} required />    

                    <label htmlFor="" className='mb-3'>Proveedor</label><br />
                    <select className='bg-gray-100 border-gray-200 rounded mt-2 mb-4' required name="supplier" onChange={handleSupplierChange} id="">
                      <option>Seleccionar</option>
                      {supplier && supplier.length ? (
                          supplier.map((s) => (
                          <option key={s._id} value={s._id}>{s.name}</option>
                        ))
                      ): (
                        <option>No hay proveedor</option>
                      )}
                        
                    </select><br />

                    <label htmlFor="" className="mb-3">Id &#40;XXX000&#41;</label>
                    <input type="text" className= "mt-2 mb-4 w-20 bg-gray-100 border-gray-200 rounded h-8" name="id_producto" id="" onChange={handleChange} required />
                  </div>
                </div> 
               
                {/* <label className='mb-4' htmlFor="">Color</label><br />
                <button value="white" onClick={() => colorProducto("white")} className='transition-all duration-300 ease-out hover:bg-gray-100 bg-white border w-6 h-6 mx-2 rounded'></button>
                <button value="yellow" onClick={() => colorProducto("yellow")} className='transition-all duration-300 ease-out hover:bg-yellow-400 bg-yellow-300 w-6 h-6 mx-2 rounded'></button>
                <button value="orange" onClick={() => colorProducto("orange")} className='transition-all duration-300 ease-out hover:bg-orange-600 bg-orange-500 w-6 h-6 mx-2 rounded'></button>
                <button value="red" onClick={() => colorProducto("red")} className='transition-all duration-300 ease-out hover:bg-red-700 bg-red-600 w-6 h-6 mx-2 rounded'></button>
                <button value="pink" onClick={() => colorProducto("pink")} className='transition-all duration-300 ease-out hover:bg-pink-600 bg-pink-500 w-6 h-6 mx-2 rounded'></button>
                <button value="violet" onClick={() => colorProducto("violet")} className='transition-all duration-300 ease-out hover:bg-fuchsia-900 bg-fuchsia-800 w-6 h-6 mx-2 rounded'></button>
                <button value="blue" onClick={() => colorProducto("blue")} className='transition-all duration-300 ease-out hover:bg-blue-700 bg-blue-600 w-6 h-6 mx-2 rounded'></button>
                <button value="green" onClick={() => colorProducto("green")} className='transition-all duration-300 ease-out hover:bg-green-700 bg-green-600 w-6 h-6 mx-2 rounded'></button>
                <button value="black" onClick={() => colorProducto("black")} className='transition-all duration-300 ease-out bg-black hover:bg-gray-700 w-6 h-6 mx-2 rounded'></button><br /><br /> */}
                {/* <label htmlFor="mb-4">Imagen</label><br />
                <input type="file" id="imageUpload" name="image" accept="image/*" className="border p-2 mt-2 rounded-lg bg-gray-100"/> */}
                <div className="modal-actions flex items-center justify-center mt-5">
                  <button type='submit' className='px-6 py-3 transition-all duration-200 ease-in-out text-white active:bg-amber-500 bg-amber-500 hover:bg-amber-400  rounded-md'>Nuevo</button>
                  <button onClick={onClose} className='px-5 py-3 ms-4 transition-all duration-200 ease-in-out border border-amber-500 border-1 text-amber-600 hover:text-white active:bg-amber-500 hover:bg-amber-400 rounded-md'>Cancelar</button>
                </div>
              </form>
           </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
