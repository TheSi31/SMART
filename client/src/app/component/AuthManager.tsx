'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';

import Image from "next/image";
import Link from "next/link";

import sign_in from "../../img/menu/sign-in.svg";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthManager = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated);

    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

    const showModalRegister = () => {
        setIsModalRegisterOpen(true);
        setIsModalLoginOpen(false);
    }
    
    const showModalLogin = () => {
        setIsModalLoginOpen(true);
        setIsModalRegisterOpen(false);
    }

    return (
        <div>
            {isAuthenticated ? (<Image src={sign_in} alt="sign_in" className="h-12 w-12 flex justify-end"/>
            ) : (
                <Button className="flex justify-end" onClick={showModalLogin}>Войти</Button>
            )}

            <Modal open={isModalLoginOpen} onCancel={() => setIsModalLoginOpen(false)} footer={null}>
                <LoginForm></LoginForm>
                <Button className="flex justify-end" onClick={showModalRegister}>Регистрация</Button>
            </Modal>

            <Modal open={isModalRegisterOpen} onCancel={() => setIsModalRegisterOpen(false)} footer={null}>
                <RegisterForm></RegisterForm>
            </Modal>
        </div>
    );
}

export default AuthManager;