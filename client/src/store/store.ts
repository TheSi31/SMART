import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';
import viewedReducer from './slice/viewedSlice';
import compareReducer from './slice/compareSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const viewedPersistConfig = {
  key: 'viewed',
  storage,
};

const comparePersistConfig = {
  key: 'compare',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedViewedReducer = persistReducer(viewedPersistConfig, viewedReducer);
const persistedCompareReducer = persistReducer(comparePersistConfig, compareReducer);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    viewed: persistedViewedReducer,
    compare: persistedCompareReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
