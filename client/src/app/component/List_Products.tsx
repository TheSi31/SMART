'use client';
import React, { useState, useEffect } from 'react';
import Card from './Card';

interface Products {
    id: number,
    catalog: string,
    name: string,
    price: number,
    old_price: number,
    is_new: boolean,
    is_best_seller: boolean
    image_url: string,
    description: string
}


const List_Products = () => {

    const [products, setProducts] = useState<Products[]>([]);
    
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products');
            const data = await response.json();


            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Список продуктов</h1>
            {products.map((product) => (
                <Card key={product.id} {...product} />
            ))}
        </div>
    );
}

export default List_Products;