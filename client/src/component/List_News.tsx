'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import test from "../img/test.png"

interface News {
    id: number;
    title: string;
    date: string;
    preview_img: string;
    summary: string;
}

const List_News = () => {

    const [news, setNews] = useState<News[]>([]);

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

    return (
        <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
            {news.map((news) => (
                <Link href={`/news/${news.id}`} key={news.id}>
                    <div className='flex max-sm:flex-col bg-[#EDF2F6] p-4 gap-4'>
                        <Image src={test} alt={news.title} className='w-1/3 max-sm:w-full' />
                        <div className='grid grid-rows-[1fr_2fr_1fr] justify-items-stretch w-full'>
                            <h3 className='text-lg font-semibold mt-2'>{news.title}</h3>
                            <p className='line-clamp-3'>{news.summary}</p>
                            <div className="flex justify-between items-end">
                                <a href={`/news/${news.id}`} className="text-blue-500 hover:underline">
                                    Подробнее &gt;
                                </a>
                                <p className="text-gray-600">
                                {new Date(news.date).toLocaleDateString('ru', {
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
    );
}   

export default List_News;