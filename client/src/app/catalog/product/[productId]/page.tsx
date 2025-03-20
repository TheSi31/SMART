
import Product_More from "@/component/Product_More";
import List_Products from "@/component/List_Products";


export const generateMetadata = async ({ params }: any) => {
    const productId = parseInt(params.productId);
  
    try {
      // Запрос к API для получения данных продукта
      const response = await fetch(`http://localhost:3001/products/${productId}`);
      const data = await response.json();
  
      // Проверяем, что data является массивом и берём первый элемент
      const product = Array.isArray(data) && data.length > 0 ? data[0] : null;
  
      if (product && product.name) {
        return {
          title: `${product.name} | SMART ТЕХНИКА`,
          description: product.description || 'Узнайте больше о данном продукте.',
          openGraph: {
            title: `${product.name} | SMART ТЕХНИКА`,
            description: product.description || 'Посмотрите все характеристики и особенности данного продукта.',
            url: `http://localhost:3000/products/${productId}`,
            images: [
              {
                url: product.image_url || "/placeholder-product.jpg",
                alt: `${product.name}`,
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title: `${product.name} | SMART ТЕХНИКА`,
            description: product.description || 'Узнайте больше о продукте на SMART ТЕХНИКА.',
            images: [product.image_url || "/placeholder-product.jpg"],
          },
        };
      } else {
        console.error("Продукт не найден в данных API:", data);
        return {
          title: "Продукт не найден | SMART ТЕХНИКА",
          description: "К сожалению, данный продукт недоступен.",
        };
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных продукта:", error);
      return {
        title: "Ошибка | SMART ТЕХНИКА",
        description: "Произошла ошибка при загрузке данных о продукте.",
      };
    }
  };
  

const page = ({params}:any) => {
    
    const id = parseInt(params.productId);

    return (
        <main className="flex flex-col justify-center gap-20 w-10/12 max-xl:w-full max-xl:px-5 mx-auto overflow-hidden">
            <Product_More id={id} />
            <div className="flex flex-col gap-10">
                <h2 className="text-2xl font-bold">Рекомендуем</h2>
                <List_Products categories={1}></List_Products>
            </div>
        </main>
    );
}

export default page;