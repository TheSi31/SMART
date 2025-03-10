'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

// Интерфейс для продукта
interface Products {
    id: number;
    categories: string;
    name: string;
    price: number;
    old_price: number;
    is_new: boolean;
    is_best_seller: boolean;
    image_url: string;
    description: string;
}

const List_Viewed = () => {
    const [products, setProducts] = useState<Products[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Получаем productIds из состояния Redux
    const productIds = useSelector((state: any) => state.viewed.productIds);

    const fetchProducts = async () => {
        if (productIds.length === 0) {
            return; // Если нет просмотренных товаров, запрос не выполняется
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch('http://localhost:3001/products/ids/'+productIds, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных о продуктах');
            }

            const data = await response.json();
            setProducts(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [productIds]); // Запрос выполняется при изменении productIds

    return (
        <div>
            {isLoading && <p>Загрузка...</p>}
            {error && <p className="error">Ошибка: {error}</p>}
            {!isLoading && products.length > 0 ? (
                <div className='grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 justify-items-center'>
                    {products.map((product) => (
                        <Card key={product.id} {...product} links={`/catalog/product/${product.id}`} />
                    ))}
                </div>
            ) : (
                !isLoading && <p>Нет просмотренных товаров</p>
            )}
        </div>
    );
};

export default List_Viewed;
