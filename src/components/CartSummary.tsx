import { PaystackButton } from "react-paystack";
import { useState, ChangeEvent } from 'react';
import { useCart } from "../components/CartContext";
import { useUser } from "../components/UserProvider"; 
import { database } from "../firebaseConfig"; // Firebase Firestore instance
import { ref, push, serverTimestamp } from "firebase/database";
import { useNavigate } from "react-router-dom";
interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  phone: string;
  shippingMethod: string;
  useShippingAddress: boolean;
}

interface ShippingMethod {
  id: string;
  label: string;
  price: number;
  desc: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

const publicKey = "pk_test_ad5052b64a6cac698842afdab8792864a78f6e68";

const CheckoutForm = () => {
  const { cart } = useCart();
  const { user } = useUser(); // Get user from context
  const navigate = useNavigate();
  
const onSuccess = async () => {
  if (!user) {
    alert("You need to be logged in to place an order.");
    return;
  }

  try {
    const orderData = {
      userId: user.uid,
      email: user.email,
      items: cart.items,
      shippingMethod: formData.shippingMethod,
      deliveryMethod,
      address: formData,
      totalAmount,
      createdAt: serverTimestamp(),
    };

    // Save order to user's order history
    await push(ref(database, `users/${user.uid}/orders`), orderData);

    // Save order to central orders collection for admin dashboard
    await push(ref(database, "orders"), orderData);

    // Navigate to user dashboard
    navigate("/dashboard");

    alert("Payment Successful! Your order has been placed.");
  } catch (error) {
    console.error("Error saving order:", error);
    alert("An error occurred while placing the order.");
  }
};
  
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    phone: '',
    shippingMethod: 'lagos-mainland',
    useShippingAddress: true
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'ship' | 'pickup'>('ship');

  const shippingMethods: ShippingMethod[] = [
    { id: 'lagos-mainland', label: 'Lagos Mainland', price: 2500.00, desc: 'Takes 1-2 working days' },
    { id: 'lagos-island', label: 'Lagos Island', price: 3000.00, desc: 'Takes 1-2 working days' },
    { id: 'south-west-3', label: 'South West (Ondo, Benin)', price: 4000.00, desc: 'Takes 2-3 working days' },
    { id: 'south-east', label: 'South East (Anambra, Enugu, Ebonyi, Imo)', price: 4250.00, desc: 'Takes 3-4 working days' },
    { id: 'north-central', label: 'North Central (Jos, FCT, Kogi, Kwara, Nasarawa, Niger, Plateau)', price: 4500.00, desc: 'Takes 3-4 working days' },
    { id: 'north-east', label: 'North East (Adamawa, Bauchi, Borno, Gombe, Taraba, Yobe)', price: 4750.00, desc: 'Takes 3-4 working days' },
    { id: 'north-west', label: 'North West (Kaduna, Kano, Katsina, Kebbi, Sokoto, Jigawa, Zamfara)', price: 5000.00, desc: 'Takes 3-4 working days' }
  ];

  const TAX_RATE = 0.075; // 7.5% VAT

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDeliveryMethodChange = (method: 'ship' | 'pickup') => {
    setDeliveryMethod(method);
  };

  const calculateTotal = (): number => {
    const subtotal = cart.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
    const shipping = deliveryMethod === 'ship' ? (shippingMethods.find(method => method.id === formData.shippingMethod)?.price || 0) : 0;
    const tax = subtotal * TAX_RATE;
    return subtotal + shipping + tax;
  };

  const calculateTax = (): number => {
    const subtotal = cart.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
    return subtotal * TAX_RATE;
  };

  const totalAmount = calculateTotal();

  const componentProps = {
    email: user?.email || "user@example.com", // Replace with user's actual email if authenticated
    amount: totalAmount * 100, // Convert to kobo
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      console.log("Payment successful, triggering order save...");
      onSuccess(); // Call the actual onSuccess function for order handling
    },
    onClose: () => alert("Payment closed"),
  };

  const isAuthenticated = Boolean(user); // Check if user is authenticated

  return (
    
    <div className="max-w-6xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        {/* Delivery Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Delivery</h2>
          <div className="flex space-x-4">
            <button
              className={`p-4 border ${deliveryMethod === 'ship' ? 'border-black' : 'border-gray-300'}`}
              onClick={() => handleDeliveryMethodChange('ship')}
            >
              Ship
            </button>
            <button
              className={`p-4 border ${deliveryMethod === 'pickup' ? 'border-black' : 'border-gray-300'}`}
              onClick={() => handleDeliveryMethodChange('pickup')}
            >
              Pickup in store
            </button>
          </div>
          {deliveryMethod === 'pickup' && (
            <section className="mt-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                    required
                    placeholder="required"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                    required
                     placeholder="required"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border p-2"
                   placeholder="required"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm mb-1">Apartment, suite, etc. (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full border p-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                     placeholder="required"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                     placeholder="required"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border p-2"
                   placeholder="required"
                />
              </div>
            </section>
          )}
        </section>
  
        {/* Shipping Method and Payment Section */}
        {deliveryMethod === 'ship' && (
          <>
            {/* Address Section */}
            <section className="mt-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                     placeholder="required"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                    placeholder="required"                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border p-2"
                   placeholder="required"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm mb-1">Apartment, suite, etc. (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full border p-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                     placeholder="required"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                     placeholder="required"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border p-2"
                   placeholder="required"
                />
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-xl font-bold mb-4">Shipping method</h2>
              <div className="space-y-4">
                {shippingMethods.map((method) => (
                  <label key={method.id} className="flex items-center p-4 border cursor-pointer">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={formData.shippingMethod === method.id}
                      onChange={handleInputChange}
                      className="mr-4"
                      required
                    />
                    <div className="flex-1">
                      <div className="font-medium">{method.label}</div>
                      <div className="text-sm text-gray-500">{method.desc}</div>
                    </div>
                    <div className="font-bold">₦{method.price.toLocaleString()}</div>
                  </label>
                ))}
              </div>
            </section>
          </>
        )}
  
        {/* Payment Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <div className="border p-4">
            {isAuthenticated ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  After clicking "Pay Now", you will be redirected to complete your purchase securely.
                </p>
                <PaystackButton {...componentProps} className="w-full bg-black text-white py-4 font-bold" />
              </>
            ) : (
              <p className="text-sm text-gray-600">
                You must be logged in to complete the payment.{" "}
                <a href="/login" className="text-blue-500 underline">Log in</a>
              </p>
            )}
          </div>
        </section>
      </div>
  
      {/* Order Summary */}
      <div className="lg:pl-8">
        <div className="bg-gray-50 p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.items.map((item: CartItem) => (
              <div key={item.id} className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₦{cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>
                {deliveryMethod === 'ship'
                  ? `₦${(shippingMethods.find(method => method.id === formData.shippingMethod)?.price || 0).toLocaleString()}`
                  : '₦0.00'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>₦{calculateTax().toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CheckoutForm;
