'use client';

import React, { useEffect, useState } from 'react';

type Section = {
  type: string;
  content?: string;
  url?: string;
  alt?: string;
  caption?: string;
};

type NewsItem = {
  id: number;
  title: string;
  date: string;
  content?: {
    sections: Section[]; // sections должны быть массивом
  };
};

const News = ({ id }: { id: number }) => {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/news/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Проверяем, что ответ содержит данные в правильном формате
        if (data && Array.isArray(data) && data.length > 0) {
          setNews(data[0]); // Используем первый элемент массива
        } else {
          setError('Новость не найдена.');
        }
      } catch (error: any) {
        setError('Произошла ошибка при загрузке данных.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!news) {
    return <p>Новость не найдена.</p>;
  }

  // Преобразуем sections в массив, если это объект
  const sections = Array.isArray(news.content?.sections)
    ? news.content.sections
    : news.content?.sections ? Object.values(news.content.sections) : [];

  return (
    <div>
      <h1>{news.title || 'Без названия'}</h1>
      <p>{news.date ? new Date(news.date).toLocaleDateString() : 'Дата недоступна'}</p>

      {/* Проверка наличия разделов */}
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <div key={index}>
            {/* Проверка на тип 'text' */}
            {section?.type === 'text' && section.content && (
              <p>{section.content}</p>
            )}

            {/* Проверка на тип 'image' */}
            {section?.type === 'image' && section.url && (
              <div>

              </div>
            )}

            {/* Проверка на тип 'subheading' */}
            {section?.type === 'subheading' && section.content && (
              <h2>{section.content}</h2>
            )}
          </div>
        ))
      ) : (
        <p>Разделы пусты.</p>
      )}
    </div>
  );
};

export default News;
