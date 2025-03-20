import Breacd from "@/component/Breacd";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Каталог товаров | SMART ТЕХНИКА",
    description: "Исследуйте наш каталог товаров в SMART ТЕХНИКА. Найдите лучшие предложения и широкий ассортимент для ваших нужд.",
    robots: "index, follow",
    openGraph: {
        title: "Каталог товаров | SMART ТЕХНИКА",
        description: "Широкий выбор товаров по лучшим ценам. Ознакомьтесь с нашим каталогом товаров в SMART ТЕХНИКА.",
        url: "http://localhost:3000/catalog",
        type: "website",
        images: [
            {
                url: "/catalog-preview.jpg", 
                alt: "Каталог товаров SMART ТЕХНИКА",
            },
        ],
    },
    alternates: {
        canonical: "http://localhost:3000/catalog",
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};


const page = () => {
    return (
        <main className="flex flex-col justify-center gap-20 w-10/12 max-xl:w-11/12 mx-auto">
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Каталог"}]}/>
            <h1>Каталог</h1>
            <div className="grid grid-cols-5 grid-rows-[96px_96px] gap-5">
                <div>
                    <Link href={"/catalog/categories/1"}><h2>Гироскутеры</h2></Link>
                    <Link href={"/catalog/categories/2"}><h2>Квадроциклы</h2></Link>
                    <Link href={"/catalog/categories/3"}><h2>Мотоциклы</h2></Link>
                    <Link href={"/catalog/categories/4"}><h2>Сигвеи и мини-сигвеи</h2></Link>
                    <Link href={"/catalog/categories/5"}><h2>Электроскутеры</h2></Link>
                    <Link href={"/catalog/categories/6"}><h2>Электросамокаты</h2></Link>
                    <Link href={"/catalog/categories/7"}><h2>Электромобили</h2></Link>
                    <Link href={"/catalog/categories/8"}><h2>Аксессуары</h2></Link>
                    <Link href={"/catalog/categories/9"}><h2>Умные игрушки</h2></Link>
                    <Link href={"/catalog/categories/10"}><h2>Smart Watch</h2></Link>
                </div>
            </div>
        </main>
    );
}

export default page;