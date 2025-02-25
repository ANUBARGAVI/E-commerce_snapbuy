"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function OrderPage() {
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    const storedConfirmedOrders = localStorage.getItem("confirmedOrders");

    let newConfirmedOrders = storedConfirmedOrders ? JSON.parse(storedConfirmedOrders) : [];

    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      if (parsedOrder.length > 0) {
        newConfirmedOrders = [...newConfirmedOrders, ...parsedOrder];
        setShowModal(true);
        localStorage.removeItem("order");
      }
    }

    setConfirmedOrders(newConfirmedOrders);
    localStorage.setItem("confirmedOrders", JSON.stringify(newConfirmedOrders));
  }, []);

  return (
    <div className="container mx-auto p-6">
      {confirmedOrders.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4"> Your Orders, Your Happiness!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {confirmedOrders.map((product, index) => (
              <div
                key={index}
                className="border p-4 rounded-md shadow-md text-center"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="rounded-md mx-auto"
                />
                <h3 className="text-lg font-bold mt-2">{product.title}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-xl">No items in your order.</p>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Order Confirmed ✅</h2>
            <p className="text-gray-600">Your order has been placed successfully!</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
