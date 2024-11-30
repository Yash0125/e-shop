import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { toggleTheme } from '../features/theme/themeSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-50 theme-transition" style={{ 
      background: 'var(--card-bg)',
      color: 'var(--text-color)',
      boxShadow: 'var(--shadow-1)'
    }}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-color)' }}
        >
          EShop
        </Link>
        
        <div className="flex items-center gap-6">
          {/* Theme Toggle Button */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-color)' }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Cart Link */}
          <Link 
            to="/cart" 
            className="flex items-center gap-2 hover:text-primary-color transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span 
              className=" ml-3 top-[22px] right-5 w-5 h-5 flex items-center justify-center text-xs rounded-full"
              style={{ 
                background: 'var(--button-bg)',
                color: 'var(--button-text)',
                boxShadow: 'var(--shadow-1)'
              }}
            >
              {itemCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
