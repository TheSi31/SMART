'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pagination } from 'antd';

import test from "../img/test.png";

interface News {
  id: number;
  title: string;
  date: string;
  preview_img: string;
  summary: string;
}

const List_News = () => {
  const [news, setNews] = useState<News[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Количество новостей на одной странице (две строки по две новости)

  // Fetch новостей
  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:3001/news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Рассчитываем данные для текущей страницы
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = news.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Сетка из двух колонок */}
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {currentData.map((newsItem) => (
          <Link href={`/news/${newsItem.id}`} key={newsItem.id}>
            <div className="flex max-sm:flex-col bg-[#EDF2F6] p-4 gap-4">
              <Image
                src={test}
                alt={newsItem.title}
                className="w-1/3 h-auto rounded"
              />
              <div className='grid grid-rows-[1fr_2fr_1fr] justify-items-stretch w-full'>
                <h3 className="text-lg font-semibold mt-2">{newsItem.title}</h3>
                <p className="line-clamp-3 text-gray-700">{newsItem.summary}</p>
                <div className="flex justify-between items-end mt-2">
                  <a href={`/news/${newsItem.id}`} className="text-blue-500 hover:underline">
                    Подробнее &gt;
                  </a>
                  <p className="text-gray-600 text-sm">
                    {new Date(newsItem.date).toLocaleDateString('ru', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Пагинация */}
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={news.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false} // Убираем выбор количества элементов на странице
        />
      </div>
    </div>
  );
};

export default List_News;
