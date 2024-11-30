import React, { useState } from 'react';
import { useAppSelector } from '../redux/store';
import FilterModal from './FilterModal';
import { FaFilter } from 'react-icons/fa';

const SortControls: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filters = useAppSelector((state) => state.products.filters);

  const getActiveFilters = () => {
    const activeFilters = [];
    
    if (filters.price.active) {
      activeFilters.push(`Price: ${filters.price.order === 'asc' ? 'Low to High' : 'High to Low'}`);
    }
    
    if (filters.rating.active) {
      activeFilters.push(`Rating: ${filters.rating.order === 'asc' ? 'Low to High' : 'High to Low'}`);
    }

    return activeFilters.length > 0 ? activeFilters.join(' • ') : 'No filters applied';
  };

  return (
    <div className="flex justify-between items-center p-4 w-full"
      style={{ 
        background: 'var(--bg-gradient-onyx)',
        border: '1px solid var(--jet)',
        boxShadow: 'var(--shadow-2)',
        borderRadius: '12px'
      }}>
      <div className="flex items-center gap-2" style={{ color: 'var(--light-gray)' }}>
        <span className="font-medium">Active Filters:</span>
        <span className="text-sm opacity-90">{getActiveFilters()}</span>
      </div>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
        style={{ 
          background: 'var(--orange-yellow-crayola)',
          color: 'var(--white)'
        }}
      >
        <FaFilter />
        Filter & Sort
      </button>

      <FilterModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SortControls;