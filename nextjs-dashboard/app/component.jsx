// Component.jsx
'use client';

import { useEffect, useState } from "react";
import api from "../api/api";

const useArrayCategorias = () => {
    const [error, setError] = useState("");
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [movement, setMoviment] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [subcategory, setSubcategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await fetch(`${api}category`, { method: 'GET' });
                const categoryData = await categoryResponse.json();
                if (categoryData.status === "error") {
                    setError(categoryData.mensaje);
                    setCategory([]);
                } else {
                    setCategory(categoryData.category);
                }

                const productResponse = await fetch(`${api}product`, { method: 'GET' });
                const productData = await productResponse.json();
                console.log("Product data")
                console.log(productData)
                if (productData.status === "error") {
                    setError(productData.mensaje);
                    setProduct([]);
                } else {
                    setProduct(productData.productos);
                }

                const movimentResponse = await fetch(`${api}moviment`, { method: 'GET' });
                const movementData = await movimentResponse.json();
                if (movementData.status === "error") {
                    setError(movementData.mensaje);
                    setMoviment([]);
                } else {
                    setMoviment(movementData.movement);
                }

                const supplierResponse = await fetch(`${api}supplier`, { method: 'GET' });
                const supplierData = await supplierResponse.json();
                if (supplierData.status === "error") {
                    setError(supplierResponse.mensaje);
                    setSupplier([]);
                } else {
                    setSupplier(supplierData.supplier);
                }

                const subCategory = await fetch(`${api}subcategorias`, { method:'GET'})
                const datosSubcategory = await subCategory.json();
                if(datosSubcategory.status === "success"){
                    setSubcategory(datosSubcategory.subcategory);
                }else{
                    setCategory([])
                    setError(datosSubcategory.message)
                }

            } catch (err) {
                setError("Hubo un error al hacer la llamada a la API");
                setMoviment([]);
                setProduct([]);
                setCategory([]);
                setSupplier([]);
                setCategory([])
            }
        };

        fetchData();
    }, []);

    return { product, category, movement, supplier, subcategory, error };
};

export default useArrayCategorias;
