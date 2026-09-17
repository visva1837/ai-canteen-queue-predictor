import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function CartDrawer() {
  const {
    showCart,
    setShowCart,
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    navigate,
    user,
  } = useApp();

  if (!showCart) return null;

  const handleCheckout = () => {
    setShowCart(false);
    if (!user) {
      navigate('login');
    } else {
      navigate('menu');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => setShowCart(false)}
      />
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h3 className="font-display font-bold text-slate-800">
              Your Cart {cartCount > 0 && `(${cartCount})`}
            </h3>
          </div>
          <button
            onClick={() => setShowCart(false)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100">
                <ShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <p className="font-medium text-slate-600">Your cart is empty</p>
                <p className="text-sm text-slate-400">Browse the menu to add items</p>
              </div>
              <button
                onClick={() => { setShowCart(false); navigate('menu'); }}
                className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 text-sm truncate">{item.name}</p>
                    <p className="text-sm text-blue-600 font-semibold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center justify-center w-7 h-7 rounded-lg text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Subtotal</span>
              <span className="text-sm font-medium text-slate-700">₹{cartTotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Service Charge</span>
              <span className="text-sm font-medium text-slate-700">₹0</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-800">Total</span>
              <span className="font-display text-xl font-bold text-blue-600">₹{cartTotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
