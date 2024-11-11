'use client';
import React, { useState } from 'react';
import "./Header_menu_md.css";

import Image from "next/image";
import Link from "next/link";

import { CloseOutlined } from '@ant-design/icons';

import home from "../../img/menu-md/home.svg";
import catalog from "../../img/menu-md/catalog.svg";
import cart from "../../img/menu-md/cart.svg";
import search from "../../img/menu-md/search.svg";
import more from "../../img/menu-md/more.svg";
import { Drawer } from 'antd';

const Header_menu_md = () => {

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
                
            </Drawer>
            <Drawer open={openCart} onClose={() => serOpenCart(false)} placement="bottom" zIndex={1} 
            height={"90vh"} closeIcon={<CloseOutlined style={{ color: "red" }} />} className='custom-drawer' extra={<h1 className='font-bold text-2xl'>Корзина</h1>}>
                <h1>Корзина</h1>
            </Drawer>
            <Drawer open={openSearch} onClose={() => serOpenSearch(false)} placement="bottom" zIndex={1} 
            height={"90vh"} closeIcon={<CloseOutlined style={{ color: "red" }} />} className='custom-drawer' extra={<h1 className='font-bold text-2xl'>Поиск</h1>}>
                <h1>Поиск</h1>
            </Drawer>
            <Drawer open={openMore} onClose={() => serOpenMore(false)} placement="bottom" zIndex={1} 
            height={"90vh"} closeIcon={<CloseOutlined style={{ color: "red" }} />} className='custom-drawer' extra={<h1 className='font-bold text-2xl'>Еще</h1>}>
                <h1>Еще</h1>
            </Drawer>
        </div>
    );
}

export default Header_menu_md;