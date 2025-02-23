'use client';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

interface LikeButtonProps {
  className?: string;
  productId: number; // ID продукта
  onClick?: () => void;
}

function LikeButton({ className = "", productId, onClick }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated);
  const token = useSelector((state: { auth: { token: number } }) => state.auth.token);


  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Проверяем наличие лайка у пользователя для данного продукта
    const checkIfLiked = async () => {
      try {
        const response = await fetch(`http://localhost:3001/favorites/check?token=${token}&product_id=${productId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
          const { liked } = await response.json();
          setIsLiked(liked);
        }
      } catch (error) {
        console.error('Ошибка проверки лайка:', error);
      }
    };
    
    checkIfLiked();
  }, [isAuthenticated, token, productId]);
    

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      messageApi.open({ type: 'error', content: "Вы не авторизованы" });
      return;
    }

    toggleFavorite();
    if (onClick) onClick();
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch('http://localhost:3001/favorites', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, product_id: productId }),
      });

      if (!response.ok) {
        throw new Error(isLiked ? 'Ошибка при удалении из избранного' : 'Ошибка при добавлении в избранное');
      }

      const result = await response.json();
      setIsLiked(!isLiked);
      messageApi.open({ type: 'success', content: result.message });
    } catch (error) {
      console.error(error);
      messageApi.open({ type: 'error', content: error.message || 'Произошла ошибка' });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`box-content col-start-4 border border-gray-300 rounded-md cursor-pointer transition-transform duration-300 ${
        isLiked ? "animate-wiggle" : ""
      } ${className}`}
    >
      {contextHolder}
      <svg
        width="48" 
        height="48" 
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.16 17C31.1 15.9373 29.6948 15.2886 28.1984 15.1712C26.7019 15.0538 25.2128 15.4755 24 16.36C22.7277 15.4137 21.144 14.9846 19.568 15.1591C17.9919 15.3336 16.5405 16.0988 15.506 17.3006C14.4715 18.5024 13.9309 20.0516 13.9928 21.6361C14.0548 23.2206 14.7148 24.7227 15.84 25.84L22.05 32.06C22.57 32.5718 23.2704 32.8587 24 32.8587C24.7296 32.8587 25.43 32.5718 25.95 32.06L32.16 25.84C33.3276 24.6653 33.983 23.0763 33.983 21.42C33.983 19.7638 33.3276 18.1748 32.16 17Z"
          fill={isLiked ? "#FF0000" : "#838688"}
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
}

export default LikeButton;
