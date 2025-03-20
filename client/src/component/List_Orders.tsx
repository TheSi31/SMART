'use client';

import React, { useState, useEffect } from 'react';
import { Pagination, List } from 'antd';
import { useSelector } from 'react-redux';

const List_Orders = () => {
    const [orders, setOrders] = useState([]);

    const token = useSelector((state: { auth: { token: number } }) => state.auth.token);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3001/orders/' + token);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    console.log(orders);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 1; // Количество записей на странице

    // Рассчитываем данные для текущей страницы
    const startIndex = (currentPage - 1) * pageSize;
    const currentData = orders.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page:number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <List
                bordered
                dataSource={currentData}
                renderItem={(order) => (
                    <List.Item>
                        <div className='w-full flex justify-between'>
                            <p>Заказ #{order.order_id}от {new Date(order.created_at).toLocaleDateString()}</p>
                            <p>{order.cart.length} товара на сумму {order.payment_total} </p>
                            <p>{order.status ? order.status : "Статус не указан"}</p>
                        </div>
                    </List.Item>
                )}
            />

            {/* Компонент пагинации */}
            <Pagination
                current={currentPage}
                total={orders.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false} // Если не нужно менять размер страницы
            />
        </div>
    );
};

export default List_Orders;
