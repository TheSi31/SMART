'use client';

import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';

// Интерфейс для продукта
interface Product {
    id: number;
    categories: string;
    name: string;
    price: number;
    old_price: number;
    is_new: boolean;
    is_best_seller: boolean;
    image_url: string;
    description: string;
    characteristics?: { name: string; value: string }[];
}

const List_Favorites = () => {
    
    const token = useSelector((state: { auth: { token: string } }) => state.auth.token);

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/favorites/user/' + token);
            const data = await response.json();

            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error('Полученные данные не являются массиво:', data);
            }
        } catch (error) {
            console.error('Ошибка получения продуктов:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    return (
        <div>
            <h2>Избранные товары</h2>
            <div>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <Card {...product} key={product.id} links={`/catalog/product/${product.id}`} />
                    ))
                ) : (
                    <p>Нет избранных товаров.</p>
                )}
            </div>
        </div>
    );
}

export default List_Favorites;