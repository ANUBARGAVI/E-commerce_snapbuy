"use client";

import { useState } from "react";

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-6 pt-24">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-8 transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-6 text-base">
          Have questions or need assistance? We're here to help!
        </p>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
          <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full shadow-sm text-base"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full shadow-sm text-base"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full h-24 shadow-sm text-base"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold text-base hover:opacity-90 transition transform hover:scale-105"
            >
              Send Message
            </button>
          </form>

        
          <div className="flex flex-col space-y-4 text-base">
            <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-md">
              <span className="text-blue-600 text-xl">📍</span>
              <p className="text-gray-700">1234 Snap St, City, Country</p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-md">
              <span className="text-blue-600 text-xl">📞</span>
              <p className="text-gray-700">+123 456 7890</p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-md">
              <span className="text-blue-600 text-xl">✉️</span>
              <p className="text-gray-700">support@snapbuy.com</p>
            </div>
          </div>
        </div>
      </div>

    
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-600">We will get back to you soon.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
