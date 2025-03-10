import Image from "next/image";
import { Dropdown, ConfigProvider} from "antd";

import type { MenuProps } from 'antd';

import logo from "../img/menu/logo.svg";

import eye from "../img/menu/eye.svg";
import like from "../img/menu/like.svg";
import compare from "../img/menu/compare.svg";
import cart from "../img/menu/cart.svg";
import menu_icon from "../img/menu-icon.svg";

import hoverboard from "../img/catalog/hoverboard.svg"
import samokats from "../img/catalog/samokats.svg"
import unicycle from "../img/catalog/unicycle.svg"
import segways from "../img/catalog/segways.svg"
import scooters from "../img/catalog/scooters.svg"
import bike from "../img/catalog/bike.svg"
import cars from "../img/catalog/cars.svg"
import accessories from "../img/catalog/accessories.svg"
import smart_toys from "../img/catalog/smart-toys.svg"
import smart_watch from "../img/catalog/smart-watch.svg"

import Link from "next/link";
import SearchButton from "./SearchButton";
import Header_menu_md from "./Header_menu_md";
import AuthManager from "./AuthManager";

const menu_items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link href="/catalog/categories/1" className="flex flex-row items-center gap-4 font-medium"><Image src={hoverboard} alt="hoverboard"></Image>Гироскутеры</Link>
        )
    },
    {
        key: '2',
        label: (
            <Link href="/catalog/categories/2" className="flex flex-row items-center gap-4 font-medium"><Image src={samokats} alt="samokats"></Image>Электросамокаты</Link>
        )
    },
    {
        key: '3',
        label: (
            <Link href="/catalog/categories/3" className="flex flex-row items-center gap-4 font-medium"><Image src={unicycle} alt="unicycle"></Image>Моноколеса</Link>
        )   
    },
    {
        key: '4',
        label: (
            <Link href="/catalog/categories/4" className="flex flex-row items-center gap-4 font-medium"><Image src={segways} alt="segways"></Image>Сигвеи и мини-сигвеи</Link>
        )
    },
    {
        key: '5',
        label: (
            <Link href="/catalog/categories/5" className="flex flex-row items-center gap-4 font-medium"><Image src={scooters} alt="scooters"></Image>Электроскутеры</Link>
        )
    },
    {
        key: '6',
        label: (
            <Link href="/catalog/categories/6" className="flex flex-row items-center gap-4 font-medium"><Image src={bike} alt="bike"></Image>Электровелосипеды</Link>
        )
    },
    {
        key: '7',
        label: (
            <Link href="/catalog/categories/7" className="flex flex-row items-center gap-4 font-medium"><Image src={cars} alt="cars"></Image>Электромобили</Link>
        )
    },
    {
        key: '8',
        label: (
            <Link href="/catalog/categories/8" className="flex flex-row items-center gap-4 font-medium"><Image src={accessories} alt="accessories"></Image>Аксессуары</Link>
        )
    },
    {
        key: '9',
        label: (
            <Link href="/catalog/categories/9" className="flex flex-row items-center gap-4 font-medium"><Image src={smart_toys} alt="smart_toys"></Image>Умные игрушки</Link>
        )
    },
    {
        key: '10',
        label: (
            <Link href="/catalog/categories/10" className="flex flex-row items-center gap-4 font-medium"><Image src={smart_watch} alt="smart_watch"></Image>Smart Watch</Link>
        )
    }
]


const Header = () => {
    return (
        <header className="flex flex-col w-full h-32 max-xl:h-auto bg-white">
            <div className="grid grid-rows-2 w-full h-full max-xl:h-auto max-md:grid-rows-1">
                <div className="grid grid-cols-[25%_75%] w-10/12 mx-auto max-xl:w-11/12 max-md:grid-cols-2">
                    <Link href="/" className="flex flex-row items-center">
                        <Image src={logo} alt="logo" className="h-16 w-40 max-md:w-40 max-md:h-14"/>
                    </Link>
                    <div className="flex flex-row items-center justify-between text-black max-[1440px]:justify-end max-[1440px]:gap-12">
                        <div className="flex flex-row items-center gap-4 max-[1440px]:hidden">
                            <p className="text-base">+7 (812) 660-50-54</p>
                            <p>+7 (958) 111-95-03</p>
                            <p className="text-[#838688]">Пн-вс: с 10:00 до 21:00</p>
                        </div>
                        <div className="flex flex-row items-center max-md:hidden">
                            <SearchButton/>
                            <Link href="/viewed">
                                <Image src={eye} alt="eye" className="h-12 w-12"/>
                            </Link>
                            <Link href="/favorites">
                                <Image src={like} alt="like" className="h-12 w-12"/>
                            </Link>
                            <Image src={compare} alt="compare" className="h-12 w-12"/>
                            <Link href="/cart">
                                <Image src={cart} alt="cart" className="h-12 w-12"/>
                            </Link>
                        </div>
                        <AuthManager/>
                    </div>
                </div>
                <div className="bg-menu-blue max-md:hidden">
                    <div className="grid grid-cols-[25%_75%] w-10/12 max-xl:w-11/12 h-full mx-auto">
                        <div className=" flex flex-row items-center bg-[#243c53] w-full h-full">
                            <ConfigProvider
                                theme={{
                                token: {
                                    colorBgElevated: '#edf2f6',
                                    colorBgContainer: '#edf2f6',
                                    controlItemBgHover: '#dae4ed',
                                }
                            }}>                                
                                <Dropdown menu={{ items: menu_items }} placement="bottomLeft" trigger={['click']} className="w-full h-full cursor-pointer">
                                    <div className="flex flex-row items-center gap-4 p-4">
                                        <Image src={menu_icon} alt="menu_icon" className="h-8 w-8"/>
                                        <p className="text-white text-base">Каталог товаров</p>
                                    </div>
                                </Dropdown>
                            </ConfigProvider>
                        </div>
                        <div className="flex flex-row items-center text-white w-full h-full">
                            <ul className="flex flex-row m-4 items-center gap-10 w-full h-full max-[1440px]:gap-4 max-[1440px]: text-sm">
                                <li className="flex items-center cursor-pointer h-full hover:font-normal transition-all duration-300 ease-out">
                                    <Link className="flex items-center w-full h-full" href="/about">
                                        <p>О компании</p>
                                    </Link>
                                </li>
                                <li className="flex items-center cursor-pointer h-full hover:font-normal transition-all duration-300 ease-out">
                                    <Link className="flex items-center w-full h-full" href="/promotions">
                                        <p>Акции</p>
                                    </Link>
                                </li>
                                <li className="flex items-center cursor-pointer h-full hover:font-normal transition-all duration-300 ease-out">
                                    <Link className="flex items-center w-full h-full" href="/installment">
                                        <p>Рассрочка 0|0|18</p>
                                    </Link>
                                </li>
                                <li className="flex items-center cursor-pointer h-full hover:font-normal transition-all duration-300 ease-out">
                                    <Link className="flex items-center w-full h-full" href="/service">
                                        <p>Сервис и гарантия</p>
                                    </Link>
                                </li>
                                <li className="flex items-center cursor-pointer h-full hover:font-normal transition-all duration-300 ease-out">
                                    <Link className="flex items-center w-full h-full" href="/wholesale">
                                        <p>Опт/дропшиппинг</p>
                                    </Link>
                                </li>
                                <li className="flex items-center cursor-pointer h-full hover:font-normal transition-all duration-300 ease-out">
                                    <Link className="flex items-center w-full h-full" href="/contacts">
                                        <p>Контакты</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Header_menu_md menu_items={menu_items}/>
            </div>
        </header>
    );
}

export default Header;