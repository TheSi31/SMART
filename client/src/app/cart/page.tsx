import Cart from "@/component/Cart";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Корзина | SMART ТЕХНИКА",
    description: "Ваши выбранные товары в корзине SMART ТЕХНИКА. Проверьте, обновите или оформите заказ прямо сейчас.",
    robots: "noindex, nofollow",
    openGraph: {
      title: "Корзина | SMART ТЕХНИКА",
      description: "Просмотрите товары в вашей корзине и оформите заказ в SMART ТЕХНИКА.",
      url: "http://localhost:3000/cart",
      type: "website",
      images: [
        {
          url: "/cart-default.jpg", // Общая иллюстрация, например, пустой или наполненной корзины
          alt: "Корзина SMART ТЕХНИКА",
        },
      ],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
  

const page = () => {
    return (
        <main className="flex flex-col justify-center gap-10 py-10 w-10/12 max-xl:w-11/12 mx-auto">
            <h1 className="text-2xl font-bold">Оформления заказа</h1>
            <Cart />
        </main>
    );
};

export default page;