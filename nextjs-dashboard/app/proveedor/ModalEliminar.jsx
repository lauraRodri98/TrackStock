import React from 'react';

const ModalEliminar = ({ isOpen, onClose, onConfirm }) => {

  if (!isOpen) return null;

  return (
<div className="transition-all duration-500 ease-in-out transform fixed h-screen w-screen inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md">
        <h2>¿Seguro que deseas eliminar este producto?</h2>
        <div className="modal-actions flex items-center justify-around mt-3">
          <button className='px-5 py-3 transition-all duration-200 ease-in-out text-white active:bg-amber-500 bg-amber-500 hover:bg-amber-400 rounded-md' onClick={onClose}>Cancelar</button>
          <button className='px-5 py-3 transition-all duration-200 ease-in-out text-white active:bg-red-800 bg-red-600 hover:bg-red-500 rounded-md' onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminar;
