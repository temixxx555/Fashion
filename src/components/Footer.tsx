const Footer = () => {
    return (
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Menu Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li><a href="/search" className="hover:underline">Search</a></li>
              <li><a href="/size-guide" className="hover:underline">Size guide</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/terms" className="hover:underline">Terms Of Service</a></li>
              <li><a href="/shipping" className="hover:underline">Shipping Policy</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/return" className="hover:underline">Return Policy</a></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-bold mb-4">Get in touch</h4>
            <p className="mb-2">
              📞 <a href="tel:+2348148331000" className="hover:underline">+2348148331000</a>
            </p>
            <p>
              ✉️ <a href="mailto:info@garmisland.com" className="hover:underline">Email us</a>
            </p>
          </div>
  
          {/* Social Media Icons */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">🐦</a>
              <a href="#" className="hover:text-gray-300">📷</a>
              <a href="#" className="hover:text-gray-300">🎵</a>
            </div>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p>Powered by Shopify</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  