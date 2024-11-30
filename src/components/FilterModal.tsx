import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setFilters, clearFilters } from '../features/products/productSlice';
import { IoMdClose } from 'react-icons/io';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.products.filters);
  const [tempFilters, setTempFilters] = React.useState(filters);

  if (!isOpen) return null;

  const handlePriceFilter = (order: 'asc' | 'desc') => {
    setTempFilters(prev => ({
      ...prev,
      price: {
        active: !(prev.price.active && prev.price.order === order),
        order
      }
    }));
  };

  const handleRatingFilter = (order: 'asc' | 'desc') => {
    setTempFilters(prev => ({
      ...prev,
      rating: {
        active: !(prev.rating.active && prev.rating.order === order),
        order
      }
    }));
  };

  const handleApply = () => {
    dispatch(setFilters(tempFilters));
    onClose();
  };

  const handleClear = () => {
    dispatch(clearFilters());
    setTempFilters({
      price: { active: false, order: 'asc' },
      rating: { active: false, order: 'desc' }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="relative bg-white rounded-lg p-6 w-96 max-w-md"
        style={{ 
          background: 'var(--bg-gradient-onyx)',
          border: '1px solid var(--jet)',
          boxShadow: 'var(--shadow-2)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl hover:opacity-80"
          style={{ color: 'var(--light-gray)' }}
        >
          <IoMdClose />
        </button>

        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--orange-yellow-crayola)' }}>
          Filter & Sort
        </h2>

        {/* Price Filters */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3" style={{ color: 'var(--light-gray)' }}>Price</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handlePriceFilter('asc')}
              className={`flex-1 p-2 rounded-lg transition-all duration-200 ${
                tempFilters.price.active && tempFilters.price.order === 'asc' ? 'opacity-100' : 'opacity-70'
              }`}
              style={{ 
                background: tempFilters.price.active && tempFilters.price.order === 'asc'
                  ? 'var(--orange-yellow-crayola)' 
                  : 'var(--jet)',
                color: 'var(--white)'
              }}
            >
              Low to High
            </button>
            <button
              onClick={() => handlePriceFilter('desc')}
              className={`flex-1 p-2 rounded-lg transition-all duration-200 ${
                tempFilters.price.active && tempFilters.price.order === 'desc' ? 'opacity-100' : 'opacity-70'
              }`}
              style={{ 
                background: tempFilters.price.active && tempFilters.price.order === 'desc'
                  ? 'var(--orange-yellow-crayola)' 
                  : 'var(--jet)',
                color: 'var(--white)'
              }}
            >
              High to Low
            </button>
          </div>
        </div>

        {/* Rating Filters */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3" style={{ color: 'var(--light-gray)' }}>Rating</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleRatingFilter('asc')}
              className={`flex-1 p-2 rounded-lg transition-all duration-200 ${
                tempFilters.rating.active && tempFilters.rating.order === 'asc' ? 'opacity-100' : 'opacity-70'
              }`}
              style={{ 
                background: tempFilters.rating.active && tempFilters.rating.order === 'asc'
                  ? 'var(--orange-yellow-crayola)' 
                  : 'var(--jet)',
                color: 'var(--white)'
              }}
            >
              Low to High
            </button>
            <button
              onClick={() => handleRatingFilter('desc')}
              className={`flex-1 p-2 rounded-lg transition-all duration-200 ${
                tempFilters.rating.active && tempFilters.rating.order === 'desc' ? 'opacity-100' : 'opacity-70'
              }`}
              style={{ 
                background: tempFilters.rating.active && tempFilters.rating.order === 'desc'
                  ? 'var(--orange-yellow-crayola)' 
                  : 'var(--jet)',
                color: 'var(--white)'
              }}
            >
              High to Low
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleClear}
            className="flex-1 p-2 rounded-lg transition-all duration-200"
            style={{ 
              background: 'var(--jet)',
              color: 'var(--white)'
            }}
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 p-2 rounded-lg transition-all duration-200"
            style={{ 
              background: 'var(--orange-yellow-crayola)',
              color: 'var(--white)'
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
