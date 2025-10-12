import React, { useEffect, useState } from "react"; 
import Title from "../components/Tittle";
import { useNetWorkCalls } from "../Utils/NetworkCalls";

const OrderControl = () => {
  const { netWorkCalls } = useNetWorkCalls();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const rupees = "\u20B9";

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const res = await netWorkCalls({ method: 'get', path: '/orders?all=true' });
      if (res) setOrders(res);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await netWorkCalls({ method:'put', path:'/order/status', data:{ order_id:id, order_status: newStatus }});
      if (res) {
        setOrders(prevOrders =>
          prevOrders.map(o => o.id === id ? { ...o, status: newStatus } : o)
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="p-6">
      <Title text1={"Orders"}  divClassName={'py-6 text-2xl font-semibold'} />

      <div className="space-y-6">
        {loading ? (
          // Skeleton loading effect
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-white shadow-lg rounded-xl border border-gray-200 p-6">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-3"></div>
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="mt-6 flex gap-3">
                <div className="h-8 bg-gray-300 rounded w-32"></div>
                <div className="h-8 bg-gray-300 rounded w-48"></div>
              </div>
            </div>
          ))
        ) : (
          // Actual orders
          orders.map((order, index) => {
            const totalPrice = order.products.reduce(
              (sum, item) => sum + item.total_price,
              0
            );

            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 hover:shadow-xl transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-3 mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order #{order.id}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {order.products.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 border-b pb-2 last:border-b-0 last:pb-0"
                    >
                      <img
                        src={item.image_urls[0]}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {item.title}{" "}
                          <span className="text-gray-500">
                            x {item.quantity}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <p className="text-sm font-semibold">
                        {rupees} {item.total_price}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div>
                    <p><span className="font-semibold">Name:</span> {order.name}</p>
                    <p><span className="font-semibold">Email:</span> {order.email}</p>
                    <p><span className="font-semibold">Phone:</span> {order.mobile_number}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Address:</p>
                    <p className="text-gray-600">{order.address}</p>
                    <p className="text-xs text-gray-500">
                      Date: {new Date(order.datetime).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <p className="text-lg font-bold text-gray-800">
                    Total: {rupees} {totalPrice}
                  </p>
                  <select
                    className="p-2 border rounded-lg font-medium bg-gray-50 hover:bg-gray-100"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="waiting">Waiting</option>
                    <option value="canceled">Canceled</option>
                    <option value="order placed">Order Placed</option>
                    <option value="shipped">Shipped</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderControl;
