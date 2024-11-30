import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setSorting } from '../features/products/productSlice';

const SortControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder } = useAppSelector((state) => state.products);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'none') {
      dispatch(setSorting({ sortBy: null }));
    } else {
      const [newSortBy, newSortOrder] = value.split('-') as ['price' | 'rating', 'asc' | 'desc'];
      dispatch(setSorting({ sortBy: newSortBy, sortOrder: newSortOrder }));
    }
  };

  const currentValue = sortBy ? `${sortBy}-${sortOrder}` : 'none';

  return (
    <div className="flex items-center gap-4 p-4"
    //  style={{ 
    //     background: 'var(--card-bg)',
    //     border: '1px solid var(--card-border)',
    //     boxShadow: 'var(--shadow-1)',
    //     color: 'var(--light-gray)'
    //   }}
      >
      <label htmlFor="sort-select" className="text-gray-700 font-medium" style={{ 
          color: 'var(--light-gray)',
          boxShadow: 'var(--shadow-1)'
        }}>
        Sort by:
      </label>
      <select
        id="sort-select"
        value={currentValue}
        onChange={handleSortChange}
        className="p-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ 
          background: 'var(--card-bg)',
          color: 'var(--light-gray)',
          boxShadow: 'var(--shadow-1)'
        }}
      >
        <option value="none" style={{ color: 'var(--light-gray)' }}>None</option>
        <option value="price-asc" style={{ color: 'var(--light-gray)' }}>Price: Low to High</option>
        <option value="price-desc" style={{ color: 'var(--light-gray)' }}>Price: High to Low</option>
        <option value="rating-desc" style={{ color: 'var(--light-gray)' }}>Rating: High to Low</option>
        <option value="rating-asc" style={{ color: 'var(--light-gray)' }}>Rating: Low to High</option>
      </select>
    </div>
  );
};

export default SortControls;