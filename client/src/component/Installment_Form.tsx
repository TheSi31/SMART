'use client';

import { Button, Form, Input } from "antd";

const Installment_Form = () => {
    return (
        <div className="flex flex-col w-[370px] max-md:w-full">
            <Form className="flex flex-col">
                <Form.Item>
                    <h2 className="text-2xl font-semibold">Оформить РАССРОКУ</h2>
                </Form.Item>
                <Form.Item>
                    <div className="w-[310px] max-md:w-full flex flex-col gap-2">
                        <label className="font-normal">Ваше имя</label>
                        <Input size="large" type="text" />
                    </div>
                </Form.Item>
                <Form.Item>
                    <div className="w-[310px] max-md:w-full flex flex-col gap-2">
                        <label className="font-normal">Ваш номер телефона</label>
                        <Input size="large" type="text" />
                    </div>
                </Form.Item>
                <Button type="primary" className="w-[310px] max-md:w-full text-white font-semibold py-2 px-20 rounded">Отправить</Button>
            </Form>
        </div>
    );
}

export default Installment_Form;