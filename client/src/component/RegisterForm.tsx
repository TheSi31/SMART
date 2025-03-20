import React, { useState } from 'react';
import { Input, message } from 'antd';

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем, что номер телефона корректный
    if (!/^\+7\d{9}$/.test(phoneNumber)) {
      messageApi.error("Введите номер в формате +7XXXXXXXXXX");
      return;
    }

    // Простая проверка длины пароля
    if (password.length < 6) {
      messageApi.error("Пароль должен быть не менее 6 символов");
      return;
    }

    // Вывод сообщения об успехе
    messageApi.success("Регистрация успешна!");
    console.log({
      username,
      email,
      phoneNumber,
      password,
    });

    onClose(); // Закрываем модальное окно
  };

  return (
    <div>
      {contextHolder}
      <form onSubmit={handleRegister} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label>Имя</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите ваше имя"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Эл. почта</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Номер телефона</label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+7XXXXXXXXXX"
            required
          />
          <small className="text-gray-500">Введите номер в формате +7XXXXXXXXXX</small>
        </div>
        <div className="flex flex-col gap-2">
          <label>Придумайте пароль</label>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Не менее 6 символов"
            required
          />
        </div>
        <button className="bg-menu-dark-blue text-white py-2 px-4 rounded" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
