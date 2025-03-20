'use client';

import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '@/store/slice/cartSlice';
import { clearCart } from '@/store/slice/cartSlice';
import { RootState } from '../store/store';

import Image from 'next/image';
import { Button, Input, Radio, Select, message } from 'antd';

import { format, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';

import delete_img from "../img/cart/delete.svg";

const Cart = () => {

    const dispatch = useDispatch();
    const { items, totalAmount } = useSelector(
      (state: RootState) => state.cart
    );

    const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated);

    if(!isAuthenticated){
        return <p>Авторизуйтесь на сайте</p>
    }

    if (!items || items.length === 0) {
        return <p>У вас нет покупок</p>;
    }

    const token = useSelector((state: RootState) => state.auth.token);

    const futureDates: string[] = Array.from({ length: 5 }, (_, i) =>
        format(addDays(new Date(), i + 1), 'd MMMM, EEEE', { locale: ru })
    ); 

    const cities: string[] = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Ростов-на-Дону'];

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Заказ успешно оформлен',
        });
    };

    const error = (message: string = 'Произошла ошибка при оформлении заказа') => {
        messageApi.open({
          type: 'error',
          content: message,
        });
    };

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        token: token,
        cart: [],
        delivery: {
            city: '',
            address: '',
            method: '',
            date: '',
            time: '',
            comment: '',
        },
        payment: {
            method: '',
            total: 0,
        },
        recipient: {
            name: '',
            phone: '',
        },
        status: 'В обработке',
    });

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            cart: items.map((item) => ({ id: item.id, quantity: item.quantity })),
            payment: {
                ...prevData.payment,
                total: totalAmount,
            },
        }));
    }, [items]);

    const handleOrder = () => {
        if (
          !formData.token ||
          !formData.delivery.city ||
          !formData.delivery.address ||
          !formData.delivery.method ||
          !formData.delivery.date ||
          !formData.delivery.time ||
          !formData.payment.method ||
          formData.payment.total <= 0 ||
          !formData.recipient.name ||
          !formData.recipient.phone
        ) {
          error('Пожалуйста, заполните все поля');
          console.log(formData);
          return;
        }
      
        const response = fetch('http://localhost:3001/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).then((response) => {
          if (response.ok) {
            success();
            dispatch(clearCart());
            return response.json();
          } else {
            error();
            throw new Error('Failed to create order');
          }
        })

        // Дальнейшая логика оформления заказа
        console.log("Заказ успешно оформлен:", formData);
    };
      

    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handleEditStep = (step: number) => {
        setCurrentStep(step);
    };
    
    return (
        <div className="grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-10">
            {contextHolder}     

            <div className='flex flex-col gap-10'>
                {/* Шаг 1: Корзина */}
                <div className='flex flex-col gap-5'>
                    <div className='border border-gray-400 rounded-lg p-8'>
                        {currentStep > 1 ? (
                            <div className='flex flex-col gap-6'>
                                <h3 className='text-xl font-bold'>Ваш заказ</h3>
                                <div className='flex items-center justify-between max-sm:flex-col max-sm:gap-3'>
                                    <div className='flex gap-5 max-sm:w-full'>
                                        {items.map((item) => (
                                            <div key={item.id}>
                                                <Image src={"http:/localhost:3001/uploads/products/test.png"} width={100} height={100} className="w-20 h-20" alt={item.name}></Image>
                                            </div>
                                        ))}
                                    </div> 
                                    <div className='w-1/6 max-sm:w-full'>
                                        <Button size='large' color='primary' variant='outlined'  block onClick={() => handleEditStep(1)}>Изменить</Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h3 className='text-xl font-bold'>Ваш заказ</h3>
                        )}
                        {currentStep === 1 && (
                            <div className='flex flex-col gap-6'>
                                {items.map((item) => (
                                <div className='grid grid-cols-[100px_2fr_50px_1fr_48px] max-sm:grid-cols-3 max-sm:grid-rows-2 items-center gap-4' key={item.id}>
                                    <Image src={"http:/localhost:3001/uploads/products/test.png"} width={100} height={100} className="w-20 h-20 max-sm:row-span-2" alt={item.name}></Image>
                                    <p>{item.name}</p>
                                    <Input className='max-sm:col-start-3 max-sm:row-start-2' size='large' type="number" min={1} value={item.quantity} onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))} style={{ width: 50 }} />
                                    <p className='font-bold'>{item.price} ₽</p>
                                    <Button className='max-sm:col-start-3 max-sm:row-start-1' size='large' style={{ width: 48, height: 48 }} type='text' onClick={() => dispatch(removeItem(item.id))}>
                                        <Image src={delete_img} width={48} height={48} alt="delete" />
                                    </Button>
                                </div>
                            ))}  
                            </div>
                        )}
                    </div>
                    {currentStep === 1 && (
                        <button className='bg-[#4878A6] text-white py-2 px-4 rounded w-1/4' onClick={handleNextStep}>Далее</button>
                    )}
                </div>

                {/* Шаг 2: Способ получения */}
                <div className='flex flex-col gap-5'>
                    <div className='border border-gray-400 rounded-lg p-8'>
                        {currentStep > 2 ? (
                            <div>
                                <h3 className='text-xl font-bold'>Способ получения</h3>
                                <div className='flex items-center justify-between'>
                                    {formData.delivery.method === 'pickup' ? (
                                        <p className='text-xl font-bold'>Самовывоз</p>
                                    ) : (
                                        <p className='text-xl font-bold'>Доставка</p>
                                    )}
                                    <div className='w-1/6'>
                                        <Button size='large' color='primary' variant='outlined'  block onClick={() => handleEditStep(2)}>Изменить</Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h3 className='text-xl font-bold'>Способ получения</h3>
                        )}
                        {currentStep === 2 && (
                            <div>
                                <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-8'>
                                    <div className="flex flex-col">
                                        <Select
                                            size='large'
                                            value={formData.delivery.city}
                                            onChange={(value) =>
                                                setFormData((prevData) => ({
                                                ...prevData,
                                                delivery: { ...prevData.delivery, city: value },
                                                }))
                                            }
                                            >
                                            {cities.map((city, index) => (
                                                <Select.Option key={index} value={city}>
                                                {city}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <Radio.Group
                                        className="flex flex-col gap-4 w-full"
                                        onChange={(e) => setFormData((prevData) => ({
                                            ...prevData,
                                            delivery: { ...prevData.delivery, method: e.target.value },
                                        }))}
                                        value={formData.delivery.method}
                                        >
                                        <Radio className="w-full px-4 py-2 border rounded-lg flex items-center text-gray-700" value="delivery">
                                            Доставка
                                        </Radio>
                                        <Radio className="w-full px-4 py-2 border rounded-lg flex items-center text-gray-700" value="pickup">
                                            Самовывоз
                                        </Radio>
                                    </Radio.Group>
                                </div>
                                {/* Появляющиеся блоки при выборе радио-кнопок */}
                                {formData.delivery.method === 'delivery' && (
                                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 ">
                                        <label className="flex flex-col">
                                            Дата
                                            <Select 
                                                size='large'
                                                value={formData.delivery.date}
                                                onChange={(value) =>
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    delivery: { ...prevData.delivery, date: value },
                                                    }))
                                                }
                                                >
                                                {futureDates.map((date, index) => (
                                                    <Select.Option key={index} value={date}>
                                                    {date}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </label>
                                        <label className="flex flex-col">
                                            Улица, дом/корпус
                                            <Input size='large' value={formData.delivery.address} onChange={(e) => setFormData((prevData) => ({ ...prevData, delivery: { ...prevData.delivery, address: e.target.value } }))}></Input>
                                        </label>
                                        <label className="flex flex-col">
                                            Время
                                            <Select
                                                size='large'
                                                value={formData.delivery.time}
                                                onChange={(value) =>
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    delivery: { ...prevData.delivery, time: value },
                                                    }))
                                                }
                                                >
                                                <Select.Option value="10:00-15:00">10:00-15:00</Select.Option>
                                                <Select.Option value="15:00-18:00">15:00-18:00</Select.Option>
                                                <Select.Option value="18:00-21:00">18:00-21:00</Select.Option>
                                            </Select>
                                        </label>
                                        <label className="flex flex-col col-span-2 max-sm:col-span-1">
                                            Комментарии курьеру
                                            <Input size='large' value={formData.delivery.comment} onChange={(e) => setFormData((prevData) => ({ ...prevData, delivery: { ...prevData.delivery, comment: e.target.value } }))}></Input>
                                        </label>
                                    </div>
                                )}
                                {formData.delivery.method === 'pickup' && (
                                    <div className="mt-4 bg-green-100 w-52 h-52 flex items-center justify-center">
                                    <p>Вы выбрали самовывоз</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {currentStep === 2 && (
                        <button className='bg-[#4878A6] text-white py-2 px-4 rounded w-1/4' onClick={handleNextStep}>Далее</button>
                    )}
                </div>

                {/* Шаг 3: Способ оплаты */}
                <div className='flex flex-col gap-4'>
                    <div className='border border-gray-400 rounded-lg p-8'>
                        {currentStep > 3 ? (
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-xl font-bold'>Способ оплаты</h3>
                            <div className='flex items-center justify-between'>
                                {formData.payment.method === 'cash' ? (
                                    <p className='text-xl font-bold'>Наличные</p>
                                ) : (
                                    <p className='text-xl font-bold'>Карта</p>
                                )}
                                <div className='w-1/6'>
                                    <Button size='large' color='primary' variant='outlined'  block onClick={() => handleEditStep(2)}>Изменить</Button>
                                </div>
                            </div>
                        </div>
                        ) : (
                            <h3 className='text-xl font-bold pb-4'>Способ оплаты</h3>
                        )}
                        {currentStep === 3 && (
                            <div className='grid grid-cols-2 gap-4'>
                                    <Select
                                        size='large'
                                        value={formData.payment.method}
                                        onChange={(value) =>
                                            setFormData((prevData) => ({
                                            ...prevData,
                                            payment: { ...prevData.payment, method: value },
                                            }))
                                        }
                                        >
                                        <Select.Option value="cash">Наличные</Select.Option>
                                        <Select.Option value="card">Карта</Select.Option>
                                    </Select>
                            </div>
                        )}
                    </div>
                    {currentStep === 3 && (
                        <button className='bg-[#4878A6] text-white py-2 px-4 rounded w-1/4' onClick={handleNextStep}>Далее</button>
                    )}
                </div>

                {/* Шаг 4: Получатель */}
                <div className='border border-gray-400 rounded-lg p-8'>
                    <h3>
                        {currentStep > 4 ? (
                            <div>
                                <h3 className='text-xl font-bold'>Получатель</h3>
                            </div>
                        ) : (
                            <h3 className='text-xl font-bold pb-4'>Получатель</h3>
                        )}
                    </h3>
                    {currentStep === 4 && (
                        <div className='flex flex-col gap-4'>
                            <label>
                                Имя:
                                <Input size='large' value={formData.recipient.name} onChange={(e) => setFormData((prevData) => ({ ...prevData, recipient: { ...prevData.recipient, name: e.target.value } }))}></Input>
                            </label>
                            <label>
                                Телефон:
                                <Input size='large' value={formData.recipient.phone} onChange={(e) => setFormData((prevData) => ({ ...prevData, recipient: { ...prevData.recipient, phone: e.target.value } }))}></Input>
                            </label>
                        </div>
                    )}
                </div>
            </div>
            
            <div>
                <div className='flex flex-col gap-2 bg-[#EDF2F6] rounded-lg p-8'>
                    <h2 className='text-2xl font-bold'>Итого</h2>
                    <p className='flex justify-between text-[#836688]'>{items.reduce((total, item) => total + item.quantity, 0)} товара на сумму <b className='text-black'>{totalAmount} ₽</b></p>
                    <p className='flex justify-between text-[#836688]'>Стоимость доставки <b className='text-black'>бесплатно</b></p>
                    <span className='border-t border-[#C8CACB]'/>
                    <p className='flex justify-between text-xl font-semibold items-end'>К оплате <b className='text-2xl'>{totalAmount} ₽</b></p>
                    <Button size='large' variant='solid' block onClick={handleOrder}>Оформить заказ</Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
