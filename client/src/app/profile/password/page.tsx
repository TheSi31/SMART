import Breacd from "@/component/Breacd";
import FormPassword from "@/component/FormPassword";
import MenuUser from "@/component/MenuUser";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Смена пароля | SMART ТЕХНИКА",
    description: "Измените ваш пароль для безопасного доступа к SMART ТЕХНИКА.",
    robots: "noindex, nofollow",
    openGraph: {
      title: "Смена пароля | SMART ТЕХНИКА",
      description: "Измените ваш пароль для защиты вашего аккаунта.",
      url: "http://localhost:3000/profile/password", // Общий URL
      type: "website",
      images: [
        {
          url: "/security.jpg", // Универсальное изображение безопасности
          alt: "Защита аккаунта",
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
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Личный кабинет" , url: "/profile/general"}, {name: "Сменить пароль",}]}/>
            <h2 className="text-3xl font-bold">Сменить пароль</h2>
            <div className="grid grid-cols-[25%_75%] max-md:grid-cols-1">
                <MenuUser />
                <FormPassword />
            </div>
        </main>      
    );
}

export default page;