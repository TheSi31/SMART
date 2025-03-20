
import Promos from "@/component/Promos";

export const generateMetadata = async ({ params }: any) => {
    const id = parseInt(params.promosId); // Изменил newsId на promoId
  
    try {
      // Получаем данные из API
      const response = await fetch(`http://localhost:3001/promos/${id}`);
      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Проверяем, что данные получены корректно и что это объект
      if (data && typeof data === "object" && data.id) {
        return {
          title: data.title ? `${data.title} | SMART ТЕХНИКА` : "Акция | SMART ТЕХНИКА",
          description: data.summary || "Узнайте больше об эксклюзивных акциях от SMART ТЕХНИКА.",
          openGraph: {
            title: data.title ? `${data.title} | SMART ТЕХНИКА` : "Акция | SMART ТЕХНИКА",
            description: data.summary || "Узнайте больше об эксклюзивных акциях от SMART ТЕХНИКА.",
            url: `http://localhost:3000/promos/${id}`,
            type: "article",
            images: [
              {
                url: data.preview_img || "/default-promo-banner.jpg",
                alt: data.title || "Превью акции",
              },
            ],
            article: {
              published_time: data.date || null,
              tags: data.content?.sections
                ? Object.values(data.content.sections).map((section: any) => section?.type).filter(Boolean)
                : [],
            },
          },
          twitter: {
            card: "summary_large_image",
            title: data.title ? `${data.title} | SMART ТЕХНИКА` : "Акция | SMART ТЕХНИКА",
            description: data.summary || "Узнайте больше об эксклюзивных акциях от SMART ТЕХНИКА.",
            images: [data.preview_img || "/default-promo-banner.jpg"],
          },
        };
      } else {
        // Возвращаем метаданные по умолчанию, если акция не найдена
        return {
          title: "Акция не найдена | SMART ТЕХНИКА",
          description: "К сожалению, данная акция недоступна.",
        };
      }
    } catch (error) {
      // Логируем ошибку и возвращаем метаданные по умолчанию
      console.error("Ошибка при получении метаданных для акции:", error);
      return {
        title: "Ошибка | SMART ТЕХНИКА",
        description: "Произошла ошибка при загрузке данных акции.",
      };
    }
  };
  
  

const page = ({ params }: any) => {
  const id = parseInt(params.promosId);

  return (
    <main className="flex flex-col justify-center gap-20 w-10/12 max-xl:w-11/12 mx-auto">
      <Promos id={id} />
    </main>
  );
};

export default page;

