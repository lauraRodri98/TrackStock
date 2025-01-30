import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import api from "../../api/api";

const Modal = ({ isOpen, onClose, recargarCategorias }) => {
  const [imagen, setImage] = useState(""); 
  const [name, setName] = useState(""); 
  // const [imagenSeleccionada, setImagenSeleccionada] = useState(false);
  const imagenes = [
    "baloncesto.png", "bicicleta.png", "bota-tacon.png", "boton-movil.png", 
    "cajon.png", "camara.png", "camiseta.png", "computadora.png", "lentes.png", 
    "libro-marcador.png", "ordenador-portatil.png", "oso-de-peluche.png", "raton.png", 
    "sombrero-de-invierno.png", "teclado.png", "voleibol.png", "imprimir.png", 
    "lapiz.png", "cuaderno-alternativo.png", "anillo-de-diamante.png", "guante-de-boxeo.png", 
    "mochila.png", "secadora.png", "microonda.png", "silla-de-oficina.png", 
    "consola-de-juegos-portatil-con-manivela.png"
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
  };

  const handleImageClick = (imagen) => {
    // setImagenSeleccionada(true)
    setImage(imagen);
    console.log(imagen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name +" " + imagen)

    try {
      const url = `${api}createcategory`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, imagen })
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error('Error al crear la categoría');
      }

      console.log('Categoría creada:', data);
      alert(`Se ha creado una nueva categoría: ${name} con imagen ${imagen}`);

      // setName("");
      // setImage("");
      await recargarCategorias();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al crear la categoría');
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <section
          onClick={handleOverlayClick}
          className="w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center fixed top-0 left-0 z-50"
        >
          <main className="w-96 p-7 bg-white rounded shadow-lg shadow-gray-500">
            <header className="flex flex-1 justify-end">
              <div className='flex flex-1 justify-start'>
                  <p className='text-2xl mb-5'>Crear categoría</p>
              </div>              
              <button onClick={handleClose} className="text-xl pb-3">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </header>


            <form className="flex flex-col justify-start items-start" onSubmit={handleSubmit}>
              <label className="mb-2">Nombre:</label>
              <input
                required
                value={name}
                name="name"
                onChange={handleChange}
                className="bg-gray-100 border-gray-200 rounded mt-2 mb-4 h-8"
              />

              <label className="mb-2">Imagen:</label>
              <section
                required className="flex flex-row flex-wrap gap-3 snap-y overflow-y-auto h-32 w-full p-2 border border-gray-300 rounded"
                style={{ scrollSnapType: "y mandatory" }}
              >
                {imagenes.map((imagenItem, index) => (
                  <div
                    key={index}
                    className={`snap-center transition-all duration-200 ${
                      imagen === imagenItem ? "bg-sky-300" : "hover:bg-sky-200"
                    } rounded`} // Clase dinámica para mostrar la selección
                  >
                    <button
                      type="button"
                      onClick={() => handleImageClick(imagenItem)} // Seleccionar imagen
                      className="w-full h-full"
                    >
                      <img
                        className="h-8 w-8 m-2"
                        src={imagenItem}
                        alt={`Imagen de ${imagenItem}`}
                      />
                    </button>
                  </div>
                ))}
              </section>
              <div className="flex items-center justify-around mt-7 w-full">
                <button
                  type="submit"
                  className="px-6 py-3 transition-all duration-200 ease-in-out text-white active:bg-amber-500 bg-amber-500 hover:bg-amber-400 rounded-md"
                >
                  Nuevo
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-3 ms-4 transition-all duration-200 ease-in-out border border-amber-500 border-1 text-amber-600 hover:text-white active:bg-amber-500 hover:bg-amber-400 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </main>
        </section>
      )}
    </>
  );
};

export default Modal;
