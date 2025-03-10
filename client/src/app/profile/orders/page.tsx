import Breacd from "@/component/Breacd";
import List_Orders from "@/component/List_Orders";
import MenuUser from "@/component/MenuUser";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Мои заказы | SMART ТЕХНИКА",
    description: "Просмотрите историю ваших заказов в SMART ТЕХНИКА. Статусы и детали покупок всегда под рукой.",
    robots: "noindex, nofollow",
    openGraph: {
      title: "Мои заказы | SMART ТЕХНИКА",
      description: "Легкий доступ к истории ваших заказов в SMART ТЕХНИКА.",
      url: "http://localhost:3000/profile/orders", // Общий URL, без персонализированных данных
      type: "website",
      images: [
        {
          url: "/orders-default.jpg", // Стандартное изображение
          alt: "История заказов в SMART ТЕХНИКА",
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
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Личный кабинет" , url: "/profile/general"}, {name: "История покупок",}]}/>
            <h2 className="text-3xl font-bold">История покупок</h2>
            <div className="grid grid-cols-[25%_75%] max-md:grid-cols-1">
                <MenuUser />
                <List_Orders />
            </div>
        </main>      
    );
}

export default page;