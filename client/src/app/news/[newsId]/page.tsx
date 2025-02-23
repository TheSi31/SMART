import News from "@/component/News";

const page = ({params}:any) => {

    const id = parseInt(params.newsId);

    return (
        <main className="flex flex-col justify-center gap-20 w-10/12 max-xl:w-11/12 mx-auto">
            <News id={id} />
        </main>
    );
}

export default page;