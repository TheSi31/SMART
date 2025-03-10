'use client';
import React, { useState, useEffect } from 'react';
import Card from './Card';

interface Products {
    id: number,
    categories: string,
    name: string,
    price: number,
    old_price: number,
    is_new: boolean,
    is_best_seller: boolean
    image_url: string,
    description: string
}


const List_Products = ({categories, className}: {categories: string|number|undefined, className?: string}) => {

    const [products, setProducts] = useState<Products[]>([]);
    
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products/categories/' + categories);
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
        <div className={className}>
                <div className='grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 justify-items-center'>
                    {products.map((product) => (
                            <Card key={product.id} {...product} links={`/catalog/product/${product.id}`} />
                    ))}
                </div>
        </div>
    );
}

export default List_Products;