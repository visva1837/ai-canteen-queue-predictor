import { useState } from 'react';
import {
  UtensilsCrossed,
  Plus,
  Minus,
  Clock,
  CheckCircle2,
  ArrowRight,
  Calendar,
  ShoppingBag,
  X,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { menuItems, pickupTimeOptions } from '@/data/mockData';
import type { MenuItem, Order } from '@/types';

const categories = ['All', 'Meals', 'Snacks', 'Drinks', 'Fast Food'] as const;

export function MenuPage() {
  const { cart, addToCart, navigate, placeOrder, user } = useApp();
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState(pickupTimeOptions[1].time);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const filteredItems = category === 'All'
    ? menuItems
    : menuItems.filter((i) => i.category === category);

  const getCartQty = (id: string) => cart.find((c) => c.item.id === id)?.quantity || 0;

  const handleConfirmOrder = () => {
    const order = placeOrder(selectedPickup);
    if (order) {
      setConfirmedOrder(order);
      setCheckoutOpen(false);
    }
  };

  if (confirmedOrder) {
    return <OrderConfirmation order={confirmedOrder} onTrack={() => { setConfirmedOrder(null); navigate('orders'); }} onContinue={() => { setConfirmedOrder(null); navigate('menu'); }} />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
            Canteen Menu
          </h1>
          <p className="mt-1 text-slate-500">
            Browse and preorder food for pickup at the best time
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const qty = getCartQty(item.id);
            return (
              <MenuCard
                key={item.id}
                item={item}
                qty={qty}
                onAdd={() => addToCart(item.id)}
              />
            );
          })}
        </div>

        {/* Checkout bar */}
        {cart.length > 0 && !checkoutOpen && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg">
            <button
              onClick={() => {
                if (!user) { navigate('login'); return; }
                setCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold">
                  {cart.reduce((s, c) => s + c.quantity, 0)} items · ₹{cart.reduce((s, c) => s + c.item.price * c.quantity, 0)}
                </span>
              </span>
              <span className="flex items-center gap-1 text-sm font-medium">
                {user ? 'Checkout' : 'Login to order'} <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        )}

        {/* Checkout modal */}
        {checkoutOpen && (
          <CheckoutModal
            selectedPickup={selectedPickup}
            setSelectedPickup={setSelectedPickup}
            onClose={() => setCheckoutOpen(false)}
            onConfirm={handleConfirmOrder}
          />
        )}
      </div>
    </div>
  );
}

function MenuCard({ item, qty, onAdd }: { item: MenuItem; qty: number; onAdd: () => void }) {
  return (
    <div className="group rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all">
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-xs font-medium text-slate-600">
          {item.category}
        </div>
        {qty > 0 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold">
            {qty} in cart
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-bold text-slate-800">{item.name}</h3>
          <span className="font-display text-lg font-bold text-blue-600">₹{item.price}</span>
        </div>
        <p className="text-sm text-slate-500 mb-3 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {item.prepTime} min prep
          </span>
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutModal({
  selectedPickup,
  setSelectedPickup,
  onClose,
  onConfirm,
}: {
  selectedPickup: string;
  setSelectedPickup: (t: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useApp();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white z-10">
          <h3 className="font-display font-bold text-slate-800">Confirm Preorder</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-5">
          {/* Cart items */}
          <div className="space-y-3 mb-5">
            {cart.map(({ item, quantity }) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                  <p className="text-sm text-blue-600 font-semibold">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => updateQuantity(item.id, -1)} className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => removeFromCart(item.id)} className="flex items-center justify-center w-7 h-7 rounded-lg text-red-500 hover:bg-red-50">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pickup time selection */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-slate-700 text-sm">Recommended Pickup Time</h4>
            </div>
            <div className="space-y-2">
              {pickupTimeOptions.map((opt) => (
                <button
                  key={opt.time}
                  onClick={() => setSelectedPickup(opt.time)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                    selectedPickup === opt.time
                      ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-100'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{opt.time}</p>
                    <p className="text-xs text-slate-500">{opt.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${opt.crowd === 'LOW' ? 'text-green-600' : opt.crowd === 'MEDIUM' ? 'text-amber-600' : 'text-red-600'}`}>
                      {opt.crowd}
                    </span>
                    {selectedPickup === opt.time && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mb-4">
            <span className="font-semibold text-slate-800">Total Amount</span>
            <span className="font-display text-2xl font-bold text-blue-600">₹{cartTotal}</span>
          </div>

          <button
            onClick={onConfirm}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            <CheckCircle2 className="w-5 h-5" />
            Confirm Preorder
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmation({ order, onTrack, onContinue }: { order: Order; onTrack: () => void; onContinue: () => void }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6 animate-fade-in">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
          Order Confirmed!
        </h2>
        <p className="text-slate-500 mb-6">
          Your preorder has been placed successfully. Pick up your food at the recommended time.
        </p>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 mb-6 text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Order Number</span>
            <span className="font-display font-bold text-slate-800">#{order.id}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Pickup Time</span>
            <span className="font-semibold text-blue-600">{order.pickupTime}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Items</span>
            <span className="text-sm font-medium text-slate-700">
              {order.items.reduce((s, c) => s + c.quantity, 0)} items
            </span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="font-semibold text-slate-800">Total</span>
            <span className="font-display text-xl font-bold text-blue-600">₹{order.total}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onTrack}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Track Order <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onContinue}
            className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
