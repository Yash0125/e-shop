// src/features/products/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductState } from '../../types/product';
import { RootState } from '../../redux/store';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

// Initial state
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortBy: 'name',
  sortOrder: 'asc',
  currentPage: 1,
  itemsPerPage: 8
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page on search
    },
    setSorting: (state, action: PayloadAction<{
      sortBy: string;
      sortOrder: 'asc' | 'desc';
    }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.currentPage = 1; // Reset to first page on sort
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectFilteredAndSortedProducts = (state: RootState) => {
  const { products, searchTerm, sortBy, sortOrder, currentPage, itemsPerPage } = state.products;
  
  // Filter products based on search term
  let filteredProducts = products;
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort products
  let sortedProducts = [...filteredProducts];
  if (sortBy) {
    sortedProducts.sort((a, b) => {
      let aValue = a[sortBy as keyof Product];
      let bValue = b[sortBy as keyof Product];
      
      // Handle rating objects
      if (sortBy === 'rating') {
        aValue = (aValue as any).rate;
        bValue = (bValue as any).rate;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return {
    products: paginatedProducts,
    totalPages
  };
};

export const { setSearchTerm, setSorting, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;