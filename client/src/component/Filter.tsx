"use client";

import React, { useState, useEffect } from "react";
import { Collapse, Checkbox, Skeleton, Slider, Input, Drawer, Button } from "antd";

const { Panel } = Collapse;

type Characteristic = {
  characteristic_name: string;
  characteristic_value: string;
  product_count: number;
};

type FilterProps = {
  categories_id: number | string | undefined;
  maxPrice: number;
  filters: Record<string, string[] | [number, number]>;
  onFiltersChange: (filters: Record<string, string[] | [number, number]>) => void;
};

const Filter: React.FC<FilterProps> = ({ categories_id, maxPrice, filters, onFiltersChange }) => {
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/categories/${categories_id}/more`);
      if (!response.ok) {
        throw new Error("Failed to fetch characteristics.");
      }
      const data = await response.json();
      setCharacteristics(data);
    } catch (err) {
      console.error("Error fetching characteristics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categories_id]);

  useEffect(() => {
    if (filters.price) {
      setPriceRange(filters.price as [number, number]);
    }
  }, [filters]);

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

  const handleCheckboxChange = (characteristicName: string, value: string, checked: boolean) => {
    const currentValues = filters[characteristicName] || [];
    const updatedFilters = { ...filters };

    if (checked) {
      updatedFilters[characteristicName] = [...(currentValues as string[]), value];
    } else {
      updatedFilters[characteristicName] = (currentValues as string[]).filter((v) => v !== value);
      if (updatedFilters[characteristicName].length === 0) {
        delete updatedFilters[characteristicName];
      }
    }

    onFiltersChange(updatedFilters);
  };

  const handlePriceChange = (value: [number, number]) => {
    const updatedFilters = { ...filters, price: value };
    setPriceRange(value);
    onFiltersChange(updatedFilters);
  };

  const groupedCharacteristics = characteristics.reduce((acc, item) => {
    if (!acc[item.characteristic_name]) {
      acc[item.characteristic_name] = [];
    }
    acc[item.characteristic_name].push(item);
    return acc;
  }, {} as Record<string, Characteristic[]>);

  const filterContent = (
    <>
      <Panel header="Цена" key="price">
        <div className="flex items-center gap-3">
          <p>от</p>
          <Input
            type="number"
            min={0}
            value={priceRange[0]}
            onChange={(e) => {
              const min = parseInt(e.target.value);
              if (!isNaN(min) && min <= priceRange[1]) {
                handlePriceChange([min, priceRange[1]]);
              }
            }}
          />
          <p>до</p>
          <Input
            type="number"
            min={0}
            value={priceRange[1]}
            onChange={(e) => {
              const max = parseInt(e.target.value);
              if (!isNaN(max) && max >= priceRange[0]) {
                handlePriceChange([priceRange[0], max]);
              }
            }}
          />
        </div>
        <Slider range min={0} max={maxPrice} value={priceRange} onChange={handlePriceChange} />
      </Panel>
      {Object.entries(groupedCharacteristics).map(([characteristicName, values]) => (
        <Panel header={characteristicName} key={characteristicName}>
          <div className="flex flex-col">
            {values.map((value) => (
              <Checkbox
                key={value.characteristic_value}
                checked={filters[characteristicName]?.includes(value.characteristic_value) || false}
                onChange={(e) =>
                  handleCheckboxChange(characteristicName, value.characteristic_value, e.target.checked)
                }
              >
                {value.characteristic_value} ({value.product_count})
              </Checkbox>
            ))}
          </div>
        </Panel>
      ))}
    </>
  );

  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : isMobile ? (
        <>
          <Button type="primary" onClick={() => setDrawerVisible(true)}>
            Показать фильтры
          </Button>
          <Drawer
            title="Фильтры"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            <Collapse>{filterContent}</Collapse>
          </Drawer>
        </>
      ) : (
        <Collapse>{filterContent}</Collapse>
      )}
    </div>
  );
};

export default Filter;
