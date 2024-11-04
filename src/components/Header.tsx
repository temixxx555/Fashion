import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CartIcon from "./CartIcon";
import { Link } from "react-router-dom";

const Header = () => {
  // State to manage the dropdown visibility
  const [shopOpen, setShopOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  const handleMouseEnterShop = () => {
    setShopOpen(true);
  };

  const handleMouseLeaveShop = () => {
    setShopOpen(false);
  };

  const handleMouseEnterBrands = () => {
    setBrandsOpen(true);
  };

  const handleMouseLeaveBrands = () => {
    setBrandsOpen(false);
  };

  return (
    <header className='bg-black text-white'>
      {/* Welcome bar */}
      <div className='text-left py-2 bg-black'>
        <p className='text-sm'>Welcome to Garm Island</p>
      </div>

      {/* Logo and navigation */}
      <div className='bg-transparent py-4'>
        <div className='container mx-auto flex justify-between items-center'>
          {/* Logo */}
          <div className='text-3xl font-bold'>GARM ISLAND</div>

          {/* Navigation */}
          <nav className='hidden md:flex space-x-8'>
            <a href='/' className='hover:text-gray-300'>
              HOME
            </a>

            {/* Dropdown for Shop */}
            <DropdownMenu open={shopOpen} onOpenChange={setShopOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className='hover:text-gray-300 flex items-center'
                  onMouseEnter={handleMouseEnterShop}
                  onMouseLeave={handleMouseLeaveShop}
                >
                  SHOP
                  <svg
                    className='ml-1 w-4 h-4'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M5.25 6.5L10 11.25L14.75 6.5H5.25Z' />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='bg-white text-black mt-2 w-auto shadow-lg p-6 grid grid-cols-4 gap-8'
                onMouseEnter={handleMouseEnterShop}
                onMouseLeave={handleMouseLeaveShop}
              >
                {/* Garm Island Collection */}
                <div>
                  <h4 className='font-bold text-lg mb-4'>
                    Garm Island Collection
                  </h4>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/garm-island-collection'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Option 1
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/garm-woman'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Garm Woman
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/formal-collection'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Formal Collection
                    </a>
                  </DropdownMenuItem>
                </div>

                {/* Tops */}
                <div>
                  <h4 className='font-bold text-lg mb-4'>Tops</h4>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/tshirts'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      T-shirts
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/shirts'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Shirts
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/polo-shirts'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Polo Shirts
                    </a>
                  </DropdownMenuItem>
                </div>

                {/* Bottoms */}
                <div>
                  <h4 className='font-bold text-lg mb-4'>Bottoms</h4>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/bottoms'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Jeans
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/shorts'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Shorts
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/trousers'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Trousers
                    </a>
                  </DropdownMenuItem>
                </div>

                {/* Accessories */}
                <div>
                  <h4 className='font-bold text-lg mb-4'>Accessories</h4>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/headwear'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Headwear
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href='/shop/gift-items'
                      className='hover:bg-gray-200 px-4 py-2 block'
                    >
                      Gift Items
                    </a>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dropdown for Brands */}
            <DropdownMenu open={brandsOpen} onOpenChange={setBrandsOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className='hover:text-gray-300 flex items-center'
                  onMouseEnter={handleMouseEnterBrands}
                  onMouseLeave={handleMouseLeaveBrands}
                >
                  BRANDS
                  <svg
                    className='ml-1 w-4 h-4'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M5.25 6.5L10 11.25L14.75 6.5H5.25Z' />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='bg-white text-black mt-2 w-40 shadow-lg'
                onMouseEnter={handleMouseEnterBrands} // Keep dropdown open when hovering over content
                onMouseLeave={handleMouseLeaveBrands} // Close dropdown when leaving content
              >
                <DropdownMenuItem asChild>
                  <a
                    href='/brands/difransel'
                    className='hover:bg-gray-200 px-4 py-2 block'
                  >
                    Difransel
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href='/brands/drmartens'
                    className='hover:bg-gray-200 px-4 py-2 block'
                  >
                    Dr Martens
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href='/brands/essence'
                    className='hover:bg-gray-200 px-4 py-2 block'
                  >
                    Essence of Life
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href='/brands/garmisland'
                    className='hover:bg-gray-200 px-4 py-2 block'
                  >
                    Garm Island
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a href='/matching-sets' className='hover:text-gray-300'>
              MATCHING SETS
            </a>
            <a href='/sale' className='hover:text-gray-300'>
              SALE
            </a>
          </nav>

          {/* Icons */}
          <div className='flex space-x-4'>
           <Link to='/login'>
              👤
           </Link>
           <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
