import { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebaseConfig"; // Ensure correct Firebase configuration
import { Link } from "react-router-dom";

// Define a TypeScript type for the product
type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  link: string;
};

const MaisonCollect = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const db = getDatabase(app);
    const productsRef = ref(db, "Mason"); // Adjust path if needed

    // Fetch data and update the state
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productArray: Product[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productArray);
      }
    });
  }, []);

  return (
    <div className='container mx-auto py-12'>
      <h2 className='text-3xl font-bold mb-8'>Explore our Maison De Vetemets Collection</h2>
      <div className='overflow-x-auto'>
        <div className='flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-6 whitespace-nowrap md:whitespace-normal'>
          {products.map((product) => (
            <div
              key={product.id}
              className='relative group text-center inline-block w-64 md:w-full'
            >
              {/* Hoverable Product Image */}
              <Link
                to={`/Mason/${product.id}`}
                className='block relative'
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"'
                />
                {/* Hover icons */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='flex space-x-4'>
                    <Link
                      to={product.link}
                      className='text-black bg-white p-3 rounded-full hover:bg-gray-100'
                    >
                      <FaSearch />
                    </Link>
                    <Link
                      to={product.link}
                      className='text-black bg-white p-3 rounded-full hover:bg-gray-100'
                    >
                      <FaPlus />
                    </Link>
                  </div>
                </div>
              </Link>
              {/* Product Details */}
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-xl font-bold'>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaisonCollect;
