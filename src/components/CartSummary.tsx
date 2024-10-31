import { useState, ChangeEvent } from 'react';
import { useCart } from "../components/CartContext";

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

const CheckoutForm = () => {
  const { cart } = useCart();
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
              <div className="mt-4 border p-4">
                <h3 className="font-bold mb-2">Store locations</h3>
                <p className="text-sm text-gray-500 mb-2">There is 1 store with stock close to your location</p>
                <div className="p-4 border">
                  <p className="font-medium">Garm Island Store (13.1 km)</p>
                  <p className="text-sm text-gray-500">Nduka Osadebay Street, 7, Lagos LA</p>
                  <p className="font-bold text-green-500 mt-1">FREE - Usually ready in 2 hours</p>
                </div>
              </div>
            )}
          </section>

          {/* Shipping Method Section */}
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
            <section>
            <h2 className="text-xl font-bold mb-4">Payment</h2>
            <div className="border p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img src="/api/placeholder/32/20" alt="Mastercard" className="h-5" />
                  <img src="/api/placeholder/32/20" alt="Visa" className="h-5" />
                  <img src="/api/placeholder/32/20" alt="Paypal" className="h-5" />
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-4">
                  After clicking "Pay now", you will be redirected to complete your purchase securely.
                </p>
              </div>
            </div>
              <button className="w-full bg-black text-white py-4 font-bold">
            Pay now
          </button>
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
                <span>Subtotal</span>
                <span className="font-bold">
                  ₦{cart.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold">
                  ₦{(shippingMethods.find(method => method.id === formData.shippingMethod)?.price || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (7.5%)</span>
                <span className="font-bold">
                  ₦{calculateTax().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <span className="font-bold">Total</span>
                <span className="font-bold">₦{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;