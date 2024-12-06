import Image from "next/image";
import Link from "next/link";

import logo from "../img/menu/logo.svg"

import facebook from "../img/footer/facebook.svg"
import instagram from "../img/footer/instagram.svg"
import twitter from "../img/footer/twitter.svg"
import vk from "../img/footer/vk.svg"

const Footer = () => {
    return (
        <footer className="bg-[#EDF2F6] mt-20 max-lg:mt-16 max-md:mt-14 max-sm:mt-12">
            <div className="w-4/5 flex flex-col mx-auto">
                <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10 border-b border-[#C8CACB] py-10">
                    <div className="flex flex-col gap-5">
                        <Image src={logo} alt=""></Image>
                        <div>
                            <h1 className="font-bold">+7 (958) 111-95-03</h1>
                            <h1 className="font-bold">+7 (812) 660-50-54</h1>
                            <p className="text-[#838688]">Пн-вс: с 10:00 до 21:00</p>
                        </div>
                        <div>
                            <p>Проспект Стачек 67 к.5<br/>
                            Лиговский проспект 205<br/>
                            Гражданский проспект, 116 к.5</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-xl font-bold text-[#838688]">Для клиента</h1>
                        <div className="flex flex-col">
                            <Link href="#">Как купить</Link>
                            <Link href="#">Доставка и оплата</Link>
                            <Link href="#">Кредит</Link>
                            <Link href="#">Политика конфиденциальности</Link>
                            <Link href="#">Вопросы и ответы (F.A.Q.)</Link>
                            <Link href="#">Сервис и гарантия</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-xl font-bold text-[#838688]">О магазине</h1>
                        <div className="flex flex-col">
                            <Link href="#">Отзывы</Link>
                            <Link href="#">Наши преимущетсва</Link>
                            <Link href="#">История компании</Link>
                            <Link href="#">Сотрудничество</Link>
                            <Link href="#">Партнёрская программа</Link>
                            <Link href="#">Вакансии</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-xl font-bold text-[#838688]">Сотрудничество</h1>
                        <div className="flex flex-col">
                            <Link href="#">Оптом</Link>
                            <Link href="#">Дропшиппинг</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap max-sm:flex-wrap-reverse max-sm:gap-5 items-center justify-between my-5 max-md:mb-20">
                    <div>
                        <p>SmartТехника © 2021 Все права защищены</p>
                        <p className="md:hidden">Разработка: TheSi31</p>
                    </div>
                    <div className="flex flex-row">
                        <Link href="#">
                            <Image src={facebook} alt="" className="mr-3"></Image>
                        </Link>
                        <Link href="#">
                            <Image src={instagram} alt="" className="mr-3"></Image>
                        </Link>
                        <Link href="#">
                            <Image src={twitter} alt="" className="mr-3"></Image>
                        </Link>
                        <Link href="#">
                            <Image src={vk} alt=""></Image>
                        </Link>
                    </div>
                    <p className="max-md:hidden">Разработка: TheSi31</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;