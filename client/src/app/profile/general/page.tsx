
import Breacd from "@/component/Breacd";
import MenuUser from "@/component/MenuUser";
import UserData from "@/component/UserData";

import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Ваш профиль | SMART ТЕХНИКА",
    description: "Просмотрите и обновите информацию вашего профиля на сайте SMART ТЕХНИКА.",
    robots: "noindex, nofollow",
    openGraph: {
      title: "Ваш профиль | SMART ТЕХНИКА",
      description: "Управляйте настройками вашего аккаунта и персональными данными в SMART ТЕХНИКА.",
      url: "http://localhost:3000/profile/general",
      type: "website",
      images: [
        {
          url: "", 
          alt: "Профиль пользователя SMART ТЕХНИКА",
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
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Личный кабинет" , url: "/profile/general"}, {name: "Общие сведения",}]}/>
            <h2 className="text-3xl font-bold">Общие сведения</h2>    
            <div className="grid grid-cols-[25%_75%] max-md:grid-cols-1">
                <MenuUser />
                <UserData />
            </div>
        </main>      
    );
}

export default page;