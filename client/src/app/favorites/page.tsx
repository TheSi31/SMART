import Breacd from "@/component/Breacd";
import List_Favorites from "@/component/List_Favorites";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Избранное | SMART ТЕХНИКА",
    description: "Ваши избранные товары в SMART ТЕХНИКА. Сохраняйте и легко находите понравившуюся технику.",
    robots: "noindex, nofollow",
    openGraph: {
      title: "Избранное | SMART ТЕХНИКА",
      description: "Просматривайте и управляйте вашими избранными товарами в SMART ТЕХНИКА.",
      url: "http://localgost:3000/favorites", // Общий URL
      type: "website",
      images: [
        {
          url: "/favorites-default.jpg", // Общая картинка, например, изображение корзины или товаров
          alt: "Избранные товары SMART ТЕХНИКА",
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
        <main className="flex flex-col justify-center gap-10 w-10/12 max-xl:w-11/12 mx-auto">
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Личный кабинет" , url: "/profile/general"}, {name: "Избранное"}]}/>
            <h2 className="text-4xl font-bold">Избранные товары</h2>
            <List_Favorites />
        </main>
    );
}

export default page;