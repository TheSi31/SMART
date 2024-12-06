'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Drawer, Dropdown, MenuProps, Modal } from 'antd';
import { ConfigProvider} from 'antd';

import './AuthManager.css';

import Image from "next/image";
import Link from "next/link";

import sign_in from "../img/menu/sign-in.svg";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { CloseOutlined } from '@ant-design/icons';


const AuthManager = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated);

    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const showModalRegister = () => {
        setIsModalRegisterOpen(true);
        setIsModalLoginOpen(false);
    }
    
    const showModalLogin = () => {
        setIsModalLoginOpen(true);
        setIsModalRegisterOpen(false);
    }

    const profile_items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href="/general" className="w-[15vw] min-w-[150px] max-w-[250px] font-medium">Общие сведения</Link>
            )
        },
        {
            key: '2',
            label: (
                <Link href="/personal" className="font-medium">Личные данные</Link>
            )
        },
        {
            key: '3',
            label: (
                <Link href="/history" className="font-medium">История заказов</Link>
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
                <Link href="/password" className="font-medium">Сменить пароль</Link>
            )
        },
        {
            type: 'divider',
        },
        {
            key: '6',
            label: (
                <Link href="" onClick={() => dispatch({ type: 'auth/logout' })} className="font-medium">Выйти</Link>
            ),
            danger: true
        }
    ]

    return (
        <div>
            {isAuthenticated ? (
                <Dropdown className='cursor-pointer' menu={{ items: profile_items }} trigger={['click']} 
                placement="bottomRight">
                    <Image src={sign_in} alt="sign_in" className="h-12 w-12 flex justify-end"/>
                </Dropdown>
            ) : (
                <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#2A5275",
                        colorPrimaryHover: "#1d3b54",
                    },
                }}>
                    <Button type="primary" className="flex justify-end  text-white p-4 rounded" onClick={showModalLogin}>Войти</Button>
                </ConfigProvider>
            )}

            <ConfigProvider
            theme={{
                token: {
                    colorBgMask : 'rgba(42, 82, 117, 0.33)',
                },
            }}
            >
                {isMobile ? (
                    <>
                        <Drawer className='custom-drawer-auth' open={isModalLoginOpen} title="Войти" placement="bottom" 
                        height={'416px'} closeIcon={<CloseOutlined style={{ color: "red" }} />} onClose={() => setIsModalLoginOpen(false)}>
                            <div className='flex flex-col justify-center gap-2'>
                                <LoginForm />
                                <Button onClick={showModalRegister} type='link'>Зарегистрироваться</Button>
                            </div>    
                        </Drawer> 
        
                        <Drawer className='custom-drawer-auth' open={isModalRegisterOpen} title="Регистрация" placement="bottom" 
                        height={'556px'} closeIcon={<CloseOutlined style={{ color: "red" }} />} onClose={() => setIsModalRegisterOpen(false)}>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <RegisterForm />
                                <Button onClick={showModalLogin} type='link'>Я уже зарегистрирован</Button>
                            </div>
                        </Drawer>
                    </>
                ) : (
                    <>
                        <Modal className='modal-custom auth' title={null} closable={false} 
                    styles={{content: { padding: 0, overflow: 'hidden', width: '360px' } }} 
                    open={isModalLoginOpen} onCancel={() => setIsModalLoginOpen(false)} footer={null}>
                        <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
                            <h2 className="text-lg font-semibold">Вход</h2>
                            <button onClick={() => setIsModalLoginOpen(false)} className="text-red-500 hover:text-red-700">
                                <CloseOutlined />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 p-6">
                            <LoginForm />
                            <Button onClick={showModalRegister} type='link'>Зарегистрироваться</Button>
                        </div>           
                    </Modal>

                    <Modal className='modal-custom auth' title={null} closable={false} 
                    styles={{content: { padding: 0, overflow: 'hidden', width: '360px' } }} 
                    open={isModalRegisterOpen} onCancel={() => setIsModalRegisterOpen(false)} footer={null}>
                        <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
                            <h2 className="text-lg font-semibold">Регистрация</h2>
                            <button onClick={() => setIsModalRegisterOpen(false)} className="text-red-500 hover:text-red-700">
                                <CloseOutlined />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 p-6">
                            <RegisterForm />
                            <Button onClick={showModalLogin} type='link'>Я уже зарегистрирован</Button>
                        </div>
                    </Modal>
                    </>
                )}
            </ConfigProvider>
        </div>
    );
}

export default AuthManager;