// RegisterForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/slice/authSlice';

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
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="tel"
                    placeholder="Номер телефона"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className="btn-primary">Зарегистрироваться</button>
            </form>

            {registrationStatus === 'loading' && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
            {registrationStatus === 'succeeded' && <p>Регистрация прошла успешно!</p>}
        </div>
    );
};

export default RegisterForm;
