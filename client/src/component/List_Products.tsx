'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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


const List_Products = ({category, className}: {category: string|number|undefined, className?: string}) => {

    const [products, setProducts] = useState<Products[]>([]);
    
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products/categories/' + category);
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
                <div className='flex flex-wrap max-md:justify-center'>
                    {products.map((product) => (
                        <Link href={`/catalog/product/${product.id}`}>
                            <Card key={product.id} {...product} />
                        </Link>
                    ))}
                </div>
        </div>
    );
}

export default List_Products;