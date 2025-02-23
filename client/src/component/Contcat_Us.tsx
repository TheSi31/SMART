'use client';

import { Form, Input, Button, Checkbox } from "antd";
import type { FormProps } from 'antd';
import TextArea from "antd/es/input/TextArea";

type FieldType = {
    username?: string;
    message?: string;
    phone_number?: string;
    remember?: boolean;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Contact_Us = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Связаться с нами</h2>
            <Form
                className="grid grid-cols-[25%_75%] grid-rows-2 gap-x-5 gap-y-4 max-sm:grid-cols-1"
                name="basic"
                size="large"
                style={{ maxWidth: 925 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {/* Имя */}
                <div>
                    <label htmlFor="username" className="block font-medium mb-1">Имя</label>
                    <Form.Item<FieldType>
                        name="username"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
                        className="m-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </div>

                {/* Телефон */}
                <div className="row-start-2">
                    <label htmlFor="phone_number" className="block font-medium mb-1">Телефон</label>
                    <Form.Item<FieldType>
                        name="phone_number"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш номер телефона!' }]}
                        className="m-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </div>

                {/* Сообщение */}
                <div className="row-span-2">
                    <label htmlFor="message" className="block font-medium mb-1">Сообщение</label>
                    <Form.Item<FieldType>
                        name="message"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваше сообщение!' }]}
                        className="m-0"
                    >
                        <TextArea rows={4} size="large" className="p-[10px_10px]" />
                    </Form.Item>
                </div>


                {/* Кнопка отправки */}
                <Form.Item className="m-0">
                    <Button type="primary" htmlType="submit" className="w-full">
                        Отправить
                    </Button>
                </Form.Item>

                {/* Политика конфиденциальности */}
                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    initialValue={true}
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('Пожалуйста, согласитесь с политикой конфиденциальности!'),
                        },
                    ]}

                >
                    <Checkbox>
                        Отправляя данную форму вы соглашаетесь с политикой конфиденциальности
                    </Checkbox>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Contact_Us;
