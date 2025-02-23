import List_Favorites from "@/component/List_Favorites";

const page = () => {
    return (
        <main className="flex flex-col justify-center gap-20 w-10/12 max-xl:w-11/12 mx-auto">
            <List_Favorites />
        </main>
    );
}

export default page;