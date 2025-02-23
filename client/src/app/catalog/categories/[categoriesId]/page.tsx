import Breacd from "@/component/Breacd";
import List_Catalog from "@/component/List_Catalog";

const page = ({params}:any) => {

    const getName = (id: number) => {
        switch (id) {
            case 1:
                return "Гироскутеры"
            case 2:
                return "Квадроциклы"
            case 3:
                return "Мотоциклы"
            case 4:
                return "Сигвеи и мини-сигвеи"
            case 5:
                return "Электроскутеры"
            case 6:
                return "Электросамокаты"
            case 7:
                return "Электромобили"
            case 8:
                return "Аксессуары"
            case 9:
                return "Умные игрушки"
            case 10:
                return "Smart Watch"
            default:
                return ""
        }
    }

    return (
        <main className="flex flex-col justify-center gap-10 w-4/5 max-xl:w-full max-xl:px-5 mx-auto overflow-hidden">
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Каталог" , url: "/catalog"}, {name: getName(parseInt(params.categoriesId))}]}/>
            <h1 className="text-4xl font-bold">Каталог</h1>
            <List_Catalog categories={params.categoriesId}></List_Catalog>
        </main>
    );
}
export default page;