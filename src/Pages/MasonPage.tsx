import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebaseConfig';
import Collection from '@/components/Collection';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  sizes?: string[];
  stock?: number;
};

const CollectionsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState('M');
  const { id } = useParams(); // Get the product ID from URL

  useEffect(() => {
    const db = getDatabase(app);
    const productRef = ref(db, `Mason/${id}`);

    onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProduct({
          id: id as string,
          ...data
        });
      }
    });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          {/* Left Column - Image */}
          <div className="bg-gray-50 p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full h-auto object-contain"
            />
          </div>

          {/* Right Column - Product Details */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Size Selection */}
            <div>
              <h2 className="text-lg mb-2">Size</h2>
              <div className="flex gap-2">
                {['M', 'L', 'XL', '2XL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-12 h-12 border ${
                      size === s 
                        ? 'border-black' 
                        : 'border-gray-200'
                    } flex items-center justify-center`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold">{product.price}</div>

            {/* Features */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Carbon neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure payments</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span>Low stock - {product.stock || 4} items left</span>
            </div>

            {/* Shipping Notice */}
            <p className="text-gray-600">
              <span className="underline">Shipping</span> calculated at checkout.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-white border border-black py-3 px-4 hover:bg-gray-50">
                Add to cart
              </button>
              <button className="w-full bg-black text-white py-3 px-4 hover:bg-gray-900">
                Buy it now
              </button>
            </div>

            {/* Pickup Information */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Pickup available at <strong>Garm Island Store</strong></span>
              </div>
              <p className="mt-1 text-gray-600">Usually ready in 2 hours</p>
              <button className="mt-2 text-gray-600 underline">
                Check availability at other stores
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Collection />
    
    <div className="flex flex-col items-center mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
  <Link
    to="/"
    className="inline-block bg-black text-white px-6 py-3 mb-6 hover:bg-gray-800 transition-colors text-center"
  >
    ← Back to Garm Island Collection
  </Link>
</div>

    
    </>
  );
};

export default CollectionsPage;