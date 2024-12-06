import Product_More from "../../component/Product_More";

const page = () => {
    return (
        <main className="flex flex-col justify-center gap-20 w-4/5 max-xl:w-11/12 mx-auto">
            <h1>Каталог</h1>
            <Product_More id={1} />
        </main>
    );
}

export default page;