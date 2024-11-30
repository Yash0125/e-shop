import React from 'react';
import { Product } from '../types/product';
import { useAppDispatch } from '../redux/store';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div 
      className="p-4 rounded-lg theme-transition w-[300px] m-4 transition-all duration-300 hover:-translate-y-1"
      style={{ 
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-1)'
      }}
    >
      <div className='w-full h-[190px] bg-white rounded-lg'>

      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-[200px] object-contain mb-4 p-4 rounded-lg"
        style={{ background: 'var(--white-1)' }}
      />
      </div>
      <h3 className="text-lg font-semibold mb-2 line-clamp-2"
        style={{ color: 'var(--light-gray)' }}>
        {product.title}
      </h3>
      <div className="text-xl font-bold mb-2" 
        style={{ color: 'var(--orange-yellow-crayola)' }}>
        ${product.price.toFixed(2)}
      </div>
      <div className="flex items-center gap-2 mb-4" 
        style={{ color: 'var(--light-gray-70)' }}>
        <span>⭐</span>
        <span>{product.rating.rate}</span>
        <span>({product.rating.count} reviews)</span>
      </div>
      <button
        onClick={() => handleAddToCart(product)}
        className="w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
        style={{ 
          background: 'var(--button-bg)',
          color: 'var(--button-text)',
          boxShadow: 'var(--shadow-1)'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
