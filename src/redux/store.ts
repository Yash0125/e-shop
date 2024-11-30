import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import productsReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;