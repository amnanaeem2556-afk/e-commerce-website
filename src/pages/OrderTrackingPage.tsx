import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MOCK_PAST_ORDERS, formatPKR } from '../data/constants';
import { Order } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, currentOrder, setCurrentPage } = useShop();

  const allOrders = React.useMemo(() => {
    const map = new Map<string, Order>();
    if (Array.isArray(orders)) {
      orders.forEach((o) => {
        if (o && o.id) map.set(o.id, o);
      });
    }
    if (Array.isArray(MOCK_PAST_ORDERS)) {
      MOCK_PAST_ORDERS.forEach((o) => {
        if (o && o.id && !map.has(o.id)) {
          map.set(o.id, o);
        }
      });
    }
    return Array.from(map.values());
  }, [orders]);

  const defaultOrderId = currentOrder ? currentOrder.id : allOrders[0]?.id || '';
  const defaultEmail = currentOrder ? currentOrder.email : 'patron@lumora.luxury';

  const [searchOrderId, setSearchOrderId] = useState(defaultOrderId);
  const [searchEmail, setSearchEmail] = useState(defaultEmail);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(currentOrder || allOrders[0] || null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanId = searchOrderId.trim().toUpperCase();
    const cleanEmail = searchEmail.trim().toLowerCase();

    if (!cleanId) {
      setError('Please enter your Lumora Order ID (e.g. LUM-948201).');
      return;
    }

    const found = allOrders.find(
      (o) => o.id.toUpperCase() === cleanId || o.id.replace('LUM-', '') === cleanId
    );

    if (found) {
      setTrackedOrder(found);
    } else {
      setError(`No atelier record matching "${searchOrderId}". Please check your order confirmation slip or SMS notification.`);
      setTrackedOrder(null);
    }
  };

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 1;
      case 'processing':
        return 2;
      case 'shipped':
        return 3;
      case 'out_for_delivery':
        return 4;
      case 'delivered':
        return 5;
      default:
        return 2;
    }
  };

  const activeStep = trackedOrder ? getStepIndex(trackedOrder.status) : 2;

  const trackingSteps = [
    { num: 1, label: 'Order Registered', desc: 'Secure payment captured' },
    { num: 2, label: 'Atelier Inspection', desc: 'Hand-pressed & silk-tied' },
    { num: 3, label: 'Dispatched via Courier', desc: 'En route from Lahore salon' },
    { num: 4, label: 'Out for Handover', desc: 'Driver carrying parcel' },
    { num: 5, label: 'Delivered', desc: 'Signature obtained' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C48A5A] font-semibold">
          Live White-Glove Telemetry
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2B1D17] font-normal">
          Track Your Atelier Order
        </h1>
        <p className="text-xs sm:text-sm text-[#6B4A3A] font-light">
          Monitor your shipment from our private Lahore cutting room to your doorstep anywhere in Pakistan.
        </p>
      </div>

      {/* Search Bar Form */}
      <div className="bg-[#FAF6F0] border border-[#E7D6C1] p-6 sm:p-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5">
            <label className="text-xs font-medium text-[#2B1D17] block mb-1">
              Order ID
            </label>
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="e.g. LUM-948201"
              className="w-full p-2.5 bg-white border border-[#E7D6C1] text-xs uppercase tracking-wider text-[#2B1D17] focus:outline-none focus:border-[#2B1D17]"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="text-xs font-medium text-[#2B1D17] block mb-1">
              Email or Mobile Number
            </label>
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="e.g. patron@domain.com"
              className="w-full p-2.5 bg-white border border-[#E7D6C1] text-xs text-[#2B1D17] focus:outline-none focus:border-[#2B1D17]"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#2B1D17] hover:bg-[#6B4A3A] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold py-2.5 px-4 transition-colors cursor-pointer"
            >
              Track
            </button>
          </div>
        </form>

        {error && (
          <p className="text-xs text-red-600 font-medium mt-3 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </p>
        )}

        {/* Quick Sample Order IDs */}
        <div className="mt-4 pt-4 border-t border-[#E7D6C1]/60 flex flex-wrap items-center gap-2 text-[11px] text-[#6B4A3A]">
          <span>Recent orders:</span>
          {allOrders.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setSearchOrderId(o.id);
                setSearchEmail(o.email);
                setTrackedOrder(o);
                setError('');
              }}
              className="underline hover:text-[#2B1D17] cursor-pointer"
            >
              {o.id}
            </button>
          ))}
        </div>
      </div>

      {/* TRACKING DETAILS CARD */}
      {trackedOrder && (
        <div className="space-y-8 animate-fadeIn">
          {/* Main Status & Courier Header */}
          <div className="bg-[#FAF6F0] border border-[#E7D6C1] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7D6C1] pb-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C48A5A] font-semibold">
                  Shipment #{trackedOrder.id}
                </span>
                <h2 className="font-serif text-2xl text-[#2B1D17] font-semibold mt-0.5">
                  Package Status: <span className="capitalize text-[#6B4A3A]">{trackedOrder.status.replace(/_/g, ' ')}</span>
                </h2>
                <p className="text-xs text-[#6B4A3A] mt-1">
                  Recipient: <strong>{trackedOrder.customerName}</strong> &bull; {trackedOrder.shippingAddress}
                </p>
              </div>

              <div className="text-left sm:text-right bg-[#E7D6C1]/30 p-3 sm:p-4 border border-[#E7D6C1]">
                <span className="text-[10px] uppercase tracking-wider text-[#6B4A3A] block">
                  Estimated Handover
                </span>
                <span className="font-serif text-base font-bold text-[#2B1D17]">
                  {trackedOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Stepper Bar */}
            <div className="relative py-2">
              <div className="hidden sm:block absolute top-6 left-10 right-10 h-0.5 bg-[#E7D6C1]" />
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                {trackingSteps.map((st) => {
                  const isDone = st.num <= activeStep;
                  const isCurrent = st.num === activeStep;

                  return (
                    <div
                      key={st.num}
                      className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                          isCurrent
                            ? 'bg-[#C48A5A] text-[#2B1D17] ring-4 ring-[#C48A5A]/30 animate-pulse'
                            : isDone
                            ? 'bg-[#2B1D17] text-[#FAF6F0]'
                            : 'bg-[#E7D6C1] text-[#6B4A3A]'
                        }`}
                      >
                        {isDone && !isCurrent ? '✓' : st.num}
                      </div>
                      <div>
                        <h4 className="font-serif text-xs font-semibold text-[#2B1D17]">
                          {st.label}
                        </h4>
                        <p className="text-[10px] text-[#6B4A3A] leading-tight mt-0.5">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier Carrier Dispatch Details */}
            <div className="pt-4 border-t border-[#E7D6C1] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-white/60 border border-[#E7D6C1]">
                <span className="text-[10px] uppercase tracking-wider text-[#6B4A3A] block mb-0.5">
                  Courier Partner
                </span>
                <p className="font-semibold text-[#2B1D17]">TCS White-Glove VIP Express</p>
                <p className="text-[#6B4A3A] text-[11px]">Airway Bill: #AWB-9847192-PK</p>
              </div>

              <div className="p-3 bg-white/60 border border-[#E7D6C1]">
                <span className="text-[10px] uppercase tracking-wider text-[#6B4A3A] block mb-0.5">
                  Assigned Chauffeur
                </span>
                <p className="font-semibold text-[#2B1D17]">Tariq Mehmood (Badge #041)</p>
                <p className="text-[#6B4A3A] text-[11px]">Contact: +92 (300) 412-9090</p>
              </div>

              <div className="p-3 bg-white/60 border border-[#E7D6C1]">
                <span className="text-[10px] uppercase tracking-wider text-[#6B4A3A] block mb-0.5">
                  Packaging Verification
                </span>
                <p className="font-semibold text-[#2B1D17]">Archival Gift Boxed & Sealed</p>
                <p className="text-[#6B4A3A] text-[11px]">Temper-evident wax stamped</p>
              </div>
            </div>
          </div>

          {/* Items In Parcel */}
          <div className="bg-[#FAF6F0] border border-[#E7D6C1] p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#2B1D17] border-b border-[#E7D6C1] pb-3">
              Garments In This Shipment ({trackedOrder.items.length})
            </h3>

            <div className="space-y-3 divide-y divide-[#E7D6C1]/60">
              {trackedOrder.items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product?.images?.[0] || ''}
                      alt={item.product?.name || ''}
                      referrerPolicy="no-referrer"
                      className="w-12 h-16 object-cover border border-[#E7D6C1]"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#2B1D17]">
                        {item.product.name}
                      </h4>
                      <p className="text-[#6B4A3A]">
                        {item.selectedColor} &bull; Size {item.selectedSize.toUpperCase()}
                      </p>
                      <p className="text-[#6B4A3A]">Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <span className="font-serif text-sm font-semibold text-[#2B1D17]">
                    {formatPKR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E7D6C1] flex justify-between items-baseline text-xs">
              <span className="font-serif text-base font-bold text-[#2B1D17]">Total Parcel Value</span>
              <span className="font-serif text-xl font-bold text-[#2B1D17]">
                {formatPKR(trackedOrder.total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
