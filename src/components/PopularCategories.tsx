import { Link } from "react-router-dom";

const popularCategories = [
  { 
    name: 'T-shirts', 
    imageUrl: 'https://garmisland.com/cdn/shop/collections/89F9E85E-2BF3-47CA-9C5A-379B66F64EED.webp?v=1714559702&width=720',
    link: '/tshirts'
  },
  { 
    name: 'Bottoms', 
    imageUrl: 'https://garmisland.com/cdn/shop/collections/FF934FF0-39E4-4C8E-B013-3B1A6D6AB01F.jpg?v=1714560447&width=720',
    link: '/bottoms'
  },
  { 
    name: 'Footwear', 
    imageUrl: 'https://garmisland.com/cdn/shop/collections/18EE115C-4C26-4671-BB0C-E5EC691F7888.jpg?v=1714560058&width=720',
    link: '/footwear'
  },
  { 
    name: 'Accessories', 
    imageUrl: 'https://garmisland.com/cdn/shop/collections/4AE214A3-4F00-4E89-A41A-BD94786C0ABC.jpg?v=1714560219&width=720',
    link: '/accesories'
  },
  { 
    name: 'Women', 
    imageUrl: 'https://garmisland.com/cdn/shop/collections/2FCCAA7B-3DD8-43CD-AA08-1767A214F9F8.jpg?v=1714560633&width=720',
    link: '/women'
  },
];

const PopularCategories = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Popular categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {popularCategories.map((category) => (
          <div key={category.name} className="flex flex-col items-center text-center">
            <div className="relative bg-gray-100 aspect-square w-full max-w-xs rounded-lg overflow-hidden group">
              <Link to={category.link} className="block w-full h-full">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay and text on hover */}
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                </div>
              </Link>
            </div>
            <Link to={category.link} className="text-lg font-medium mt-4 hover:underline">
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;