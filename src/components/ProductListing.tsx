import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchProducts, selectFilteredAndSortedProducts, setCurrentPage } from '../features/products/productSlice';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import SortControls from './SortControls';

const ProductListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector(state => state.products);
  const { products, totalPages } = useAppSelector(selectFilteredAndSortedProducts);
  const loading = useAppSelector(state => state.products.loading);
  const error = useAppSelector(state => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen"
        style={{ background: 'var(--bg-gradient-jet)' }}>
        <div className="w-12 h-12 rounded-full animate-spin"
          style={{ 
            borderWidth: '4px',
            borderStyle: 'solid',
            borderColor: 'var(--light-gray-70)',
            borderTopColor: 'var(--orange-yellow-crayola)'
          }}>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4" style={{ color: 'var(--bittersweet-shimmer)' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-jet)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 p-4 rounded-lg theme-transition" style={{ 
          background: 'var(--sort-bg)',
          boxShadow: 'var(--shadow-1)'
        }}>
          <SearchBar />
          <SortControls />
        </div>

        {products.length === 0 ? (
          <div className="text-center p-8 rounded-lg" style={{ 
            background: 'var(--card-bg)',
            color: 'var(--text-color)',
            boxShadow: 'var(--shadow-1)'
          }}>
            No products found
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 hover:opacity-90"
                style={{ 
                  background: 'var(--button-bg)',
                  color: 'var(--button-text)',
                  boxShadow: 'var(--shadow-1)'
                }}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = pageNumber === currentPage;
                  
                  // Show first page, last page, current page, and pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={isCurrentPage}
                        className="w-10 h-10 rounded-lg font-semibold transition-all duration-200 disabled:opacity-90 hover:opacity-80 flex items-center justify-center"
                        style={{ 
                          background: isCurrentPage ? 'var(--active-page-bg)' : 'var(--button-bg)',
                          color: isCurrentPage ? 'var(--active-page-text)' : 'var(--button-text)',
                          boxShadow: 'var(--shadow-1)'
                        }}
                      >
                        {pageNumber}
                      </button>
                    );
                  }

                  // Show dots if there's a gap
                  if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span
                        key={pageNumber}
                        className="w-10 h-10 flex items-center justify-center"
                        style={{ color: 'var(--text-color)' }}
                      >
                        ...
                      </span>
                    );
                  }

                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 hover:opacity-90"
                style={{ 
                  background: 'var(--button-bg)',
                  color: 'var(--button-text)',
                  boxShadow: 'var(--shadow-1)'
                }}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListing;