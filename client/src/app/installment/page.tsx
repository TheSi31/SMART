import Breacd from "@/component/Breacd";
import Image from "next/image";

import installment from "../../img/installment.png";
import installment_2 from "../../img/installment_2.png";
import Installment_Form from "@/component/Installment_Form";


const page = () => {
    return (
        <main className="flex flex-col justify-center gap-10 w-10/12 max-xl:w-11/12 mx-auto">
            <Breacd items={[{name: "Главная", url: "/"}, {name: "Рассрочка 0|0|18"}]}/>
            <div className="flex flex-col gap-5 w-4/5 max-lg:w-full">
                <h1 className="text-2xl font-bold">Рассрочка 0|0|18</h1>
                <Image src={installment} alt="Рассрочка"></Image>
                <h2>Как работает рассрочка</h2>
                <p>ТЕПЕРЬ КАРТУ ХАЛВА МОЖНО ОФОРМИТЬ В СЕТИ НАШИХ МАГАЗИНОВ СОВЕРШЕННО БЕСПЛАТНО. Это займёт не более 10 минут. С собой необходимо иметь лишь паспорт.</p>
                <p>С картой «Халва» сотрудничают более 200 000 партнёров от продуктовых магазинов до компаний продающих крупную бытовую технику и даже мебель, у которых покупки можно делать в бесплатную рассрочку. Сумма каждой такой покупки делится на равные части (по количеству месяцев рассрочки у партнёра). Раз в месяц «части» по всем покупкам суммируются и выставляются единым Платежом по рассрочке (дата выставления платежа равна дате оформления карты). </p>
                <mark className="w-fit">Проценты по вашей рассрочке за покупку в нашем магазине платит за вас НАШ МАГАЗИН</mark>
                <Image src={installment_2} alt="Рассрочка"></Image>
                <p>Подключите подписку "Халва Десятка" и делайте любые покупки у партнеров с единым увеличенным сроком рассрочки 10 месяцев.
                Можно расширить срок до 18-ти месяцев.</p>
            </div>
            <div className="grid grid-cols-2 w-4/5 max-lg:w-full max-md:grid-cols-1">
                <div className="flex flex-col px-8 py-2">
                    <Installment_Form/>
                </div>
                <div className="flex flex-col p-8">
                    <h2 className="text-2xl font-semibold">Мобильное приложение<br/> «Совкомбанк – Халва»</h2><br/>
                    <p>Мобильный банковский офис, который всегда с вами:</p>
                    <ul className="list-disc list-inside">
                        <li>контроль вашей карты «Халва»</li>
                        <li>наиболее востребованные банковские функции</li>
                        <li>круглосуточный чат с поддержкой</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}

export default page;