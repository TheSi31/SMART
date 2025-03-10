import { Metadata } from "next";

import { Carousel, ConfigProvider } from "antd";
import List_Products from "../component/List_Products";

export const metadata: Metadata = {
  title: "SMART ТЕХНИКА",
  description: "Сеть магазинов техники в Санкт-Петербурге. Лучшие цены и большой выбор!",
  robots: "index, follow",
  openGraph: {
    title: "SMART ТЕХНИКА",
    description: "Сеть магазинов техники в Санкт-Петербурге. Лучшие цены и большой выбор!",
    url: "http://localhost:3000",
    type: "website",
    images: [
      {
        url: "/favicon.ico",
        alt: "Логотип SMART ТЕХНИКА",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMART ТЕХНИКА",
    description: "Сеть магазинов техники в Санкт-Петербурге. Лучшие цены и большой выбор!",
    images: ["/favicon.ico"],
  },
  alternates: {
    canonical: "http://localhost:3000",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};




export default function Home() {

  return (
    <main className="flex flex-col justify-center gap-20 w-10/12 max-xl:w-11/12 mx-auto">
      <div className="grid grid-cols-[25%_75%] max-lg:grid-cols-1 mt-5">
        <div className="max-lg:hidden"></div>
        <ConfigProvider
            theme={{ 
              components: {
                Carousel: {
                  dotWidth: '23%',
                  dotActiveWidth: '24%'
                },
              },
            }}
          >
            <Carousel className="rounded-lg overflow-hidden h-[412px] max-md:h-[360px] max-sm:h-[160px]">
              <div>
                <h3 className="flex justify-center items-center text-white text-center bg-[#364d79] h-[420px] max-md:h-[360px] max-sm:h-[160px]">1</h3>
              </div>
              <div>
                <h3 className="flex justify-center items-center text-white text-center bg-[#364d79] h-[420px] max-md:h-[360px] max-sm:h-[160px]">2</h3>
              </div>
              <div>
                <h3 className="flex justify-center items-center text-white text-center bg-[#364d79] h-[420px] max-md:h-[360px] max-sm:h-[160px]">3</h3>
              </div>
              <div>
                <h3 className="flex justify-center items-center text-white text-center bg-[#364d79] h-[420px] max-md:h-[360px] max-sm:h-[160px]">4</h3>
              </div>
            </Carousel>
        </ConfigProvider>
      </div>
      <List_Products categories="-1"/>
    </main>
  );
}
