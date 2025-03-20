import News from "@/component/News";

export const generateMetadata = async ({ params }: any) => {
    const id = parseInt(params.newsId);
  
    try {
      // Получаем данные из API
      const response = await fetch(`http://localhost:3001/news/${id}`);
      const data = await response.json();
  
      // Проверяем, что данные получены корректно
      if (data && Array.isArray(data) && data.length > 0) {
        const news = data[0]; // Получаем новость
  
        return {
          title: news.title ? `${news.title} | SMART ТЕХНИКА` : "Новость | SMART ТЕХНИКА",
          description: news.summary || "Читайте последние новости SMART ТЕХНИКА.",
          openGraph: {
            title: news.title ? `${news.title} | SMART ТЕХНИКА` : "Новость | SMART ТЕХНИКА",
            description: news.summary || "Читайте последние новости SMART ТЕХНИКА.",
            url: `https://localhost:3000/news/${id}`,
            type: "article",
            images: [
              {
                url: news.preview_img || news.content?.sections?.["1"]?.url || "/default-news-banner.jpg",
                alt: news.content?.sections?.["1"]?.alt || "Превью новости",
              },
            ],
            article: {
              published_time: news.date || null,
              tags: Object.values(news.content?.sections || {}).map((section: any) => section?.type).filter(Boolean),
            },
          },
          twitter: {
            card: "summary_large_image",
            title: news.title ? `${news.title} | SMART ТЕХНИКА` : "Новость | SMART ТЕХНИКА",
            description: news.summary || "Читайте последние новости SMART ТЕХНИКА.",
            images: [news.preview_img || news.content?.sections?.["1"]?.url || "/default-news-banner.jpg"],
          },
        };
      } else {
        // Возвращаем метаданные, если новость не найдена
        return {
          title: "Новость не найдена | SMART ТЕХНИКА",
          description: "К сожалению, данная новость недоступна.",
        };
      }
    } catch (error) {
      // Логируем ошибку и возвращаем метаданные по умолчанию
      console.error("Ошибка при получении метаданных для новости:", error);
      return {
        title: "Ошибка | SMART ТЕХНИКА",
        description: "Произошла ошибка при загрузке данных новости.",
      };
    }
  };
  

const page = ({ params }: any) => {
  const id = parseInt(params.newsId);

  return (
    <main className="flex flex-col justify-center gap-20 w-10/12 max-xl:w-11/12 mx-auto">
      <News id={id} />
    </main>
  );
};

export default page;
