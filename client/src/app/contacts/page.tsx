import Contcat_Us from "@/component/Contcat_Us";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Контакты | SMART ТЕХНИКА",
    description: "Свяжитесь с SMART ТЕХНИКА! Найдите адреса магазинов, телефоны и форму обратной связи.",
    robots: "index, follow",
    openGraph: {
      title: "Контакты | SMART ТЕХНИКА",
      description: "Свяжитесь с SMART ТЕХНИКА! Найдите адреса магазинов, телефоны и форму обратной связи.",
      url: "http://localhost:3000/сontacts",
      type: "website",
      images: [
        {
          url: "/contact-photo.jpg", // фото офиса
          alt: "Офис SMART ТЕХНИКА",
        },
      ],      
    },
    twitter: {
      card: "summary_large_image",
      title: "Контакты | SMART ТЕХНИКА",
      description: "Свяжитесь с нами для получения дополнительной информации о SMART ТЕХНИКА.",
      images: ["/team-photo.jpg"],
    },
    alternates: {
      canonical: "http://localhost:3000/сontacts",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
  

const page = () => {
    return (
        <main className="flex flex-col justify-center gap-20 w-10/12 max-xl:w-11/12 mx-auto">
            <Contcat_Us/>
        </main>
    );
}

export default page;