import Image from "next/image";

import hoverboard from "../../img/catalog/hoverboard.svg";
import segways from "../../img/catalog/segways.svg";
import samokats from "../../img/catalog/samokats.svg";
import skate from "../../img/about/skate.svg";
import bike from "../../img/catalog/bike.svg";
import more from "../../img/about/more.svg";
import Breacd from "../../component/Breacd";



const page = () => {
    return (
        <main className="flex flex-col items-center justify-center gap-10">
            <Breacd items={[{name: "Главная", url: "/"}, {name: "О нас"}]} />
            <div className="w-4/5 max-lg:w-full max-lg:px-5 flex flex-col gap-10">
                <h1 className="text-4xl font-bold">О нас</h1>
                <p className="text-base font-normal">Официальный представитель производителей эксклюзивного электротранспорта и Смарт-Техники, Созданная в 2015 году 
                    компания Смарт-Техника стала одним из первых дистрибьютеров персонального электротранспорта в России и уже более
                    трёх лет является официальным представителем таких производителей эксклюзивного электронного транспорта, как <b>Yamato</b>, 
                    <b>SmartONE</b>, <b>HALTEN</b> и <b>Kugoo</b>
                </p>
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">Постоянно растущая и развивающаяся Компания</h2>
                    <p className="text-base font-normal">На сегодняшней день Компания Смарт-Техника обладает собственным розничным 
                        магазинами в г. Санкт-Петербурге, официальными представительствами в различных районах г. СПб и Ленобласти, 
                        сетью складов в Петербурге, Москве и других крупных городах России. Мы постоянно растём и развиваемся. 
                        Доставка наших товаров осуществляется во все регионы Страны!
                    </p>
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">Самый большой выбор персонального электротранспорта</h2>
                    <p className="text-base font-normal">Самый большой выбор персонального электротранспорта представлен 
                        в выставочных залах Смарт-Техника по адресам:<br/>
                        <b>ул. Ленсовета 81;<br/></b>
                        <b>ул. Дыбенко 23к1;<br/></b> 
                        <b>пр. Энгельса 113 к 2.<br/></b>
                        Расширение ассортимента происходит стабильно раз в полгода, и вы всегда найдёте у нас самые 
                        эксклюзивные модели электронного транспорта нового поколения!
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col items-center bg-[#EDF2F6]">
                <div className="w-4/5 max-lg:w-full flex flex-col gap-8 py-10 max-lg:px-5">
                    <h2 className="text-2xl font-bold ">Всегда в наличии большой выбор:</h2>
                    <div className="grid grid-cols-[auto_auto_auto] max-lg:grid-cols-2 max-sm:grid-cols-1 grid-rows-2 max-lg:grid-rows-3 gap-y-8">
                        <div className="flex items-center gap-2">
                            <Image src={hoverboard} alt="гироскутеры" className="min-w-12 min-h-12" />
                            <p className="font-normal">гироскутеры</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={segways} alt="сигвеи" className="min-w-12 min-h-12" />
                            <p className="font-normal">сигвеев и мини сигвеев</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={samokats} alt="электроскутеры" className="min-w-12 min-h-12" />
                            <p className="font-normal">электросамокатов, стандартных и полноприводных</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={skate} alt="электроскейты" className="min-w-12 min-h-12" />
                            <p className="font-normal">электроскейтов</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={bike} alt="электровелосипеды" className="min-w-12 min-h-12" />
                            <p className="font-normal">электровелосипедов</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={more} alt="другие товары" className="min-w-12 min-h-12" />
                            <p className="font-normal">и многое другое</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/5 max-lg:w-full max-lg:px-5 flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">Опытный и высококвалифицированный персонал</h2>
                    <p className="text-base font-normal">В компании работают опытные высококвалифицированные сотрудники, 
                        всегда готовые помочь вам с выбором персонального транспортного средства, ответить на все возможные 
                        вопросы и научить кататься на выбранной вами модели
                    </p>
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">Возможность тест драйва</h2>
                    <p className="text-base font-normal">Благодаря месторасположению и инфраструктуре, прилегающей к магазинам 
                        территорий, наши посетители могут перед оформлением покупки пройти тест-драйв на любом из представленных
                        в зале транспортных средств.<br/>
                        Для тест-драйва крупной техники необходима предварительная запись. Её можно осуществить 
                        по телефону: +7 (812) 509-23-43 или <b>через консультанта в магазине.</b></p>
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">Цель и миссия компании Смарт-Техника.рф</h2>
                    <p className="text-base font-normal"><b>Цель компании Смарт Техника </b> — в 2020 году стать самым крупным магазином
                        по продаже персонального электротранспорта в Санкт-Петербурге. А также открывать свои филиалы во всех 
                        крупных городах России, что происходит уже сейчас.
                    </p>
                    <p className="text-base font-normal"><b>Миссия компании Смарт Техника</b> — познакомить россиян с экологически 
                        чистыми видами транспорта и улучшить экологию Страны! Мы надеемся не просто привить нашей нации любовь 
                        к ЭКО-транспорту, а создать в стране новую культуру передвижения.
                    </p>
                </div>
                <h1 className="text-3xl font-bold">Мы всегда рады взаимовыгодному сотрудничеству. Свои предложения отправляйте <span className="text-[#507ca4]">smartfamily.info@yandex.ru</span></h1>
            </div>
        </main>
    );
}

export default page;