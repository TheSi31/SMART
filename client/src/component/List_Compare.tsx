'use client';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCompare, clearCompare } from '@/store/slice/compareSlice';
import { addItem } from '../store/slice/cartSlice';
import { useEffect, useState } from 'react';

import image from "../img/test.png";
import Image from 'next/image';
import { Button,ConfigProvider } from 'antd';

import cart from "../img/menu/cart.svg";

const List_Compare = () => {
  const productIds = useSelector((state: any) => state.compare.productIds);
  const dispatch = useDispatch();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (productIds.length === 0) {
    return <p className="text-center text-lg">Список сравнения пуст.</p>;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const responses = await Promise.all(
          productIds.map(async (id: number) => {
            const response = await fetch(`http://localhost:3001/products/compare/${id}`);
            if (!response.ok) {
              throw new Error(`Ошибка загрузки данных для товара с ID ${id}`);
            }
            return await response.json();
          })
        );

        setProducts(responses);
      } catch (err: any) {
        setError(err.message || 'Ошибка загрузки данных.');
      } finally {
        setLoading(false);
      }
    };

    if (productIds.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [productIds]);


  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return <p>Список сравнения пуст.</p>;
  }

  const allCharacteristics = Array.from(
    new Set(
      products.flatMap((product) => product.characteristics.map((char: any) => char.name))
    )
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold">Сравнение товаров</h2>
      <div>
        <table className="w-full">
          <thead>
            <tr className="">
              <th></th>
              {products.map((product) => (
                <th key={product.id} className='border border-gray-300 p-4 text-center w-80'>
                    <div className="flex flex-col gap-4">
                        <Button type='link' danger onClick={() => dispatch(removeFromCompare(product.id))}>Удалить</Button>
                        <Image
                            src={image}
                            alt={product.name}
                        />
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-[#838688] text-sm">{product.categories}</p>
                            <h2 className="text-xl font-semibold min-h-[84px] max-h-[84px] overflow-hidden text-ellipsis break-words">{product.name}</h2>
                        </div>
                        <div className="flex flex-col w-full items-start">
                            {product.old_price && <h3 className="text-[#838688] font-medium line-through">{product.old_price} ₽</h3>}   
                            <h3 className="text-2xl font-medium">{product.price} ₽</h3>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-3">
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                contentFontSize: 16,
                                                fontWeight: 700,
                                            },
                                        },
                                        token: {
                                            colorPrimary: '#4878A6',
                                        },
                                    }}
                                >
                                    <Button variant="outlined" color="primary" className="w-full h-full z-10">
                                        Купить в 1 клик
                                    </Button>
                                </ConfigProvider>
                            </div>
                            <div className="border border-[#4878A6] bg-[#4878A6] rounded-md z-10 w-12 h-12">
                                <Image src={cart} alt="cart" />
                            </div>
                        </div>
                    </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allCharacteristics.map((charName) => (
              <tr key={charName}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{charName}</td>
                {products.map((product) => {
                  const char = product.characteristics.find((c: any) => c.name === charName);
                  return (
                    <td key={product.id} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                      {char ? char.value : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => dispatch(clearCompare())}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Очистить сравнение
        </button>
      </div>
    </div>
  );
};

export default List_Compare;
