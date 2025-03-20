import compare from "../img/menu/compare.svg";

import { addToCompare } from "@/store/slice/compareSlice";
import { useDispatch } from 'react-redux';

import Image from "next/image";

import { message } from 'antd';

interface CompareButtonProps {
    className?: string;
    productId: number; // ID продукта
    onClick?: () => void;
  }

const CompareButton = ({ className = "", productId, onClick }: CompareButtonProps) => {

    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();

    const handleAddToComparison = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(addToCompare(productId));
        messageApi.open({ type: 'success', content: "Продукт добавлен для сравнения" });
    };


    return (
        <a onClick={handleAddToComparison} className="col-start-5 border border-gray-300 rounded-md">
            <Image src={compare} alt="compare" />
        </a>
    );
}

export default CompareButton;