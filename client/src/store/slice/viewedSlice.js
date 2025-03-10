import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  productIds: [],
};

// Асинхронное действие для загрузки просмотренных товаров из БД
export const loadViewedFromDB = createAsyncThunk('viewed/loadViewed', async (token) => {
  const response = await fetch(`http://localhost:3001/viewed/${token}`);
  if (!response.ok) {
    throw new Error('Ошибка загрузки просмотренных товаров');
  }
  const data = await response.json();
  console.log('Загруженные данные из сервера:', data);
  return data; // Ожидаем, что сервер возвращает массив productIds
});

// Асинхронное действие для сохранения просмотренных товаров в БД
export const saveViewedToDB = createAsyncThunk('viewed/saveViewed', async ({ productIds, token }) => {
  const response = await fetch(`http://localhost:3001/viewed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productIds, token }),
  });

  if (!response.ok) {
    throw new Error('Ошибка сохранения просмотренных товаров');
  }

  return await response.json();
});

// Slice для управления состоянием "viewed"
const viewedSlice = createSlice({
  name: 'viewed',
  initialState,
  reducers: {
    addViewedProductId: (state, action) => {
      const productId = action.payload;

      // Если productId уже есть, не добавляем его снова
      if (state.productIds.includes(productId)) {
        return;
      }

      // Добавляем productId и ограничиваем список до 10 элементов
      state.productIds.push(productId);
      if (state.productIds.length > 10) {
        state.productIds.shift(); // Удаляем самый старый ID
      }
    },
    clearViewedProducts: (state) => {
      state.productIds = []; // Очищаем список
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadViewedFromDB.fulfilled, (state, action) => {
      state.productIds = action.payload || []; // Обновляем список из БД
    });
  },
});

export const { addViewedProductId, clearViewedProducts } = viewedSlice.actions;
export default viewedSlice.reducer;
