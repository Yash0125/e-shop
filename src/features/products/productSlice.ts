// src/features/products/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types/product';
import { RootState } from '../../redux/store';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  searchQuery: string;
  filters: {
    price: {
      active: boolean;
      order: 'asc' | 'desc';
    };
    rating: {
      active: boolean;
      order: 'asc' | 'desc';
    };
  };
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  searchQuery: '',
  filters: {
    price: {
      active: false,
      order: 'asc'
    },
    rating: {
      active: false,
      order: 'desc'
    }
  }
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setFilters: (state, action: PayloadAction<{
      price?: { active: boolean; order: 'asc' | 'desc' };
      rating?: { active: boolean; order: 'asc' | 'desc' };
    }>) => {
      if (action.payload.price) {
        state.filters.price = action.payload.price;
      }
      if (action.payload.rating) {
        state.filters.rating = action.payload.rating;
      }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const selectFilteredAndSortedProducts = (state: RootState) => {
  let filteredProducts = [...state.products.items];
  const searchQuery = state.products.searchQuery.toLowerCase();
  const itemsPerPage = 8;

  // Apply search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      product => product.title.toLowerCase().includes(searchQuery)
    );
  }

  // Apply sorting
  if (state.products.filters.price.active) {
    filteredProducts.sort((a, b) => {
      return state.products.filters.price.order === 'asc' 
        ? a.price - b.price 
        : b.price - a.price;
    });
  }

  if (state.products.filters.rating.active) {
    filteredProducts.sort((a, b) => {
      return state.products.filters.rating.order === 'asc'
        ? a.rating.rate - b.rating.rate
        : b.rating.rate - a.rating.rate;
    });
  }

  // Calculate pagination
  const startIndex = (state.products.currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return {
    products: paginatedProducts,
    totalPages,
  };
};

export const { setCurrentPage, setSearchQuery, setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;