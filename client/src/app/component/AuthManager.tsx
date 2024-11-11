'use client';

import React, { useState } from 'react';
import { Modal } from 'antd';

import Image from "next/image";
import Link from "next/link";

import logo from "../../img/menu/logo.svg";


const AuthManager = () => {

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
            <Link href="/" className="flex flex-row items-center">
                <Image src={logo} alt="logo" className="h-16 w-40 max-md:w-40 max-md:h-14"/>
            </Link>
        </div>
    );
}

export default AuthManager;