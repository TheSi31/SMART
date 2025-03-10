import Breacd from "@/component/Breacd";
import List_Viewed from "@/component/List_Viewed";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Просмотренные товары | SMART ТЕХНИКА",
    description: "История ваших просмотренных товаров в SMART ТЕХНИКА. Легко находите ранее просмотренные товары и продолжайте покупки.",
    robots: "noindex, nofollow",
    openGraph: {
      title: "Просмотренные товары | SMART ТЕХНИКА",
      description: "Удобный доступ к истории ваших просмотренных товаров в SMART ТЕХНИКА.",
      url: "http://localhost:3000/viewed",
      type: "website",
      images: [
        {
          url: "/viewed-products.jpg", // Подставьте изображение, связанное с покупками или товарами
          alt: "Просмотренные товары в SMART ТЕХНИКА",
        },
      ],
    },
    alternates: {
      canonical: "http://localhost:3000/viewed",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
  


const page = () => {
    return (
        <main className="flex flex-col justify-center gap-10 py-10 w-10/12 max-xl:w-11/12 mx-auto">
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Просмотренные товары"}]}/>
            <h2 className="text-3xl font-bold">Просмотренные товары</h2>
            <List_Viewed />
        </main>
    );
}

export default page;