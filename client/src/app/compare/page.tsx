import Breacd from "@/component/Breacd";
import List_Compare from "@/component/List_Compare";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Сравнение товаров | SMART ТЕХНИКА",
    description: "Сравните характеристики и цены товаров, чтобы сделать лучший выбор с SMART ТЕХНИКА. Быстрый доступ к сравнению ключевых параметров.",
    robots: "noindex, nofollow",
    openGraph: {
        title: "Сравнение товаров | SMART ТЕХНИКА",
        description: "Найдите идеальный продукт, сравнив характеристики и цены на странице сравнения SMART ТЕХНИКА.",
        url: "http://localhost:3000/compare",
        type: "website",
        images: [
            {
                url: "/compare-products.jpg", 
                alt: "Сравнение товаров SMART ТЕХНИКА",
            },
        ],
    },
    alternates: {
        canonical: "http://localhost:3000/compare",
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};


const page = () => {
    return (
        <main className="flex flex-col justify-center gap-10 w-10/12 max-xl:w-11/12 mx-auto">
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Сравнение"}]}/>
            <List_Compare />
        </main>
    );
}

export default page;