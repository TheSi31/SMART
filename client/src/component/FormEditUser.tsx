'use client';

import { Button, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const FormEditUser = () => {
    const token = useSelector((state: RootState) => state.auth.token); // Получаем токен из Redux

    const [formData, setFormData] = useState({
        token: token || '', // Добавляем токен при инициализации
        username: '',
        address: '',
        email: '',
        payment_method: '',
        phone_number: '',
        delivery_method: '',
        city: '',
    });

    const [isExisting, setIsExisting] = useState(false); // Проверка, существует ли запись

    const cities: string[] = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Ростов-на-Дону'];

    const [messageApi, contextHolder] = message.useMessage();

    const success = (message: string = 'Данные успешно обновлены') => {
        messageApi.open({
          type: 'success',
          content: message,
        });
    };

    const error = (message: string = 'Произошла ошибка при обновлении данных') => {
        messageApi.open({
          type: 'error',
          content: message,
        });
    }

    // Получаем данные с /profile
    const fetchProfileData = async () => {
        try {
            const response = await fetch('http://localhost:3001/profile/' + token, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
    
                setFormData({
                    ...formData,
                    username: data.username || '',
                    address: data.address || '',
                    email: data.email || '',
                    phone_number: data.phone_number || '',
                    payment_method: data.payment_method || '',
                    delivery_method: data.delivery_method || '',
                    city: data.city || '',
                });
                setIsExisting(true); // Указываем, что данные существуют
            } else {
                error("Ошибка получения профиля");
                console.error('Ошибка ответа API:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка получения профиля:', error);
        }
    };


    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (value: string, field: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleSubmit = async () => {
        try {
            console.log(formData);
    
            // Проверяем, существует ли запись в таблице `user_info`
            const checkResponse = await fetch(`http://localhost:3001/check-user-info/${formData.token}`, { // Исправляем URL
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            let method = 'POST'; // По умолчанию создаём запись
            if (checkResponse.ok) {
                const data = await checkResponse.json();
                if (data.exists) { // Сервер возвращает информацию, существует ли запись
                    method = 'PUT'; // Если запись существует, обновляем её
                }
            }
    
            // Выполняем запрос (POST или PUT)
            const response = await fetch('http://localhost:3001/profile', {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                success(`Данные профиля ${method === 'PUT' ? 'обновлены' : 'созданы'} успешно`);
            } else {
                error();
                console.error('Ошибка отправки данных:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка отправки данных:', error);
        }
    };

    return (
        <div>
            {contextHolder}
            <Form className="grid grid-cols-2 grid-rows-4 gap-5 max-sm:grid-cols-1" onFinish={handleSubmit}>
                <Form.Item>
                    <label className="font-normal text-base">Имя:</label>
                    <Input placeholder="Не указано" name="username" value={formData.username} onChange={handleChange} size="large" />
                </Form.Item>
                <Form.Item>
                    <label className="font-normal text-base">Адрес:</label>
                    <Input placeholder="Не указано" name="address" value={formData.address} onChange={handleChange} size="large" />
                </Form.Item>
                <Form.Item>
                    <label className="font-normal text-base">Email:</label>
                    <Input placeholder="Не указано" name="email" value={formData.email} onChange={handleChange} size="large" />
                </Form.Item>
                <Form.Item>
                    <label className="font-normal text-base">Способ оплаты:</label>
                    <Select placeholder="Не указано" value={formData.payment_method} onChange={(value) => handleSelectChange(value, 'payment_method')} size="large">
                        <Select.Option value="cash">Наличные</Select.Option>
                        <Select.Option value="card">Карта</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <label className="font-normal text-base">Телефон:</label>
                    <Input placeholder="Не указано" name="phone_number" value={formData.phone_number} onChange={handleChange} size="large" />
                </Form.Item>
                <Form.Item>
                    <label className="font-normal text-base">Способ доставки:</label>
                    <Select placeholder="Не указано" value={formData.delivery_method} onChange={(value) => handleSelectChange(value, 'delivery_method')} size="large">
                        <Select.Option value="delivery">Доставка</Select.Option>
                        <Select.Option value="pickup">Самовывоз</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <label className="font-normal text-base">Город:</label>
                    <Select placeholder="Не указано" value={formData.city} onChange={(value) => handleSelectChange(value, 'city')} size="large">
                        {cities.map((city, index) => (
                            <Select.Option key={index} value={city}>
                                {city}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <label className="font-normal text-base">Аватар:</label>
                    <p>пока не реализован</p>
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit" size="large">Сохранить</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormEditUser;
