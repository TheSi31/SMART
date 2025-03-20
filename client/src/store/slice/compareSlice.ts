import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { productIds: number[] } = {
  productIds: [], // Указываем, что массив содержит числа
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<number>) => {
      // Теперь TypeScript знает, что action.payload - это число
      if (!state.productIds.includes(action.payload)) {
        state.productIds.push(action.payload);
      }
    },
    removeFromCompare: (state, action: PayloadAction<number>) => {
      state.productIds = state.productIds.filter(id => id !== action.payload);
    },
    clearCompare: (state) => {
      state.productIds = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
