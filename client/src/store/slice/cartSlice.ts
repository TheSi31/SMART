import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: string|number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalAmount: number;
};

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};
export const loadCartFromDB = createAsyncThunk('cart/loadCart', async (token: string) => {
  const response = await fetch(`http://localhost:3001/cart/${token}`);
  if (!response.ok) {
    throw new Error('Ошибка загрузки корзины');
  }
  const data = await response.json();
  console.log('Данные от сервера:', data); // Добавьте это для проверки полученных данных
  return data[0].items;
});


export const saveCartToDB = createAsyncThunk(
  'cart/saveCart',
  async ({ items, token }: { items: CartItem[]; token: string }) => {
    const response = await fetch(`http://localhost:3001/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items, token }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при сохранении корзины');
    }

    return await response.json();
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string|number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCartFromDB.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      } else {
        state.items = [];
        state.totalAmount = 0;
      }
    });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
