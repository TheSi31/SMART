import React, { useState } from 'react';
import Link from 'next/link';
import { Checkbox, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/slice/authSlice';
import { loadCartFromDB } from '@/store/slice/cartSlice';
import { loadViewedFromDB } from '@/store/slice/viewedSlice';
import { RootState } from '@/store/store';
import { LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Выполняем вход пользователя
    const resultAction = await dispatch(loginUser({ email, password })).unwrap();

    if (resultAction.token) {
      // Загружаем корзину после успешного входа
      dispatch(loadCartFromDB(resultAction.token));

      // Загружаем просмотренные товары после успешного входа
      dispatch(loadViewedFromDB(resultAction.token));
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <label>Эл.почта</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label>Пароль</label>
          <Input.Password
            value={password}
            prefix={<LockOutlined />}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link href="/" className='text-[#4878A6]'>Забыли пароль?</Link>
        </div>
        <Checkbox>Запомнить меня</Checkbox>
        <button className='bg-menu-dark-blue text-white py-2 px-4 rounded' type="submit">Войти</button>
      </form>
      {isAuthenticated && 
        <div>
          <p>Вы успешно вошли в систему!</p>
        </div>
      }
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default LoginForm;
