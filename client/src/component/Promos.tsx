'use client';

import React, { useEffect, useState } from 'react';

type Section = {
  type: string;
  content?: string;
  url?: string;
  alt?: string;
  caption?: string;
};

type PromoItem = {
  id: number;
  title: string;
  date: string;
  content?: {
    details?: string; // Для общего описания
    description?: string; // Основной текст
    sections?: Section[]; // Массив секций (если есть)
  };
  preview_img?: string;
  summary?: string;
};

const Promos = ({ id }: { id: number }) => {
  const [promo, setPromo] = useState<PromoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/promos/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log(data);

        // Проверяем формат данных
        if (data && data.id) {
          setPromo(data); // Устанавливаем промо-данные
        } else {
          setError('Промо не найдено.');
        }
      } catch (error: any) {
        setError('Произошла ошибка при загрузке данных.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromo();
  }, [id]);

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!promo) {
    return <p>Промо не найдено.</p>;
  }

  const sections = promo.content?.sections || []; // Упрощаем извлечение секций

  return (
    <div>
      <h1>{promo.title || 'Без названия'}</h1>
      <p>{promo.date ? new Date(promo.date).toLocaleDateString() : 'Дата недоступна'}</p>
      {promo.summary && <p><strong>{promo.summary}</strong></p>}

      {/* Превью изображение */}
      {promo.preview_img && (
        <div>
          <img
            src={`http://localhost:3001/uploads/${promo.preview_img}`}
            alt={promo.title || 'Превью'}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}

      {/* Описание акции */}
      {promo.content?.description && (
        <p>{promo.content.description}</p>
      )}

      {/* Дополнительные детали */}
      {promo.content?.details && (
        <p><em>{promo.content.details}</em></p>
      )}

      {/* Отображение секций */}
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            {section.type === 'text' && section.content && (
              <p>{section.content}</p>
            )}
            {section.type === 'image' && section.url && (
              <div>
                <img
                  src={section.url}
                  alt={section.alt || 'Изображение'}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                {section.caption && <p><small>{section.caption}</small></p>}
              </div>
            )}
            {section.type === 'subheading' && section.content && (
              <h2>{section.content}</h2>
            )}
          </div>
        ))
      ) : (
        <p>Нет доступных разделов.</p>
      )}
    </div>
  );
};

export default Promos;
