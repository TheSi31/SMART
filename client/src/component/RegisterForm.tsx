
import React, { useState } from 'react';
import Link from 'next/link'; 

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slice/authSlice';

import { LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    
    const registrationStatus = useSelector((state : any) => state.auth.status);
    const error = useSelector((state : any) => state.auth.error);

    const handleRegister = (e : any) => {
        e.preventDefault();
        dispatch(registerUser({ username, email, phoneNumber, password }));
    };

    return (
        <div>
            <form onSubmit={handleRegister} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label>Имя</label>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Эл. почта</label>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Номер телефона</label>
                    <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Придумайте пароль</label>
                    <Input.Password
                        value={password}
                        prefix={<LockOutlined />}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <label>Регистрируясь, вы соглашаетесь с<Link href="#"> пользовательским соглашением</Link></label>
                <button className='bg-menu-dark-blue text-white py-2 px-4 rounded' type="submit">Зарегистрироваться</button>
            </form>

            {registrationStatus === 'loading' && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
            {registrationStatus === 'succeeded' && <p>Регистрация прошла успешно!</p>}
        </div>
    );
};

export default RegisterForm;
