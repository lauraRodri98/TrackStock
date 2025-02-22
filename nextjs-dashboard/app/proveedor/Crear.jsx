import React, { useState } from 'react';
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Crear = ({ openModal, closeModal }) => {
    const [formproveedor, setFormProveedor] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormProveedor({ ...formproveedor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formproveedor);

        try {
            const response = await fetch(`${api}/createsupplier`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formproveedor),
            });

            const data = await response.json();

            if (response.ok) {
                alert('El proveedor se ha creado correctamente');
                setFormProveedor({ name: '', email: '', phone: '', address: '', suministra: '' }); // Reset form
                closeModal(); // Cerrar la modal
            } else {
                alert(`Error: ${data.mensaje || 'No se ha podido crear el proveedor'}`);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un problema al conectar con el servidor');
        }
    };

    return (
        openModal && (
            <div className={`transition-all duration-500 ease-in-out transform fixed h-screen w-screen inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50`}>
                <div className='w-96 bg-white rounded-md'>
                    <header className='w-full p-5 flex justify-between items-center'>
                        <p className='text-2xl'>Crear proveedor</p>
                        <button onClick={closeModal}>
                            <FontAwesomeIcon className='text-xl' icon={faXmark} />
                        </button>
                    </header>
                    <form onSubmit={handleSubmit} className='p-6'>
                        <label className='w-3/4'>Nombre</label><br/>
                        <input name="name" value={formproveedor.name} onChange={handleChange} required className="mt-2 w-3/4 mb-4 bg-gray-100 border-gray-200 rounded h-8" /><br/>
                        
                        <label className='w-3/4'>Correo</label><br/>
                        <input type='email' name="email" value={formproveedor.email} onChange={handleChange} required className="mt-2 mb-4 w-3/4 bg-gray-100 border-gray-200 rounded h-8" /><br/>
                        
                        <label className='w-3/4'>Teléfono</label><br/>
                        <input name="phone" value={formproveedor.phone} onChange={handleChange} required className="mt-2 mb-4 w-3/4 bg-gray-100 border-gray-200 rounded h-8" /><br/>
                        
                        <label className='w-3/4'>Dirección</label><br/>
                        <input name="address" value={formproveedor.address} onChange={handleChange} required placeholder='C//dirección de ejemplo, nº1' className="mt-2 mb-4 w-3/4 bg-gray-100 border-gray-200 rounded h-8" /><br/>

                        <div className='flex justify-around p-5'>
                            <button type="button" onClick={closeModal} className='px-5 py-3 border border-amber-500 text-amber-600 hover:text-white active:bg-amber-500 hover:bg-amber-400 rounded-md'>Cancelar</button>
                            <button type='submit' className='px-6 py-3 text-white bg-amber-500 hover:bg-amber-400 active:bg-amber-500 rounded-md'>Nuevo</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}
    
export default Crear;