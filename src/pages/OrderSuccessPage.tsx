import React, { useState } from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  Download,
  ArrowRight,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Printer
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPKR } from '../data/constants';

export const OrderSuccessPage: React.FC = () => {
  const { currentOrder, setCurrentPage } = useShop();
  const [emailNotificationSent, setEmailNotificationSent] = useState(true);

  if (!currentOrder) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#2B1D17]">No Active Order Found</h2>
        <p className="text-xs text-[#6B4A3A]">Please explore our collection to place a bespoke order.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="bg-[#2B1D17] text-[#FAF6F0] px-6 py-3 text-xs uppercase tracking-widest font-semibold"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const order = currentOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Success Hero Card */}
      <div className="bg-[#FAF6F0] border border-[#E7D6C1] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-[#E7D6C1]/40 mx-auto flex items-center justify-center text-[#2B1D17] mb-2">
          <CheckCircle2 className="w-9 h-9 text-[#C48A5A]" />
        </div>

        <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#C48A5A] font-semibold block">
          Order Confirmed &bull; Reference #{order.id}
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#2B1D17] font-normal">
          Thank You For Your Patronage, {order.customerName}
        </h1>

        <p className="text-xs sm:text-sm text-[#6B4A3A] max-w-lg mx-auto font-light leading-relaxed">
          Your bespoke curation has been registered at our Lahore Salon. Our master tailors are conducting the pre-dispatch hand inspection.
        </p>

        {/* Email confirmation simulation notice */}
        {emailNotificationSent && (
          <div className="inline-flex items-center gap-2 bg-[#E7D6C1]/30 border border-[#C48A5A]/50 px-4 py-2 text-xs text-[#2B1D17] mt-2">
            <Mail className="w-3.5 h-3.5 text-[#C48A5A]" />
            <span>Confirmation receipt and tracking credentials dispatched to <strong>{order.email}</strong></span>
          </div>
        )}
      </div>

      {/* Real-time Order Tracking Timeline */}
      <div className="bg-[#FAF6F0] border border-[#E7D6C1] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E7D6C1] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C48A5A] font-semibold">
              Live Fulfillment Status
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#2B1D17]">
              Order Journey Tracking
            </h3>
          </div>
          <span className="text-xs text-[#6B4A3A] font-medium">
            Est. Arrival: <strong>{order.estimatedDelivery}</strong>
          </span>
        </div>

        {/* 5-Step Visual Timeline */}
        <div className="relative">
          <div className="hidden sm:block absolute top-5 left-8 right-8 h-0.5 bg-[#E7D6C1]" />
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
            {[
              { step: 1, label: 'Order Placed', desc: order.orderDate, completed: true, active: false },
              { step: 2, label: 'Atelier Inspection', desc: 'Silk ribboning & boxing', completed: false, active: true },
              { step: 3, label: 'Courier Dispatch', desc: 'White-Glove Fleet', completed: false, active: false },
              { step: 4, label: 'Out for Handover', desc: 'Driver en route', completed: false, active: false },
              { step: 5, label: 'Delivered', desc: 'Signature received', completed: false, active: false },
            ].map((st) => (
              <div key={st.step} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    st.completed
                      ? 'bg-[#2B1D17] text-[#FAF6F0]'
                      : st.active
                      ? 'bg-[#C48A5A] text-[#2B1D17] ring-4 ring-[#C48A5A]/30 animate-pulse'
                      : 'bg-[#E7D6C1] text-[#6B4A3A]'
                  }`}
                >
                  {st.completed ? '✓' : st.step}
                </div>
                <div>
                  <h5 className="font-serif text-xs font-semibold text-[#2B1D17]">{st.label}</h5>
                  <p className="text-[10px] text-[#6B4A3A]">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="bg-[#FAF6F0] border border-[#E7D6C1] p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-[#E7D6C1] text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6B4A3A] font-medium block mb-1">
              Destination
            </span>
            <p className="font-semibold text-[#2B1D17]">{order.customerName}</p>
            <p className="text-[#6B4A3A]">{order.shippingAddress}</p>
            <p className="text-[#6B4A3A]">{order.phone}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6B4A3A] font-medium block mb-1">
              Payment Method
            </span>
            <p className="font-semibold text-[#2B1D17]">{order.paymentMethod}</p>
            <p className="text-[#6B4A3A]">Status: Authorized & Encrypted</p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6B4A3A] font-medium block mb-1">
              Courier Timing
            </span>
            <p className="font-semibold text-[#2B1D17]">{order.estimatedDelivery}</p>
            <p className="text-[#6B4A3A]">Direct Salon Carrier</p>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4 divide-y divide-[#E7D6C1]/60">
          {order.items.map((item) => (
            <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <img
                  src={item.product?.images?.[0] || ''}
                  alt={item.product?.name || ''}
                  referrerPolicy="no-referrer"
                  className="w-14 h-18 object-cover border border-[#E7D6C1] shrink-0"
                />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#2B1D17]">
                    {item.product.name}
                  </h4>
                  <p className="text-[#6B4A3A] text-[11px]">
                    Shade: {item.selectedColor} &bull; Size: {item.selectedSize.toUpperCase()}
                  </p>
                  <p className="text-[#6B4A3A] text-[11px]">Qty: {item.quantity}</p>
                </div>
              </div>

              <div className="text-right font-serif text-sm font-semibold text-[#2B1D17]">
                {formatPKR(item.product.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Final Math */}
        <div className="pt-6 border-t border-[#E7D6C1] space-y-2 text-xs">
          <div className="flex justify-between text-[#2B1D17]">
            <span>Subtotal</span>
            <span>{formatPKR(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-800">
              <span>Privilege Voucher Savings</span>
              <span>-{formatPKR(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-[#2B1D17]">
            <span>Courier Dispatch</span>
            <span>{order.shipping === 0 ? 'Complimentary' : formatPKR(order.shipping)}</span>
          </div>
          <div className="flex justify-between font-serif text-base font-bold text-[#2B1D17] pt-2 border-t border-[#E7D6C1]">
            <span>Total Paid (PKR)</span>
            <span>{formatPKR(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <button
          onClick={handlePrint}
          className="border border-[#6B4A3A] text-[#2B1D17] hover:bg-[#E7D6C1]/30 text-xs uppercase tracking-widest font-semibold py-3.5 px-6 flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#6B4A3A]" />
          <span>Print Official Receipt</span>
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentPage('order_tracking')}
            className="border border-[#2B1D17] bg-[#FAF6F0] hover:bg-[#E7D6C1]/30 text-[#2B1D17] text-xs uppercase tracking-widest font-semibold py-3.5 px-6 flex items-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4 text-[#C48A5A]" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#2B1D17] hover:bg-[#6B4A3A] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold py-3.5 px-6 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 text-[#C48A5A]" />
          </button>
        </div>
      </div>
    </div>
  );
};
