import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useCart } from "../components/CartContext";

const CartIcon = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const calculateSubtotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <DropdownMenu open={cartOpen} onOpenChange={setCartOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className='relative hover:text-gray-300'
          onClick={() => setCartOpen(!cartOpen)}
        >
          {cartOpen ? "❌" : "🛒"} {/* Toggle icon based on cartOpen state */}
          {!cartOpen && (
            <span className='absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1'>
              {cart.items.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white text-black w-80 p-4 shadow-lg'>
        {/* Cart items container with max-height and scroll */}
        <div className='max-h-64 overflow-y-auto'>
          {cart.items.map((item) => (
            <DropdownMenuItem key={item.id} className='flex space-x-4 mb-4'>
              <img src={item.image} alt={item.name} className='w-16 h-16' />
              <div className='flex-1'>
                <p className='font-bold text-sm'>{item.name}</p>
                <p className='text-xs'>Size: {item.size}</p>
                <div className='flex items-center mt-2 space-x-2'>
                  <button
                    className='px-2 bg-gray-200'
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the dropdown from closing
                      decreaseQuantity(item.id);
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className='px-2 bg-gray-200'
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the dropdown from closing
                      increaseQuantity(item.id);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <p className='font-bold text-sm'>
                  ₦{item.price.toLocaleString()}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id); // Pass composite ID for deletion
                  }}
                  className='text-red-500 hover:text-red-700'
                >
                  Delete
                </button>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        {/* Subtotal and checkout section */}
        <div className='border-t border-gray-300 pt-4'>
          <div className='flex justify-between text-sm font-bold'>
            <span>Subtotal</span>
            <span>₦{calculateSubtotal().toLocaleString()}</span>
          </div>
          <button className='w-full mt-4 py-2 bg-black text-white font-bold'>
            Check out
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartIcon;
