import React, { useState } from 'react';
import Link from 'next/link';

import { Checkbox, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/slice/authSlice';
import { loadCartFromDB } from '@/store/slice/cartSlice';
import { loadViewedFromDB } from '@/store/slice/viewedSlice';
import { RootState } from '@/store/store';
import { LockOutlined } from '@ant-design/icons';

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const { error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      messageApi.error({ content: "Пожалуйста, заполните все поля." });
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ email, password })).unwrap();

      if (resultAction.token) {
        dispatch(loadCartFromDB(resultAction.token));
        dispatch(loadViewedFromDB(resultAction.token));
        onClose();
        messageApi.success({ content: "Вы успешно вошли в систему!" });
      } else {
        messageApi.error({ content: "Неправильный логин или пароль" });
      }
    } catch (error) {
      messageApi.error({ content: "Неправильный логин или пароль" });
    }
  };

  return (
    <div>
      {contextHolder}
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label>Эл.почта</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Пароль</label>
          <Input.Password
            value={password}
            prefix={<LockOutlined />}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link href="/" className="text-[#4878A6]">Забыли пароль?</Link>
        </div>
        <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
          Запомнить меня
        </Checkbox>
        <button className="bg-menu-dark-blue text-white py-2 px-4 rounded" type="submit">Войти</button>
      </form>
      {error && <p>Error: {typeof error === 'string' ? error : 'Произошла ошибка'}</p>}
    </div>
  );
};

export default LoginForm;
