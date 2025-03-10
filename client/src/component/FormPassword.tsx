'use client'

import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const FormPassword = () => {

    const token = useSelector((state: RootState) => state.auth.token);

    const [formData,setFormData] = useState({
        password: '',
        passwordNew: '',
        passwordNewAgain: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        const response = fetch('http://localhost:3001/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                token: token,
            }),
        }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Произошла ошибка при обновлении пароля');
        }
        }).then((data) => {
        console.log(data);
        }).catch((error) => {
        console.error(error);
        });
        response.then((data) => {
        console.log(data);
        });
    };

    return (
        <div className="flex flex-col items-center">
            <Form className="flex flex-col items-center w-1/3" onFinish={handleSubmit}>
                <Form.Item className="w-full">
                    <label className="text-base font-normal">Старый пароль</label>
                    <Input.Password placeholder="Старый пароль" name="password" size="large" value={formData.password} onChange={handleChange} />
                </Form.Item>
                <Form.Item className="w-full">
                    <label className="text-base font-normal">Новый пароль</label>
                    <Input.Password placeholder="Новый пароль" name="passwordNew" size="large" value={formData.passwordNew} onChange={handleChange} />
                </Form.Item>
                <Form.Item className="w-full">
                    <label className="text-base font-normal">Повторите новый пароль</label>
                    <Input.Password placeholder="Повторите новый пароль" name="passwordNewAgain" size="large" value={formData.passwordNewAgain} onChange={handleChange} />
                </Form.Item>
                <Form.Item className="w-full">
                    <Button block type="primary" htmlType="submit" size="large">Сохранить</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormPassword;