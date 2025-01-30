import React, { useState, useEffect } from 'react'
import url from '../../api/api'

const ModalEdit = ({isOpen, onClose, idSeleccionado}) => {

    const imagenes = [
        "baloncesto.png", "bicicleta.png", "bota-tacon.png", "boton-movil.png", 
        "cajon.png", "camara.png", "camiseta.png", "computadora.png", "lentes.png", 
        "libro-marcador.png", "ordenador-portatil.png", "oso-de-peluche.png", "raton.png", 
        "sombrero-de-invierno.png", "teclado.png", "voleibol.png", "imprimir.png", 
        "lapiz.png", "cuaderno-alternativo.png", "anillo-de-diamante.png", "guante-de-boxeo.png", 
        "mochila.png", "secadora.png", "microonda.png", "silla-de-oficina.png", 
        "consola-de-juegos-portatil-con-manivela.png"
      ];
    const [imagen, setImage] = useState(""); 
    

    console.log(idSeleccionado)

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [isOpen]);

    const handleImageClick = (imagen) => {
        setImage(imagen);
        console.log(imagen);
      };

    const handleSubmit = async() => {
        try {
            const urlCAtegorias = `${url}`;
            const response = await fetch(urlCAtegorias, {method:'PUST'})
            console.log(response)
            if(response.status === 'success'){
                const data = await response.json();
                alert("Los datos se han actualizado correctamente: " + data);
            }
            console.log("NO se ha actualizado")
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <>
        {isOpen && (
            <section  className="w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center fixed top-0 left-0 z-50">
                <main className='flex w-96 h-auto p-5 rounded bg-white flex-wrap flex-row'>
                    <div className='flex justify-end w-full items-start flex-auto'>
                        <button onClick={onClose}>X</button>                        
                    </div>
                    <section className='flex w-full flex-wrap h-auto justify-start items-start flex-auto'>
                        <div className='flex flex-1'>
                            <p className='text-2xl mb-5'>Edita categoría - {idSeleccionado.name}</p>
                        </div>
                        <form submit={handleSubmit} className='flex flex-col flex-wrap justify-start'>
                            <label className='mb-2'>Nombre</label>
                            <input className='bg-gray-100 border-gray-200 rounded mt-2 mb-4 h-8 w-52' type='text' value={idSeleccionado.name} />

                            <label className='mb-2'>Imágen</label>
                            <section value={idSeleccionado.imagen} className="flex flex-row flex-wrap gap-3 snap-y overflow-y-auto h-32 w-full p-2 border border-gray-300 rounded"
                            style={{ scrollSnapType: "y mandatory" }}
                        >
                            {imagenes.map((imagenItem, index) => (
                                <div
                                    key={index}
                                    className={`snap-center transition-all duration-200 ${
                                    (imagen === imagenItem || idSeleccionado.imagen === imagenItem) ? "bg-sky-300" : "hover:bg-sky-200"
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
                                <button type='sunmit' className='px-6 py-3 transition-all duration-200 ease-in-out text-white active:bg-amber-500 bg-amber-500 hover:bg-amber-400 rounded-md'>Actualizar</button>
                                <button onClick={onClose} type="button"  className="px-5 py-3 ms-4 transition-all duration-200 ease-in-out border border-amber-500 border-1 text-amber-600 hover:text-white active:bg-amber-500 hover:bg-amber-400 rounded-md">
                                    Cancelar
                                </button>
    
                            </div>
                        </form>
                    </section>
                </main>
            </section>     
        )}
    </>

  )
}

export default ModalEdit
