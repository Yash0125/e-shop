import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-jet)' }}>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--orange-yellow-crayola)' }}>
          Your Cart
        </h2>

        {items.length === 0 ? (
          <div className="text-center p-8 rounded-lg"
            style={{ 
              background: 'var(--bg-gradient-onyx)',
              color: 'var(--light-gray)',
              border: '1px solid var(--jet)',
              boxShadow: 'var(--shadow-2)'
            }}>
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="rounded-lg p-4"
                style={{ 
                  background: 'var(--bg-gradient-onyx)',
                  border: '1px solid var(--jet)',
                  boxShadow: 'var(--shadow-2)'
                }}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-20 object-contain rounded-md p-2"
                      style={{ background: 'var(--white-1)' }}
                    />
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--light-gray)' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: 'var(--orange-yellow-crayola)' }}>
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
                        style={{ 
                          background: 'var(--button-bg)',
                          color: 'var(--button-text)',
                          boxShadow: 'var(--shadow-1)'
                        }}
                      >
                        -
                      </button>
                      <span className="w-8 text-center" style={{ color: 'var(--light-gray)' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
                        style={{ 
                          background: 'var(--button-bg)',
                          color: 'var(--button-text)',
                          boxShadow: 'var(--shadow-1)'
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--bittersweet-shimmer)' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 p-6 rounded-lg"
              style={{ 
                background: 'var(--bg-gradient-onyx)',
                border: '1px solid var(--jet)',
                boxShadow: 'var(--shadow-2)'
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold" style={{ color: 'var(--light-gray)' }}>
                  Total:
                </span>
                <span className="text-xl font-bold" style={{ color: 'var(--orange-yellow-crayola)' }}>
                  ${total.toFixed(2)}
                </span>
              </div>
              <button 
                className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  background: 'var(--button-bg)',
                  color: 'var(--button-text)',
                  boxShadow: 'var(--shadow-1)'
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
