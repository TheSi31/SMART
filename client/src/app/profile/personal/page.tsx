import Breacd from "@/component/Breacd";
import FormEditUser from "@/component/FormEditUser";
import MenuUser from "@/component/MenuUser";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Персональные данные | SMART ТЕХНИКА",
    description: "Просмотрите и обновите ваши персональные данные для аккаунта SMART ТЕХНИКА.",
    robots: "noindex, nofollow",
    openGraph: {
      title: "Персональные данные | SMART ТЕХНИКА",
      description: "Управляйте вашими персональными данными в аккаунте SMART ТЕХНИКА.",
      url: "http://localhost:3000/profile/personal", // Общий URL без идентификаторов
      type: "website",
      images: [
        {
          url: "/personal-data-default.jpg", // Стандартное изображение, нейтральное для темы безопасности
          alt: "Управление данными SMART ТЕХНИКА",
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
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Личный кабинет" , url: "/profile/general"}, {name: "Личные данные",}]}/>
            <h2 className="text-3xl font-bold">Личные данные</h2>
            <div className="grid grid-cols-[25%_75%] max-md:grid-cols-1">
                <MenuUser />
                <FormEditUser />
            </div>
        </main>      
    );
}

export default page;