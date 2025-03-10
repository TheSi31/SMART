import Breacd from "@/component/Breacd";
import List_Catalog from "@/component/List_Catalog";

// Динамическая генерация метаданных для категории
export const generateMetadata = async ({ params }: any) => {
    const categoryId = parseInt(params.categoriesId);
  
    try {
      // Запрос к API для получения данных категории
      const response = await fetch(`http://localhost:3001/categories/${categoryId}`);
      const data = await response.json();
  
      // Проверяем, что data - массив, и берём первый элемент
      const category = Array.isArray(data) && data.length > 0 ? data[0] : null;
  
      if (category && category.name) {
        return {
          title: `${category.name} | Каталог | SMART ТЕХНИКА`,
          description: `Ознакомьтесь с широким ассортиментом в категории ${category.name}. Лучшие товары только у SMART ТЕХНИКА.`,
          openGraph: {
            title: `${category.name} | Каталог | SMART ТЕХНИКА`,
            description: `Ознакомьтесь с широким ассортиментом в категории ${category.name}. Найдите идеальный товар для себя с SMART ТЕХНИКА.`,
            url: `http://localhost:3000/catalog/${categoryId}`,
            type: "website",
            images: [
              {
                url: `/images/category-${categoryId}.jpg`,
                alt: `${category.name}`,
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title: `${category.name} | Каталог | SMART ТЕХНИКА`,
            description: `Найдите лучшие товары в категории ${category.name} с SMART ТЕХНИКА.`,
            images: [`/images/category-${categoryId}.jpg`],
          },
        };
      } else {
        console.error("Категория не найдена в данных API:", data);
        return {
          title: "Категория не найдена | SMART ТЕХНИКА",
          description: "К сожалению, данная категория недоступна.",
        };
      }
    } catch (error) {
      console.error("Ошибка при загрузке категории:", error);
      return {
        title: "Ошибка | SMART ТЕХНИКА",
        description: "Произошла ошибка при загрузке данных категории.",
      };
    }
  };  

// Основной компонент страницы
const Page = ({ params }: any) => {
  const getCategoryName = (id: number): string => {
    // Упрощённая версия получения названий категорий
    const categoryNames: { [key: number]: string } = {
      1: "Гироскутеры",
      2: "Квадроциклы",
      3: "Мотоциклы",
      4: "Сигвеи и мини-сигвеи",
      5: "Электроскутеры",
      6: "Электросамокаты",
      7: "Электромобили",
      8: "Аксессуары",
      9: "Умные игрушки",
      10: "Smart Watch",
    };

    return categoryNames[id] || "Неизвестная категория";
  };

  return (
    <main className="flex flex-col justify-center gap-10 w-10/12 max-xl:w-full max-xl:px-5 mx-auto overflow-hidden">
      {/* Хлебные крошки */}
      <Breacd
        items={[
          { name: "Главная", url: "/" },
          { name: "Каталог", url: "/catalog" },
          { name: getCategoryName(parseInt(params.categoriesId)) },
        ]}
      />
      <h1 className="text-4xl font-bold">
        {getCategoryName(parseInt(params.categoriesId))}
      </h1>
      <List_Catalog categories={params.categoriesId}></List_Catalog>
    </main>
  );
};

export default Page;
