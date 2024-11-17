'use client';

import React, { useState } from 'react';

import { Button, ConfigProvider, Drawer, Input } from 'antd';
import Image from 'next/image';
import search from "../../img/menu/search-icon.svg";
import { CloseOutlined } from '@ant-design/icons';

import './SearchButton.css';

const SearchButton = () => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              borderRadius: 0,
              colorBgContainer: 'transparent',
              colorBorder: 'transparent',
              paddingBlock: 8
            }
          },
          token: {
            colorBgContainerDisabled: 'transparent',
            colorBgMask : 'rgba(42, 82, 117, 0.33)',
          }
        }}
      >
        <Button
          type='text'
          style={{ width: 100,height: 40 , borderBottom: '1px solid #C8CACB', display: 'flex', justifyContent: 'space-between', padding: 12, color: '#838688' }}
          icon={<Image src={search} alt="search" />} iconPosition='start'
          onClick={showDrawer}
        >Поиск</Button>
      

        <Drawer
          className='custom-drawer-search'
          title={null}
          closable={false}
          placement="top"
          height={64}
          onClose={onClose}
          open={open}
          
        >
          <div className='flex justify-center w-full h-full'>
            <div className='flex items-center w-4/5'>
              <Input placeholder="Введите запрос, например «Smart balance"  />
              <Button type="text" icon={<CloseOutlined style={{ color: 'red' }} />} onClick={onClose} />
            </div>
          </div>
        </Drawer>
      </ConfigProvider>
    </div>
  );
};

export default SearchButton;
