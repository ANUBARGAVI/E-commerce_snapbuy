
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSelectedProducts(selectedProducts.filter((id) => id !== productId));
  };

  const toggleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const placeOrder = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to place an order.");
      return;
    }

    const orderedProducts = cart.filter((item) => selectedProducts.includes(item.id));
    const remainingCart = cart.filter((item) => !selectedProducts.includes(item.id));

    localStorage.setItem("order", JSON.stringify(orderedProducts));
    localStorage.setItem("cart", JSON.stringify(remainingCart));

    setCart(remainingCart);
    setSelectedProducts([]);

    router.push("/order");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-xl">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cart.map((product) => (
            <div key={product.id} className="border p-4 rounded-md shadow-md text-center relative">
              <button
                onClick={() => removeFromCart(product.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-2xl"
              >
                ❌
              </button>

              <Image src={product.image} alt={product.title} width={150} height={150} className="rounded-md mx-auto" />
              <h3 className="text-lg font-bold mt-2">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>

              <div className="flex items-center justify-center mt-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelectProduct(product.id)}
                  className="mr-2 w-5 h-5"
                />
                <label>Select for Order</label>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <button
          onClick={placeOrder}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 text-lg"
        >
          Place Order
        </button>
      )}
    </div>
  );
}
