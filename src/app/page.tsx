
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const allCategories = ["All", ...new Set(data.map((item) => item.category))];
        setCategories(allCategories);
      })
      .catch((err) => console.error("Error fetching products:", err));

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);


  const addToCart = (product) => {
    const existingCart = [...cart];
    const existingItemIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    setCart(existingCart);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="relative bg-black p-6 sm:p-10 md:p-14 rounded-lg shadow-lg mb-8 text-center mt-16">
        <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-white">
          Welcome to SnapBuy
        </h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-lg md:text-xl text-gray-300">
          Discover our latest products and shop your favorites today!
        </p>

    
        <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6 gap-4">
          <select
            className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm w-full max-w-xs sm:max-w-md lg:max-w-2xl">
            <input
              type="text"
              className="w-full px-4 py-2 text-gray-800 bg-transparent focus:outline-none placeholder-gray-500"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-xl shadow-lg text-center bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
            >
              
              <div className="h-[200px] flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="rounded-md object-contain"
                />
              </div>

          
              <div className="flex flex-col flex-grow">
                <h3 className="text-md font-bold mt-2 text-gray-900 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-800 text-lg font-semibold">${product.price}</p>
              </div>

    
              <div className="mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-black transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No products found.
          </p>
        )}
      </div>
      {showModal && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg text-lg transition-opacity duration-500">
          ✅ Product added to cart!
        </div>
      )}
    </div>
  );
}
