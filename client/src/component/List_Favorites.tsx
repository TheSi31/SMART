'use client';

import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';

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
    
    const dispatch = useDispatch();
    const token = useSelector((state: { auth: { token: string } }) => state.auth.token);

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        if (!token) return;
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

    const onClickExit = () => {
        dispatch({ type: 'auth/logout' });
        setProducts([]);
        localStorage.removeItem('authToken');
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    const profile_items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href="/profile/general" className="w-[15vw] min-w-[150px] max-w-[250px] font-medium">Общие сведения</Link>
            )
        },
        {
            key: '2',
            label: (
                <Link href="/profile/personal" className="font-medium">Личные данные</Link>
            )
        },
        {
            key: '3',
            label: (
                <Link href="/profile/history" className="font-medium">История покупок</Link>
            )
        },
        {
            key: '4',
            label: (
                <Link href="/favorites" className="font-medium">Избранные</Link>
            )
        },
        {
            key: '5',
            label: (
                <Link href="/profile/password" className="font-medium">Сменить пароль</Link>
            )
        },
        {
            type: 'divider',
        },
        {
            key: '6',
            label: (
                <Link href="" onClick={onClickExit} className="font-medium">Выйти</Link>
            ),
            danger: true
        }
    ]

    return (
        <div>
            <h2>Избранные товары</h2>
            <div className="grid grid-cols-[25%_75%] gap-4 max-sm:grid-cols-1">
                <div className="max-sm:hidden">
                    {token ? (
                            <Menu items={profile_items}></Menu>
                        ) :(
                            <p>Войти или зарегистрируйтесь</p>
                    )}    
                </div>
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
        </div>
    );
}

export default List_Favorites;