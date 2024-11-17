import Image from "next/image";

import image from "../../img/test.png";
import { Button, ConfigProvider, Rate } from "antd";

import comment from "../../img/commet.svg";
import like from "../../img/menu/like.svg";
import compare from "../../img/menu/compare.svg";
import cart from "../../img/menu/cart.svg";

interface CardProps {
    id: number,
    catalog: string,
    name: string,
    price: number,
    old_price: number,
    is_new: boolean,
    is_best_seller: boolean
    image_url: string,
    description: string
 }

const Card = ( { id, catalog, name, price, old_price, is_new, is_best_seller, image_url, description }: CardProps) => {
    return (
        <div className="w-80 p-5 border border-gray-200 rounded-lg relative">
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                {is_new && <div className="flex flex-col items-center justify-center bg-[#48A69B] w-24 h-8 rounded">
                    <p className="text-white text-center">Новинка</p>
                </div>}
                {is_best_seller && <div className="flex flex-col items-center justify-center bg-[#D73838] w-32 h-8 rounded">
                    <p className="text-white text-center">Хит продаж</p>
                </div>}
            </div>
            <div className="flex flex-col gap-2">
                <Image src={image} alt="image" className="w-full h-auto" />
                <div className="flex flex-col gap-5">
                    <div>
                        <p className="text-[#838688]">{catalog}</p>
                        <h2 className="text-xl font-medium">{name}</h2>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <Rate allowHalf defaultValue={4.5} />
                        <div className="flex flex-row items-center gap-2">
                            <Image src={comment} alt="comment" />
                            <p>(4)</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[48px_48px_48px_48px_48px] grid-rows-[48px_48px] gap-[10px]">
                        <div className="col-span-2">
                            <div className="flex w-fit flex-col justify-center relative">
                                <h3 className="text-[#838688] font-medium">{old_price} ₽</h3>
                                <span className="block absolute w-full h-[2px] bg-[#838688]"></span>
                            </div>
                            <h1 className="text-2xl font-medium">{price} ₽</h1>
                        </div>
                        <div className="col-start-4 border border-gray-200 rounded-md">
                            <Image src={like} alt="like" />
                        </div>
                        <div className="col-start-5 border border-gray-200 rounded-md">
                            <Image src={compare} alt="compare" />
                        </div>
                        <div className="col-span-4">
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            contentFontSize: 16,
                                            fontWeight: 700,
                                        }
                                    },
                                    token: {
                                        colorPrimary: '#4878A6',
                                    },
                                }}
                            >
                                <Button
                                variant="outlined"
                                color="primary"
                                className="w-full h-full"  
                                >Купить в 1 клик</Button>
                            </ConfigProvider>
                        </div>
                        <div className="border border-[#4878A6] bg-[#4878A6] rounded-md">
                            <Image src={cart} alt="cart" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;