'use client';

import { ConfigProvider, Input } from 'antd';
import Image from 'next/image';
import search from "../../img/menu/search-icon.svg";

const SearchInput = () => {
  const handleEnterPress = () => {
    console.log('Enter нажата! Выполняем нужное действие.');
    // Здесь можно добавить нужное действие, например, отправку запроса или навигацию
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            borderRadius: 0,
            colorBgContainer: 'transparent',
            colorBorder: 'transparent',
            hoverBorderColor: 'transparent',
            activeBorderColor: 'transparent',
            activeShadow: 'none',
            paddingBlock: 8
          }
        }
      }}
    >
      <Input
        placeholder="Поиск"
        style={{ width: 100, borderBottom: '1px solid #C8CACB' }}
        prefix={<Image src={search} alt="" className="h-6 w-6" />}
        onPressEnter={handleEnterPress}
      />
    </ConfigProvider>
  );
};

export default SearchInput;
