'use client';
import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, ConfigProvider, Rate, Tabs, Avatar, Modal, Form, Input } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import LikeButton from './LikeButton';

import image from "../img/test.png";
import { UserOutlined } from '@ant-design/icons';

import comment from "../img/commet.svg";
import compare from "../img/menu/compare.svg";

import './Product_More.css';

interface Products {
    id: number,
    categories_id: number
    categories: string,
    name: string,
    price: number,
    old_price: number,
    is_new: boolean,
    is_best_seller: boolean
    image_url: string,
    description: string
}

interface ProductsMore {
    name: string,
    value: string
}

const Product_More = ({id}:{id: number}) => {

    const [products, setProducts] = useState<Products[]>([]);
    const [productsMore, setProductsMore] = useState<ProductsMore[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const 

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products/' + id);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProductsMore = async () => {
        try {
            const response = await fetch('http://localhost:3001/products/' + id + '/more');
            const data = await response.json();
            setProductsMore(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchProductsMore();
    }, []);

    const product = products.find(product => product.id === id);

    return (
        <div className='pt-10 pb-20'>
            <Breadcrumb>
                <Breadcrumb.Item><Link href="/">Главная</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link href={"/catalog/categories/" + product?.categories_id}>{product?.categories}</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{product?.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className='grid grid-cols-[40%_60%] gap-5 py-10 max-xl:grid-cols-1 max-xl:grid-rows-2 max-md:grid-rows-1'>
                <h1 className='text-4xl font-medium md:hidden'>{product?.name}</h1>
                <div>
                    <Image src={image} alt={""+product?.name}></Image>
                </div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-4xl font-medium max-md:hidden'>{product?.name}</h1>
                    <div className='grid grid-cols-[1fr_1fr] max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-5 border max-sm:border-none border-gray-200 rounded-md p-7 '>
                        <div className='flex flex-col gap-3'>
                            <div className="flex items-center gap-3">
                                <Rate disabled allowHalf defaultValue={4.5} />
                                <div className="flex items-center gap-1">
                                    <Image src={comment} alt="comment" width={16} height={16} />
                                    <p className="text-sm text-gray-600">(17)</p>
                                </div>
                            </div>
                            <div className="sm:hidden flex gap-3">
                                <div className='w-12 h-12 sm:hidden'>
                                    <LikeButton productId={product?.id}/>
                                </div>
                                <div className='w-12 h-12 border border-gray-200 rounded-md sm:hidden'>
                                    <Image src={compare} alt="compare" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center relative">
                                {product?.old_price ? (<h3 className="text-[#838688] font-medium line-through">{product?.old_price} ₽</h3>):(<h3 className="text-transparent font-medium">.</h3>)}
                                <h1 className="text-4xl font-medium">{product?.price} ₽</h1>
                            </div>
                        </div>
                        <div className='grid grid-rows-[48px_48px] max-sm:grid-rows-[48px] max-[380px]:grid-rows-[48px_48px] grid-cols-[48px_48px_48px_48px_48px_48px_48px_48px] max-md:grid-cols-6 max-sm:grid-cols-8 gap-[10px]'>
                            <div className="col-start-7 max-sm:hidden">
                                <LikeButton productId={product?.id}/>
                            </div>
                            <div className="col-start-8 border border-gray-200 rounded-md max-sm:hidden">
                                <Image src={compare} alt="compare" />
                            </div>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#2A5275",
                                        colorPrimaryHover: "#1d3b54",
                                    },
                            }}>
                                <Button type="primary" className='row-start-2 max-sm:row-start-1 col-span-4 max-[380px]:col-span-8 h-full'>В корзину</Button>
                            </ConfigProvider>
                            <Button className='row-start-2 max-sm:row-start-1 max-[380px]:row-start-2 col-span-4 max-[380px]:col-span-8 max-[380px]: h-full'>Купить в 1 клик</Button>
                        </div>
                    </div>
                    <div className='flex w-full max-sm:flex-col'>
                        <div className='w-1/2 max-sm:w-full'>
                            <h2 className='font-semibold mt-10'>Доставка</h2>
                            <p>Доставим по Санкт-Петербургу в течение 2 часов и бесплатно. Стоимость доставки в другие города уточняйте у менеджера.</p>
                        </div>
                        <div className='w-1/2 max-sm:w-full'>
                            <h2 className='font-semibold mt-10'>Оплата</h2>
                            <p>Принимаем к оплате как наличный, так и безналичный расчёт. Возможна оплата электронными кошельками.</p>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <Tabs size='large' tabBarStyle={{background: "#EDF2F6", borderRadius: "8px", paddingLeft: "16px"}} className='custom-tabs'>
                <Tabs.TabPane tab="Описание" key="1" style={{background: "#ffffff"}}>
                    <h1 className='text-2xl font-semibold py-8'>Описание {product?.name}</h1>
                    <p>{product?.description}</p>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Характеристики" key="2" className='w-4/5 max-md:w-full'>
                    <h1 className='text-2xl font-semibold py-8'>Характеристики {product?.name}</h1>
                    <div>
                        <div className='grid grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-2 max-sm:gap-3 p-5 max-sm:px-0 border-b border-gray-200'>
                            <h1 className='font-semibold'>Тип</h1>
                            <p className='font-normal'>-</p>
                        </div>
                        {productsMore?.map(
                            (productMore) => 
                                <div className='grid grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-2 max-sm:gap-3 p-5 max-sm:px-0 border-y border-gray-200'>
                                    <h1 className='font-semibold'>{productMore.name}</h1>
                                    <p className='font-normal'>{productMore.value}</p>
                                </div>
                        )} 
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Отзывы" key="3">
                    <h1 className='text-2xl font-semibold py-8'>Отзывы на {product?.name}</h1>
                    <div className='grid grid-cols-2 gap-[130px] max-[1444px]:gap-[40px] max-xl:grid-cols-1 max-xl:gap-4'>
                        <div className='flex flex-col gap-3 bg-[#EDF2F6] p-10 max-[1444px]:p-6 max-sm:p-5'>
                            <div className='flex items-center gap-5 justify-between max-sm:flex-col max-sm:items-start'>
                                <div className='flex items-center gap-2'>
                                    <Avatar size={50} icon={<UserOutlined />} />
                                    <h1 className='font-semibold'>Иван Иванов</h1>
                                    <p>07.07.2023</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Rate disabled allowHalf defaultValue={4.5} />
                                    <p className="text-sm font-semibold text-[#838688]">(4.5 из 5)</p>
                                </div>
                            </div>
                            <h1 className='font-semibold'>Отличный самокат</h1>
                            <p>Катаюсь каждый день после работы, заряд держит отлично!</p>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-1'>
                                <h1 className='font-semibold'>Напишите своё мнение о товаре</h1>
                                <p>Сделайте выбор других покупалетей легче</p>
                            </div>
                            <ConfigProvider theme={{ token: { colorPrimary: "#2A5275",colorPrimaryHover: "#1d3b54", } }}>
                                <Button  type="primary" className='h-12 w-1/2' onClick={showModal}>Написать отзыв</Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
            <Modal open={isModalOpen} onOk={closeModal} onCancel={closeModal}>
                <Form>
                    <Form.Item>
                        <h2 className="text-2xl font-semibold">Написать отзыв</h2>
                    </Form.Item>
                    <Form.Item>
                        <div className="flex flex-col gap-2">
                            <label className="font-normal">Ваша оценка</label>
                            <Rate defaultValue={3} />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="flex flex-col gap-2">
                            <label className="font-normal">Ваш отзыв</label>
                            <Input size="large" type="text" />
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Product_More;