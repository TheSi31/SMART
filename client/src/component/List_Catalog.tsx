'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Button, Select } from 'antd';
import Card from './Card';
import Filter from './Filter';

interface Product {
  id: number;
  categories: string;
  name: string;
  price: number;
  old_price: number;
  is_new: boolean;
  is_best_seller: boolean;
  image_url: string;
  description: string;
  characteristics?: { name: string; value: string }[];
}

interface Filters {
  [key: string]: string[] | [number, number];
}

const List_Catalog = ({ categories, className }: { categories: string | number | undefined; className?: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (categories) fetchProducts();
  }, [categories]);

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        if (filters.price) {
          const [minPrice, maxPrice] = filters.price as [number, number];
          if (product.price < minPrice || product.price > maxPrice) {
            return false;
          }
        }
        return Object.entries(filters).every(([key, values]) => {
          if (key === 'price') return true;
          const productCharacteristics = product.characteristics || [];
          return values.some((value) =>
            productCharacteristics.some(
              (characteristic: any) => characteristic.name === key && characteristic.value === value
            )
          );
        });
      });
      setFilteredProducts(filtered);
    }
  }, [filters, products]);

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      handleResize();
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/categories/${categories}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
    }
  };

  const handleRemoveFilter = (key: string, value: string | [number, number]) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      if (Array.isArray(value)) {
        delete updatedFilters[key];
      } else {
        const updatedValues = (updatedFilters[key] as string[]).filter((v) => v !== value);
        if (updatedValues.length > 0) {
          updatedFilters[key] = updatedValues;
        } else {
          delete updatedFilters[key];
        }
      }
      return updatedFilters;
    });
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleSort = (value: string) => {
    const sortedProducts = [...filteredProducts];
    switch (value) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        sortedProducts.sort((a, b) => Number(b.is_new) - Number(a.is_new));
        break;
      case 'best_seller':
        sortedProducts.sort((a, b) => Number(b.is_best_seller) - Number(a.is_best_seller));
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  const maxPrice = products.reduce((max, product) => Math.max(max, product.price), 0);

  return (
    <div className={`grid grid-cols-[25%_75%] max-md:grid-cols-1 gap-4 ${className || ''}`}>
        {!isMobile && (
          <div className="flex flex-col gap-5">
            <Filter
              categories_id={categories}
              filters={filters}
              maxPrice={maxPrice}
              onFiltersChange={(newFilters) => setFilters(newFilters)}
            />
          </div>
        )}

      <div>
        <div className="flex justify-between">
          {Object.keys(filters).length > 0 && !isMobile && (
            <div className="flex justify-between mb-4">
              <div>
                {Object.entries(filters).map(([key, values]) => {
                  if (key === 'price') {
                    const [min, max] = values as [number, number];
                    return (
                      <Tag key={key} closable onClose={() => handleRemoveFilter(key, [min, max])}>
                        Цена: от {min} ₽ до {max} ₽
                      </Tag>
                    );
                  }
                  return (values as string[]).map((value) => (
                    <Tag key={`${key}-${value}`} closable onClose={() => handleRemoveFilter(key, value)}>
                      {key}: {value}
                    </Tag>
                  ));
                })}
                <Button onClick={handleClearFilters} type="link" danger className="ml-2">
                  Очистить фильтры
                </Button>
              </div>
            </div>
          )}

          {/* Секция сортировки */}
          <div className="flex justify-end mb-4 mr-4">
            {isMobile && (
              <Filter
                categories_id={categories}
                filters={filters}
                maxPrice={maxPrice}
                onFiltersChange={(newFilters) => setFilters(newFilters)}
              />
            )}
            <Select
              placeholder="Выберите сортировку"
              onChange={handleSort}
              className="w-56"
            >
              <Select.Option value="price_asc">По возрастанию цены</Select.Option>
              <Select.Option value="price_desc">По убыванию цены</Select.Option>
              <Select.Option value="new">Новинки</Select.Option>
              <Select.Option value="best_seller">Популярные</Select.Option>
            </Select>
          </div>
        </div>



        <div className="flex flex-wrap max-md:justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card {...product} links={`/catalog/product/${product.id}`} />
            ))
          ) : (
            <p className="text-gray-500">Продукты не найдены</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default List_Catalog;