import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../firebaseConfig';

interface OrderItem {
  name: string;
  quantity: number;
  size: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: number;
  address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    phone: string;
  };
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const ordersRef = ref(database, `orders`);

    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedOrders = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setOrders(fetchedOrders);
      }
    });
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await remove(ref(database, `orders/${orderId}`));
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        alert("Order deleted successfully.");
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("An error occurred while deleting the order.");
      }
    }
  };

  return (
    
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="p-4 border rounded-md shadow-sm">
              <h3 className="font-bold">Order ID: {order.id}</h3>
              <p>Total Amount: ₦{order.totalAmount.toLocaleString()}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <ul className="mt-2 space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item.quantity}x {item.name} - Size: {item.size}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <h4 className="font-semibold">Shipping Address:</h4>
                <p>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.address}</p>
                <p>{order.address.city}, {order.address.state}</p>
                <p>{order.address.phone}</p>
              </div>
              <button
                onClick={() => handleDeleteOrder(order.id)}
                className="mt-4 text-red-500 hover:underline"
              >
                Delete Order
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}

      <div className="absolute top-19 right-8">
        <button onClick={handleLogout} className="text-blue-500 hover:underline">
          Log out
        </button>
      </div>
    </div>
    
  );
};

export default AdminDashboard;
