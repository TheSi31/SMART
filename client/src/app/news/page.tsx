import Breacd from "@/component/Breacd";
import List_News from "@/component/List_News";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Новости | SMART ТЕХНИКА",
    description: "Актуальные новости и события из мира SMART ТЕХНИКА. Будьте в курсе последних обновлений и интересных статей.",
    robots: "index, follow",
    openGraph: {
      title: "Новости | SMART ТЕХНИКА",
      description: "Последние новости и события из мира SMART ТЕХНИКА. Следите за обновлениями и оставайтесь в тренде.",
      url: "http://localhost:3000/news",
      type: "website",
      images: [
        {
          url: "/news-banner.jpg", // Укажите баннер, связанный с новостями
          alt: "Новости SMART ТЕХНИКА",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Новости | SMART ТЕХНИКА",
      description: "Узнайте о последних событиях и новостях SMART ТЕХНИКА. Эксклюзивные обновления и аналитика.",
      images: ["/news-banner.jpg"],
    },
    alternates: {
      canonical: "http://localhost:3000/news",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
  

const page = () => {
    return (
        <main className="flex flex-col justify-center gap-20 w-10/12 max-xl:w-11/12 mx-auto">
            <div className="flex flex-col gap-5">
                <Breacd items={[{name: "Главная", url: "/"}, {name: "Новости"}]}/>
                <h1 className="text-2xl font-bold">Новости</h1>
                <List_News />
            </div>
        </main>
    );
}

export default page;