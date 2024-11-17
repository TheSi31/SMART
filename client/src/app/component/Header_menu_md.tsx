'use client';
import React, { useState } from 'react';
import "./Header_menu_md.css";

import Image from "next/image";
import Link from "next/link";

import type { MenuProps } from 'antd';

import { CloseOutlined } from '@ant-design/icons';

import home from "../../img/menu-md/home.svg";
import catalog from "../../img/menu-md/catalog.svg";
import cart from "../../img/menu-md/cart.svg";
import search from "../../img/menu-md/search.svg";
import more from "../../img/menu-md/more.svg";
import { Drawer, Input } from 'antd';

const Header_menu_md = ({menu_items: antd_items}: {menu_items: MenuProps['items']}) => {

    const [openCatalog, serOpenCatalog] = useState(false);
    const [openCart, serOpenCart] = useState(false);
    const [openSearch, serOpenSearch] = useState(false);
    const [openMore, serOpenMore] = useState(false);

    const onClose = () => {
        serOpenCatalog(false);
        serOpenCart(false);
        serOpenSearch(false);
        serOpenMore(false);
    };

    const onOpenCatalog = () => {
        serOpenCatalog(true);
        serOpenCart(false);
        serOpenSearch(false);
        serOpenMore(false);
    }

    const onOpenCart = () => {
        serOpenCatalog(false);
        serOpenCart(true);
        serOpenSearch(false);
        serOpenMore(false);
    }

    const onOpenSearch = () => {
        serOpenCatalog(false);
        serOpenCart(false);
        serOpenSearch(true);
        serOpenMore(false);
    }

    const onOpenMore = () => {
        serOpenCatalog(false);
        serOpenCart(false);
        serOpenSearch(false);
        serOpenMore(true);
    }

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-menu-dark-blue p-4 max-sm:p-2 z-10">
            <div className="flex justify-center items-center w-full h-full">
                <ul className="flex flex-row w-4/5 max-sm:w-full justify-between text-white">
                    <li>
                        <Link href="/" className="flex flex-col items-center" onClick={onClose}>
                            <Image src={home} alt="Главная"></Image>
                            <h1>Главная</h1> 
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex flex-col items-center" onClick={onOpenCatalog}>
                            <Image src={catalog} alt="Каталог"></Image>
                            <h1>Каталог</h1>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex flex-col items-center" onClick={onOpenCart}>
                            <Image src={cart} alt="Корзина"></Image>
                            <h1>Корзина</h1>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex flex-col items-center" onClick={onOpenSearch}>
                            <Image src={search} alt="Поиск"></Image>
                            <h1>Поиск</h1>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex flex-col items-center" onClick={onOpenMore}>
                            <Image src={more} alt="Еще"></Image>
                            <h1>Еще</h1>
                        </Link>
                    </li>
                </ul>
            </div>
            <Drawer open={openCatalog} onClose={() => serOpenCatalog(false)} placement="bottom" zIndex={1} 
            height={"90vh"} closeIcon={<CloseOutlined style={{ color: "red" }} />} className='custom-drawer' extra={<h1 className='font-bold text-2xl'>Каталог</h1>}>
                <div>
                    <ul className="flex flex-col gap-2">
                        {antd_items.map((item) => (
                            <li key={item.key}>
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </Drawer>
            <Drawer open={openCart} onClose={() => serOpenCart(false)} placement="bottom" zIndex={1} 
            height={"90vh"} closeIcon={<CloseOutlined style={{ color: "red" }} />} className='custom-drawer' extra={<h1 className='font-bold text-2xl'>Корзина</h1>}>
                <h1>Корзина</h1>
            </Drawer>
            <Drawer open={openSearch} onClose={() => serOpenSearch(false)} placement="bottom" zIndex={1} 
            height={"90vh"} closeIcon={<CloseOutlined style={{ color: "red" }} />} className='custom-drawer' extra={<h1 className='font-bold text-2xl'>Поиск</h1>}>
                <Input placeholder="Поиск" className="w-full" />
            </Drawer>
            <Drawer open={openMore} onClose={() => serOpenMore(false)} placement="bottom" zIndex={1} 
            height={"90vh"} closeIcon={<CloseOutlined style={{ color: "red" }} />} className='custom-drawer' extra={<h1 className='font-bold text-2xl'>Еще</h1>}>
                <div>
                    <ul className="flex flex-col m-4 font-medium">
                        <li className="flex items-center py-4 border-b border-b-[#C8CACB] cursor-pointer hover:text-xl hover:border-b-[#868889] transition-all duration-300 ease-out">
                            <Link href="/about">О компании</Link>
                        </li>
                        <li className="flex items-center py-4 border-b border-b-[#C8CACB] cursor-pointer hover:text-xl hover:border-b-[#868889] transition-all duration-300 ease-out">
                            <Link href="/promotions">Акции</Link>
                        </li>
                        <li className="flex items-center py-4 border-b border-b-[#C8CACB] cursor-pointer hover:text-xl hover:border-b-[#868889] transition-all duration-300 ease-out">
                            <Link href="/installment">Рассрочка 0|0|18</Link>
                        </li>
                        <li className="flex items-center py-4 border-b border-b-[#C8CACB] cursor-pointer hover:text-xl hover:border-b-[#868889] transition-all duration-300 ease-out">
                            <Link href="/service">Сервис и гарантия</Link>
                        </li>
                        <li className="flex items-center py-4 border-b border-b-[#C8CACB] cursor-pointer hover:text-xl hover:border-b-[#868889] transition-all duration-300 ease-out">
                            <Link href="/wholesale">Опт/дропшиппинг</Link>
                        </li>
                        <li className="flex items-center py-4 border-b border-b-[#C8CACB] cursor-pointer hover:text-xl hover:border-b-[#868889] transition-all duration-300 ease-out">
                            <Link href="/contacts">Контакты</Link>
                        </li>
                    </ul>
                </div>
            </Drawer>
        </div>
    );
}

export default Header_menu_md;