import List_Promos from "@/component/List_Promos";
import Breacd from "@/component/Breacd";

export const generateMetadata = async () => {
  return {
    title: "Акции | SMART ТЕХНИКА",
    description: "Ознакомьтесь с нашими актуальными акциями и выгодными предложениями от SMART ТЕХНИКА.",
    openGraph: {
      title: "Акции | SMART ТЕХНИКА",
      description: "Актуальные акции и скидки, которые нельзя пропустить. Узнайте больше на сайте SMART ТЕХНИКА.",
      url: "http://localhost:3000/promos",
      type: "website",
      images: [
        {
          url: "/default-promo-banner.jpg",
          alt: "Баннер Акции SMART ТЕХНИКА",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Акции | SMART ТЕХНИКА",
      description: "Посмотрите наши акции и специальные предложения. Только лучшее от SMART ТЕХНИКА.",
      images: ["/default-promo-banner.jpg"],
    },
  };
};

const page = () => {
  return (
    <main className="flex flex-col justify-center gap-10 w-10/12 max-xl:w-11/12 mx-auto">
      <div className="flex flex-col gap-5">
        <Breacd items={[{ name: "Главная", url: "/" }, { name: "Акции" }]} />
        <h1 className="text-2xl font-bold">Акции</h1>
        <List_Promos />
      </div>
    </main>
  );
};

export default page;
