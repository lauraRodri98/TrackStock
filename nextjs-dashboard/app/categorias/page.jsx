'use client';
import React, { useEffect, useState } from 'react';
import useArrayCategorias from '../component';
import api from '../../api/api';
import Modal from "./modal";
import Footer from '../Footer';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ModalEdit from './ModalEdit';

const page = () => {
  const { category, setCategory } = useArrayCategorias();
  const [error, setError] = useState('');
  const [datosSubcategorias, setDatosSubcategorias] = useState([]);
  const [subCategoriasFiltradas, setSubCategoriasFiltradas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [point, setPoint] = useState({x:0, y:0})
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [idCatSelecc, SetIdCatSelecc] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${api}subcategorias`;
        const subcategoryFetch = await fetch(url, { method: 'GET' });
        const subcategoryData = await subcategoryFetch.json();

        if (subcategoryData.status === 'success') {
          setDatosSubcategorias(subcategoryData.subcategory);
        }
      } catch (err) {
        setError('No se ha conectado a la API');
        console.error(err);
        setDatosSubcategorias([]);
      }
    };
    setVisible(true);
    fetchData();
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
    // Logic to display the context menu will go here
  };

  const recargarCategorias = async () => {
    try {
      const url = `${api}categorias`;
      const categoriasFetch = await fetch(url, { method: 'GET' });
      const categoriasData = await categoriasFetch.json();

      if (categoriasData.status === 'success') {
        setCategory(categoriasData.categories);
      }
    } catch (err) {
      setError('No se ha podido cargar las categorías');
      console.error(err);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalEdit = () => setIsModalEdit(false)

  const filtrarPorCategorias = (idCat) => {
    const datos = datosSubcategorias.filter((subCat) => idCat === subCat.categoryId);
    setSubCategoriasFiltradas(datos);
  };

  const abrirEdit = (datos) => {
    SetIdCatSelecc(datos)
    setIsModalEdit(true)

  };

  return (
    <>
      <main
        className={`bg-gray-100 flex-1 h-screen ml-64 text-xl pb-6 text-end transition-all duration-500 ease-out ${
          visible ? 'opacity-100 translate-y-700' : 'opacity-0 translate-y-100'
        }`}
      >
        <section className="flex justify-center flex-row gap-8 flex-wrap">
          <div className="bg-white p-5 rounded-lg shadow-lg flex flex-1 min-w-40 gap-5 text-center h-full items-start justify-center">
            <form className="flex flex-1 gap-5 text-center flex-wrap flex-row h-full">
              <button
                onClick={openModal}
                type="button"
                className="rounded bg-sky-900 hover:bg-sky-950 w-36 h-32 shadow-lg text-white flex flex-col justify-center items-center gap-2"
              >
                <img src="mas.png" className="size-16" alt="Nuevo" />
                Nuevo
              </button>
              {category.length > 0 &&
                category.map((cat, index) => {
                  const colores = [
                    'bg-color1',
                    'bg-color2',
                    'bg-color3',
                    'bg-color4',
                    'bg-color5',
                    'bg-color6',
                    'bg-color7',
                    'bg-color8',
                  ];
                  return (
                    <ContextMenuTrigger id={`contextmenu-${cat._id}`} key={`trigger-${cat._id}`}>
                    <button
                      type="button"
                      onClick={() => filtrarPorCategorias(cat._id)}
                      className={`${colores[index % colores.length]} rounded shadow-lg w-36 h-32 text-lg flex flex-col justify-center items-center gap-2`}
                    >
                      <img src={`/${cat.imagen}`} className="size-16" alt={cat.name} />
                      {cat.name}
                    </button>
                  </ContextMenuTrigger>
                  );
                })}
            </form>
          </div>

          {category.map((cat) => (
            <ContextMenu key={`menu-${cat._id}`} id={`contextmenu-${cat._id}`} className="bg-slate-900 p-1 rounded text-start text-sm w-36">
              <MenuItem
                data={{ action: "edit", categoryId: cat._id }}
                onClick={() => abrirEdit(cat)}
                className="p-3 line-clamp-1 text-start text-white hover:bg-slate-600 mb-1 rounded cursor-default"
              >
                Editar
              </MenuItem>
              <hr className="border-gray-500" />
              <MenuItem
                data={{ action: "delete", categoryId: cat._id }}
                
                className="p-3 text-white hover:bg-slate-600 mt-1 rounded cursor-default"
              >
                Eliminar
              </MenuItem>
            </ContextMenu>
          ))}
          {subCategoriasFiltradas.length > 0 && (
            <div className="bg-white p-5 rounded-lg shadow-lg w-96 h-full text-center flex flex-col gap-3">
              {subCategoriasFiltradas.map((cat) => (
                <div
                  key={cat._id}
                  className="flex rounded-lg shadow-lg w-full bg-sky-100 p-2"
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} recargarCategorias={recargarCategorias} />
      <ModalEdit isOpen={isModalEdit} onClose={closeModalEdit} idSeleccionado={idCatSelecc}/>
    </>
  );
};

export default page;
