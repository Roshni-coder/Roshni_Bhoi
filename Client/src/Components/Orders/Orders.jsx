import React, { useState, useEffect } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaBoxOpen,
  FaCalendarAlt,
  FaCreditCard,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Badges from "./Badges";
import SideMenu from "../My Profile/SideMenu.jsx";
import api from "../../utils/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [openOrderIndex, setOpenOrderIndex] = useState(null);
  const [detailedOrder, setDetailedOrder] = useState(null);

  const toggleOrder = async (index) => {
    if (openOrderIndex === index) {
      setOpenOrderIndex(null);
      setDetailedOrder(null);
    } else {
      const orderId = orders[index]._id;
      try {
        const res = await api.get(`/api/client/order/${orderId}`);
        if (res.data.success) {
          setDetailedOrder(res.data.order);
          setOpenOrderIndex(index);
        }
      } catch (error) {
        console.error("Error fetching details", error);
      }
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/client/get-orders");
        if (res.data.success) setOrders(res.data.orders);
        console.log("Order Address 👉", res.data.orders);

      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <section className="min-h-screen bg-[#fcfcf9] py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

          {/* SIDEBAR */}
          <aside className="w-full lg:w-1/4 order-2 lg:order-1">
            <SideMenu />
          </aside>

          {/* MAIN */}
          <main className="w-full lg:w-3/4 order-1 lg:order-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 shadow-sm overflow-hidden">

              {/* HEADER */}
              <header className="px-4 py-5 sm:px-8 sm:py-8 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-3xl font-serif font-bold text-[#1a3a32]">
                    Order History
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Past treasures & shipments —
                    <span className="text-[#c5a059] font-bold ml-1">
                      {orders.length} orders
                    </span>
                  </p>
                </div>
                <div className="hidden sm:flex p-3 rounded-2xl bg-[#fdfbf7] border border-[#c5a059]/20">
                  <FaBoxOpen className="text-[#c5a059] text-2xl" />
                </div>
              </header>

              {/* CONTENT */}
              <div className="p-0 sm:p-4">

                {/* DESKTOP TABLE */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold">
                        <th className="px-6 py-4">Order</th>
                        <th className="px-6 py-4 text-center">Status</th>
                        <th className="px-6 py-4 text-center">Total</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, idx) => (
                        <OrderRow
                          key={order._id}
                          order={order}
                          idx={idx}
                          isOpen={openOrderIndex === idx}
                          onToggle={() => toggleOrder(idx)}
                          detailedOrder={detailedOrder}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE CARDS */}
                <div className="md:hidden space-y-4 p-4">
                  {orders.map((order, idx) => (
                    <MobileOrderCard
                      key={order._id}
                      order={order}
                      idx={idx}
                      isOpen={openOrderIndex === idx}
                      onToggle={() => toggleOrder(idx)}
                      detailedOrder={detailedOrder}
                    />
                  ))}
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ROW (DESKTOP) ---------------- */

const OrderRow = ({ order, idx, isOpen, onToggle, detailedOrder }) => (
  <>
    <tr className={`transition ${isOpen ? "bg-[#fdfbf7]" : "hover:bg-stone-50/50"}`}>
      <td className="px-6 py-5">
        <p className="font-bold text-[#1a3a32] text-sm">
          #{order._id.slice(-8).toUpperCase()}
        </p>
        <p className="text-[11px] text-stone-400 italic mt-1 flex items-center gap-2">
          <FaCalendarAlt size={10} className="text-[#c5a059]" />
          {new Date(order.placedAt).toLocaleDateString("en-GB")}
        </p>
      </td>
      <td className="px-6 py-5 text-center">
        <Badges status={order.status} />
      </td>
      <td className="px-6 py-5 text-center font-bold text-[#1a3a32]">
        ₹{order.totalAmount.toLocaleString()}
      </td>
      <td className="px-6 py-5 text-right">
        <button
          onClick={onToggle}
          className={`px-5 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition ${
            isOpen
              ? "bg-[#1a3a32] text-white"
              : "bg-[#fdfbf7] border border-stone-200 text-[#1a3a32] hover:border-[#c5a059]"
          }`}
        >
          {isOpen ? "Close" : "View"} {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </td>
    </tr>
    {isOpen && detailedOrder && (
      <ExpandedContent order={order} detailedOrder={detailedOrder} colSpan={4} />
    )}
  </>
);

/* ---------------- MOBILE CARD ---------------- */

const MobileOrderCard = ({ order, isOpen, onToggle, detailedOrder }) => (
  <div className={`rounded-xl border transition ${
    isOpen ? "border-[#c5a059]/40 bg-[#fdfbf7]" : "border-stone-100 bg-white"
  }`}>
    <div className="p-4 flex justify-between items-center" onClick={onToggle}>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
          #{order._id.slice(-8).toUpperCase()}
        </p>
        <p className="font-bold text-[#1a3a32] mt-1">
          ₹{order.totalAmount.toLocaleString()}
        </p>
        <p className="text-[11px] text-stone-400 italic">
          {new Date(order.placedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Badges status={order.status} />
        <FaAngleDown
          className={`text-[#c5a059] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
    </div>

    {isOpen && detailedOrder && (
      <div className="border-t border-stone-100 p-4">
        <ExpandedContent order={order} detailedOrder={detailedOrder} isMobile />
      </div>
    )}
  </div>
);

/* ---------------- EXPANDED ---------------- */

/* ---------------- EXPANDED CONTENT (SCHEMA-ALIGNED) ---------------- */

const ExpandedContent = ({ order, detailedOrder, colSpan, isMobile }) => {
  // Use detailedOrder if the API call finished, otherwise fall back to list order
  const data = detailedOrder || order;
  const addr = data.shippingAddress;

  const content = (
    <div className="space-y-6 py-4 animate-in fade-in slide-in-from-top-1">
      <div className="grid sm:grid-cols-2 gap-4">

        {/* --- SHIPPING INFO (ALIGNED WITH SCHEMA) --- */}
        <div className="bg-white border border-stone-100 p-5 rounded-2xl shadow-sm">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-[#c5a059] flex items-center gap-2 mb-4">
            <FaMapMarkerAlt /> Shipping Address
          </h4>
          
          <div className="space-y-1.5">
            <p className="font-bold text-[#1a3a32] text-sm">
              {addr?.name || "No Name Provided"}
            </p>

            {/* Address Line */}
            {/* <p className="text-xs text-stone-500 leading-relaxed">
              {addr?.address || "Address details missing"}
            </p> */}

            {/* City, State & PIN */}
            <p className="text-xs text-stone-600">
              {addr?.city && `${addr.city}, `}{addr?.state}
              {addr?.pin && (
                <span className="font-bold text-[#1a3a32] ml-2">
                   PIN: <span className="text-[#c5a059]">{addr.pin}</span>
                </span>
              )}
            </p>

            {/* Phone Numbers */}
            <div className="pt-3 mt-2 border-t border-stone-50 flex flex-col gap-1">
              {addr?.phone && (
                <p className="text-[11px] text-[#1a3a32] font-semibold flex items-center gap-2">
                  <span className="opacity-50">Phone:</span> {addr.phone}
                </p>
              )}
              {addr?.alternatephone && (
                <p className="text-[11px] text-[#1a3a32] font-semibold flex items-center gap-2">
                  <span className="opacity-50">Alt:</span> {addr.alternatephone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* --- PAYMENT INFO --- */}
        <div className="bg-white border border-stone-100 p-5 rounded-2xl shadow-sm">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-[#1a3a32] flex items-center gap-2 mb-4">
            <FaCreditCard /> Payment Summary
          </h4>
          <div className="space-y-4">
            <div>
               <p className="text-[9px] text-stone-400 font-bold uppercase tracking-tighter">Method</p>
               <p className="text-xs font-bold">{data.paymentId ? "Online Payment" : "COD (Cash on Delivery)"}</p>
            </div>
            {data.paymentId && (
               <div>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-tighter">Reference ID</p>
                  <p className="text-[10px] font-mono text-stone-500 break-all bg-stone-50 p-2 rounded border border-stone-100">
                    {data.paymentId}
                  </p>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* --- ITEMS LIST --- */}
      <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-stone-50 px-4 py-2 border-b border-stone-100 flex justify-between items-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">Order Contents</p>
        </div>
        
        {data.items?.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-t first:border-t-0 hover:bg-stone-50/50 transition-colors">
            <div className="w-14 h-14 bg-stone-50 border border-stone-100 rounded-xl flex-shrink-0 overflow-hidden">
              {item.productId?.images?.[0]?.url ? (
                <img src={item.productId.images[0].url} className="w-full h-full object-cover" alt={item.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-300">No Image</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif font-bold text-[#1a3a32] text-sm truncate">
                {item.productId?.title || item.name}
              </p>
              <p className="text-[10px] font-bold text-[#c5a059]">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm text-[#1a3a32]">₹{item.price.toLocaleString()}</p>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isMobile) return content;
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-2 bg-[#fdfbf7]/80">
        {content}
      </td>
    </tr>
  );
};
export default Orders;
