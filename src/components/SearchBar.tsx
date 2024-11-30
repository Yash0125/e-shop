import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch } from '../redux/store';
import { setSearchTerm } from '../features/products/productSlice';

const SearchBar: React.FC = React.memo(() => {
  const [localSearch, setLocalSearch] = useState('');
  const dispatch = useAppDispatch();

  // Debounce search term dispatch
  const debouncedSearch = useCallback((value: string) => {
    dispatch(setSearchTerm(value));
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      debouncedSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="relative w-full max-w-md" >
      <input 
        type="text" 
        placeholder="Search products..." 
        value={localSearch}
        onChange={handleSearchChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        style={{ 
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-1)',
            color: 'var(--light-gray)'
          }}
      />
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
        size={20} 
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;