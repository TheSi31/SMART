'use client';

import { Menu, MenuProps } from "antd";
import { useDispatch } from 'react-redux';
import Link from "next/link";

const MenuUser = () => {

    const dispatch = useDispatch();

    const onClickExit = () => {
        dispatch({ type: 'auth/logout' });
        localStorage.removeItem('authToken');
    };

    const profile_items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href="/profile/general" className="w-[15vw] min-w-[150px] max-w-[250px] font-medium">Общие сведения</Link>
            )
        },
        {
            key: '2',
            label: (
                <Link href="/profile/personal" className="font-medium">Личные данные</Link>
            )
        },
        {
            key: '3',
            label: (
                <Link href="/profile/orders" className="font-medium">История покупок</Link>
            )
        },
        {
            key: '4',
            label: (
                <Link href="/favorites" className="font-medium">Избранные</Link>
            )
        },
        {
            key: '5',
            label: (
                <Link href="/profile/password" className="font-medium">Сменить пароль</Link>
            )
        },
        {
            type: 'divider',
        },
        {
            key: '6',
            label: (
                <Link href="" onClick={onClickExit} className="font-medium">Выйти</Link>
            ),
            danger: true
        }
    ]

    return (
        <Menu
            mode="inline"
            items={profile_items} 
            className="max-md:hidden"
        /> 
    );
}

export default MenuUser;