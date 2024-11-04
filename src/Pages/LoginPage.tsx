import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useUser } from "../components/UserProvider";

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

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      // Redirect to login page if user is null
      navigate('/login');
      return;
    }

    const ordersRef = ref(database, `users/${user.uid}/orders`);

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
  }, [user, navigate]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (user && window.confirm("Are you sure you want to delete this order?")) {
      try {
        await remove(ref(database, `users/${user.uid}/orders/${orderId}`));
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        alert("Order deleted successfully.");
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("An error occurred while deleting the order.");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between p-8 min-h-screen bg-gray-50">
      <div className="flex-1 mb-8 lg:mb-0 lg:mr-8">
        <h1 className="text-3xl font-bold mb-4">My Account</h1>
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
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
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        )}
      </div>

      <div className="absolute top-19 right-8">
        <button onClick={handleLogout} className="text-blue-500 hover:underline">
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
