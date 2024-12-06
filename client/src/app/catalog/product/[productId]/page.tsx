
import Product_More from "@/component/Product_More";
import List_Products from "@/component/List_Products";


const page = ({params}:any) => {
    
    const id = parseInt(params.productId);

    return (
        <main className="flex flex-col justify-center gap-20 w-4/5 max-xl:w-full max-xl:px-5 mx-auto overflow-hidden">
            <Product_More id={id} />
            <div className="flex flex-col gap-10">
                <h2 className="text-2xl font-bold">Рекомендуем</h2>
                <List_Products category={1}></List_Products>
            </div>
        </main>
    );
}

export default page;