import Breacd from "@/component/Breacd";
import List_News from "@/component/List_News";

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