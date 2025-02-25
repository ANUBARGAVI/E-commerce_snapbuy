"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        const filtered = data.filter((product) => 
          product.category.toLowerCase() === category.toLowerCase()
        );

        setFilteredProducts(filtered);
        setIsNotFound(filtered.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsNotFound(true);
      });
  }, [category]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
        {category} Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isNotFound ? (
          <div className="col-span-4 text-center text-red-500 font-semibold">
            No products found in this category.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-5 rounded-lg shadow-md text-center bg-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={150}
                className="rounded-md mx-auto"
              />
              <h3 className="text-lg font-bold mt-3">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
