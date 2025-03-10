'use client';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserData = () => {
    const token = useSelector((state: { auth: { token: string } }) => state.auth.token);
    const [data, setData] = useState<{ id: number, username: string, email: string, phone_number: string, orders_count: number, created_at: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3001/profile/${token}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;


    return (
        <div className='flex flex-col gap-6'>
            <h3 className='text-3xl font-bold'>{data.username}</h3>
            <div className='flex gap-8'>
                <Avatar icon={<UserOutlined />} shape="square" size={100} />
                <div className='flex flex-col gap-2'>
                    <p>Дата регистрации: {new Date(data.created_at).toLocaleDateString()}</p>
                    <p>Заказов: {data.orders_count}</p>
                </div>
            </div>
        </div>
    );
}

export default UserData;
