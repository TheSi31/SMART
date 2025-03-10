import Image from "next/image";

import image from "../img/test.png";
import { Button, ConfigProvider, Rate, message } from "antd";

import comment from "../img/commet.svg";
import compare from "../img/menu/compare.svg";
import cart from "../img/menu/cart.svg";

import { useDispatch } from 'react-redux';
import { addViewedProductId } from '../store/slice/viewedSlice';
import { addItem } from '../store/slice/cartSlice';
import LikeButton from "./LikeButton";

interface CardProps {
    id: number;
    categories: string;
    name: string;
    price: number;
    old_price: number;
    is_new: boolean;
    is_best_seller: boolean;
    image_url: string;
    description: string;
}

const Card = ({ id, categories, name, price, old_price, is_new, is_best_seller, image_url, description, links }: CardProps & { links: string }) => {

    const [messageApi, contextHolder] = message.useMessage();

    const dispatch = useDispatch();

    const success = (message: string = 'Товар добавлен в корзину') => {
        messageApi.open({
          type: 'success',
          content: message,
        });
    };

    const handleAddToCart = (event:React.MouseEvent) => {
        event.stopPropagation();
        dispatch(addItem({ id: id, name: name, price: price }));
        success();
    };

    const handleCardClick = () => {
        dispatch(addViewedProductId(id));
        window.location.href = links;
    };

    return (
        <div className="w-80 max-sm:max-w-72 p-5 relative border border-gray-300 cursor-pointer" onClick={handleCardClick}>
            {contextHolder}
            {/* Метки Новинка и Хит продаж */}
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                {is_new && (
                    <div className="flex items-center justify-center bg-[#48A69B] w-24 h-8 rounded">
                        <p className="text-white text-sm font-medium">Новинка</p>
                    </div>
                )}
                {is_best_seller && (
                    <div className="flex items-center justify-center bg-[#D73838] w-32 h-8 rounded">
                        <p className="text-white text-sm font-medium">Хит продаж</p>
                    </div>
                )}
            </div>
            {/* Контент карточки */}
            <div className="flex flex-col h-full gap-4">
                {/* Изображение */}
                <Image src={image} alt="image" className="w-full h-auto rounded-md" loading="lazy" />
                {/* Категория и название */}
                <div className="flex flex-col gap-2">
                    <p className="text-[#838688] text-sm">{categories}</p>
                    <h2 className="text-xl font-semibold min-h-[84px] max-h-[84px] overflow-hidden text-ellipsis break-words">{name}</h2>
                </div>
                {/* Рейтинг и комментарии */}
                <div className="flex items-center gap-3">
                    <Rate disabled allowHalf defaultValue={4.5} />
                    <div className="flex items-center gap-1">
                        <Image src={comment} alt="comment" width={16} height={16} />
                        <p className="text-sm text-gray-600">(17)</p>
                    </div>
                </div>
                {/* Цена и кнопки */}
                <div className="grid grid-cols-[48px_48px_48px_48px_48px] max-sm:grid-cols-[48px_48px] grid-rows-[48px_48px] gap-[10px]">
                    {/* Цена */}
                    <div className="col-span-2">
                        <div className="flex flex-col justify-center relative">
                            {old_price && <h3 className="text-[#838688] font-medium line-through">{old_price} ₽</h3>}   
                            <h3 className="text-2xl font-medium">{price} ₽</h3>
                        </div>
                    </div>
                    <LikeButton productId={id} />
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
                                    },
                                },
                                token: {
                                    colorPrimary: '#4878A6',
                                },
                            }}
                        >
                            <Button variant="outlined" color="primary" className="w-full h-full z-10">
                                Купить в 1 клик
                            </Button>
                        </ConfigProvider>
                    </div>
                    <div className="border border-[#4878A6] bg-[#4878A6] rounded-md z-10" onClick={handleAddToCart}>
                        <Image src={cart} alt="cart" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;

