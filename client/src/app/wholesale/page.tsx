import Breacd from "@/component/Breacd";
import Contact_Us from "@/component/Contcat_Us";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Оптовые закупки | SMART ТЕХНИКА",
    description: "SMART ТЕХНИКА предлагает выгодные условия для оптовых покупателей. Закупайте технику оптом с максимальной выгодой.",
    robots: "index, follow",
    openGraph: {
      title: "Оптовые закупки | SMART ТЕХНИКА",
      description: "Оптовые закупки техники в SMART ТЕХНИКА. Лучшие цены, гибкие условия и высокий уровень сервиса для оптовых клиентов.",
      url: "http://localhost:3000/wholesale",
      type: "website",
      images: [
        {
          url: "/wholesale-photo.jpg", // Подставьте изображение складов или техники
          alt: "Оптовый склад SMART ТЕХНИКА",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Оптовые закупки | SMART ТЕХНИКА",
      description: "Выгодные оптовые закупки техники с лучшими условиями в SMART ТЕХНИКА.",
      images: ["/wholesale-photo.jpg"],
    },
    alternates: {
      canonical: "http://localhost:3000/wholesale",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
  

const page = () => {
    return (
        <main className="flex flex-col justify-center gap-10 w-10/12 max-xl:w-11/12 mx-auto">
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Оптом"}]}/>
            <div className="flex flex-col gap-4 w-4/5">
                <h2 className="text-4xl font-bold">Оптом</h2>
                <p>Наш интернет-магазин специализируется на продаже различных моделей электротранспорта:</p>
                <ul className="list-disc list-inside"> 
                    <li>гироскутеров</li>
                    <li>мини-сигвеев</li>
                    <li>моноколёс</li>
                    <li>электросамокатов</li>
                </ul>
                <div className="flex flex-col gap-2">
                    <p>Мы продаём гироскутеры как в розницу, так и оптом, по специальным ценам. Приглашаем к сотрудничеству оптовых покупателей! </p> 
                    <p>Вы хотите купить гироскутер в Москве оптом? Познакомьтесь с нашими оптовыми ценами, и вы убедитесь: наше предложение действительно выгодное.
                    С нами сотрудничают десятки партнёров в Москве и регионах, закупая гироскутеры оптом: цена намного ниже розничной, что позволяет получать хороший доход от бизнеса. </p>
                    <p>Продавая гироскутеры оптом в Москве, мы готовы организовать доставку любых моделей и в регионы России. Сотрудничайте с нами – это выгодно! </p>
                    <p>Самые выгодные цены - от 5000 руб.!</p>
                </div>
                <Contact_Us></Contact_Us>
            </div>
        </main>
    );
}

export default page;