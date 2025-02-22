'use client';
import api from "../../api/api";
import { useEffect, useState } from 'react';
import useArrayCategorias from '../component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, children, categorias, selectedProduct}) => {
    const [formProducto, setFormProductos] = useState({
      name: '',
      description: '',
      category: '',
      subCategory: '',
      quantity: 0,
      price: 0,
      supplier: '',
      id_producto: '',
    });
    const {supplier, subcategory} = useArrayCategorias();
    // const [selectCategoria, setSelectCategoria] = useState('');
    const [selectSubcategoria, setSelectSubcategoria] = useState('');
    console.log("Producto seleccionado")
    console.log(selectedProduct)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (selectedProduct) {
        setFormProductos({
          name: selectedProduct.name || '',
          id_producto: selectedProduct.id_producto || '',
          description: selectedProduct.description || '',
          price: selectedProduct.price || 0,
          quantity: selectedProduct.quantity || 0,
          category: selectedProduct.category || '',
          subCategory: selectedProduct.subCategory || '',
          supplier: selectedProduct.supplier || '',
        });
      }
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Hacer llamada a la API
    console.log("Form");
    console.log(formProducto);
  
    try {
      const url = `${api}update`;
      const data = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formProducto)
      });

      if (data.ok) {
        const response = await data.json();
        setShouldFetch((prev) => !prev);

        alert("El producto se ha guardado con éxito: " + response);
        
        e.target.reset();
        onClose();
      } else {
        const errorResponse = await data.json();
        alert("No se ha guardado el producto: " + (errorResponse.mensaje || "Error desconocido"));
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error en la solicitud.");
    }
  };

  const handleCategoriaChange = (e) => {
    const { value } = e.target;
    setFormProductos((prevState) => ({
      ...prevState,
      category: value,
      subCategory: '',
    }));
    // Filtra subcategorías basándote en la categoría seleccionada
    const subcategoriasFiltradas = subcategory.filter(
      (sub) => sub.categoryId === value
    );
    setSelectSubcategoria(subcategoriasFiltradas);
    // console.log(selectSubcategoria)
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
            <div className='flex w-full items-center mb-7'>
              <div className="flex justify-center ms-5 w-full">
                <p className=" text-center text-2xl">Modificar</p>
              </div>
              <div className="flex justify-end w-10">
                <button onClick={onClose} className= "text-xl text-gray-600">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              
            </div>
            <div>{children}</div>
            
            <div className="w-full">
              <form className="w-full" onSubmit={handleSubmit}>

                <div className="flex flex-wrap flex-row flex-1 justify-between">
                  <div className="flex flex-col flex-wrap justify-start">
                    <label className='mb-3' htmlFor="">Nombre</label><br />
                    <input className='bg-gray-100 border-gray-200 rounded mt-2 mb-4 h-8 w-40' value={formProducto.name} name='name' onChange={handleChange} required type="text" /><br />

                    <label className='mb-3' htmlFor="">Descripcion</label><br />
                    <input className='bg-gray-100 border-gray-200 rounded mb-4 mt-2 h-8 w-40' value={formProducto.description} name='description' onChange={handleChange} required type="text" /><br />
                  
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
                    </select><br/>

                    <label className='mb-3' htmlFor="">Subcategoría</label><br />
                    <select className='bg-gray-100 border-gray-200 rounded mt-2 mb-4' value={formProducto.subCategory} onChange={handleChange} name="subCategory">
                      {/* <option>Seleccionar</option> */}
                      {selectSubcategoria && selectSubcategoria.length > 0 ? (
                        selectSubcategoria.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))
                      ) : (
                        <option disabled value="">Sin subcategoría</option>
                      )}
                      {/* <option value="null">Sin subcategoría</option> */}
                    </select>
                    <br/>
                  </div>

                  <div className="flex flex-col flex-wrap justify-start">
                    <label htmlFor="" className="mb-3">Cantidad</label>
                    <input type="number" className= "mt-2 mb-4 w-20 bg-gray-100 border-gray-200 rounded h-8" value={formProducto.quantity} name="quantity" id="" onChange={handleChange} required />

                    <label htmlFor="" pattern='[0-9]' className="mb-3">Precio &#40;€&#41;</label><br/>
                    <input type="number" className="mt-2 mb-4 w-20 bg-gray-100 border-gray-200 rounded h-8" value={formProducto.price} name="price" id="" onChange={handleChange} required />    

                    <label htmlFor="" className='mb-3'>Proveedor</label><br />
                    <select className='bg-gray-100 border-gray-200 rounded mt-2 mb-4' value={formProducto.supplier} required name="supplier" onChange={handleSupplierChange} id="">
                      <option>Seleccionar</option>
                      {supplier && supplier.length ? (
                          supplier.map((s) => (
                          <option key={s._id} value={s._id}>{s.name}</option>
                        ))
                      ): (
                        <option>No hay proveedor</option>
                      )}
                        
                    </select><br />

                    <label htmlFor=""  className="mb-3">Id &#40;XXX000&#41;</label>
                    <input type="text" maxLength='6' value={formProducto.id_producto} className= "mt-2 mb-4 w-24 bg-gray-100 border-gray-200 rounded h-8" name="id_producto" id="" onChange={handleChange} required />
                  </div>
                </div> 

                <div className="modal-actions flex items-center justify-center mt-5">
                  <button type='submit' className='px-6 py-3 transition-all duration-200 ease-in-out text-white active:bg-amber-500 bg-amber-500 hover:bg-amber-400  rounded-md'>Actualizar</button>
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
