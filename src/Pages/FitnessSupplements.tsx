import { useState, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebaseConfig"; // Ensure correct Firebase configuration
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Collection from '@/components/Collection';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

type PriceFilter = ((price: number) => boolean) | "asc" | "desc";

const FitnessSupplement = () => {
  const priceFilters = useMemo(() => ({
    "All": () => true,
    "Under ₦5,000": (price: number) => price < 5000,
    "₦5,000 - ₦10,000": (price: number) => price >= 5000 && price <= 10000,
    "₦10,000 - ₦20,000": (price: number) => price > 10000 && price <= 20000,
    "Over ₦20,000": (price: number) => price > 20000,
    "Price: Low to High": "asc",
    "Price: High to Low": "desc"
  } as Record<string, PriceFilter>), []);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  const category = "fitness";
  useEffect(() => {
    const db = getDatabase(app);
    const fitnessRef = ref(db, "fitness"); // Adjust path if needed

    onValue(fitnessRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productArray: Product[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productArray);
        setFilteredProducts(productArray); // Set initially without filter
      }
    });
  }, []);

  useEffect(() => {
    const filter = priceFilters[currentFilter];
    const filtered = [...products];
    
    if (filter === "asc") {
      setFilteredProducts(filtered.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g,"")) - parseFloat(b.price.replace(/[^0-9.-]+/g,""))));
    } else if (filter === "desc") {
      setFilteredProducts(filtered.sort((a, b) => parseFloat(b.price.replace(/[^0-9.-]+/g,"")) - parseFloat(a.price.replace(/[^0-9.-]+/g,""))));
    } else if (typeof filter === "function") {
      setFilteredProducts(filtered.filter(product => filter(parseFloat(product.price.replace(/[^0-9.-]+/g,"")))));
    } else {
      setFilteredProducts(products);
    }
  }, [currentFilter, products, priceFilters]);

  const handlePriceFilter = (filterKey: string) => {
    setCurrentFilter(filterKey);
  };

  return (
    <div>
      {/* Background Section */}
      <div
        className="relative h-64 flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.4l5TJ1GC_fh3BMwMXpYa2QHaFP%26pid%3DApi&f=1&ipt=bcb6e501bb7a6ef90b6339b7fc9a945912315ee594968420ab7f71c408bfd80c&ipo=images)" }}
      >
      </div>

      <div className="max-w-7xl mx-auto p-4 flex">
        {/* Sidebar Filter Section */}
        <div className="w-1/4 pr-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-4 py-2 border rounded-md w-full">
              {currentFilter}
              <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {Object.keys(priceFilters).map((filterKey) => (
                <DropdownMenuItem
                  key={filterKey}
                  onClick={() => handlePriceFilter(filterKey)}
                  className="cursor-pointer"
                >
                  {filterKey}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Product Grid Section */}
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-700">{filteredProducts.length} products</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
             <Link to={`/${category}/${product.id}`} className="block relative">
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-square mb-2 bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <span className="text-sm font-medium">{product.price}</span>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Collection />
    </div>
  );
};

export default FitnessSupplement;



