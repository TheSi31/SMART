import Cart from "@/component/Cart";

const page = () => {
    return (
        <main className="flex flex-col justify-center gap-10 py-10 w-10/12 max-xl:w-11/12 mx-auto">
            <h1 className="text-2xl font-bold">Оформления заказа</h1>
            <Cart />
        </main>
    );
};

export default page;