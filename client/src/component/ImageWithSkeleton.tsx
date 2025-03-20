'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from 'antd';
import { StaticImageData } from 'next/image';

interface ImageWithSkeletonProps {
  src: string | StaticImageData; // Поддержка статических и строковых URL
  alt: string;
  className?: string; // Дополнительные CSS-классы
}

const ImageWithSkeleton = ({ src, alt, className }: ImageWithSkeletonProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false); // Убираем Skeleton, как только изображение загрузится
  };

  return (
    <div>
      {/* Skeleton для отображения загрузки */}
      {isImageLoading && (
        <Skeleton.Image
          active
          style={{ width: '100%', height: '100%' }} // Сквозные размеры для Skeleton
          className={className}
        />
      )}

      {/* next/image с хаком для onLoad */}
      <Image
        src={src}
        alt={alt}
        className={`${className}`}
        onLoadingComplete={handleImageLoad} // Альтернатива: отслеживание успешной загрузки
        loading="lazy"
      />
    </div>
  );
};

export default ImageWithSkeleton;
