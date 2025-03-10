import Breacd from "@/component/Breacd";
import List_Vacancies from "@/component/List_Vacancies";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Вакансии | SMART ТЕХНИКА",
    description: "Присоединяйтесь к команде SMART ТЕХНИКА! Ознакомьтесь с актуальными вакансиями и узнайте больше об условиях работы.",
    robots: "index, follow",
    openGraph: {
      title: "Вакансии | SMART ТЕХНИКА",
      description: "Ищете интересную работу? Узнайте о возможностях карьеры в SMART ТЕХНИКА и станьте частью нашей команды!",
      url: "http://localhost:3000/vacancies",
      type: "website",
      images: [
        {
          url: "/jobs-banner.jpg", // Подставьте изображение команды или офиса
          alt: "Работа в SMART ТЕХНИКА",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Вакансии | SMART ТЕХНИКА",
      description: "Присоединяйтесь к нашей команде! Актуальные вакансии SMART ТЕХНИКА ждут вас.",
      images: ["/jobs-banner.jpg"],
    },
    alternates: {
      canonical: "http://localhost:3000/vacancies",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
  

const page = () => {
    return (
        <main className="flex flex-col justify-center gap-10 w-10/12 max-xl:w-11/12 mx-auto">
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Вакансии"}]}/>
            <h1 className="text-4xl font-bold">Вакансии</h1>
            <div className="grid grid-cols-[75%_25%]">
                <div>
                    <List_Vacancies />
                </div>
                <div>
                    <p>тут резюме</p>
                </div>
            </div>
        </main>
    );
}

export default page;