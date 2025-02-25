

"use client"
import { useState } from "react";
import Link from "next/link";
import { FiHome, FiShoppingCart, FiClipboard, FiMenu, FiX, FiMail } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold tracking-wide text-gray-900">
          SnapBuy
        </Link>

        
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

    
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4">
          <NavLinks setIsOpen={setIsOpen} />
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ setIsOpen }) => (
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
    <Link href="/" className="flex items-center text-gray-700 font-semibold hover:text-yellow-500 transition-colors duration-300" onClick={() => setIsOpen && setIsOpen(false)}>
      <FiHome className="mr-2" /> Home
    </Link>
    <Link href="/cart" className="flex items-center text-gray-700 font-semibold hover:text-yellow-500 transition-colors duration-300" onClick={() => setIsOpen && setIsOpen(false)}>
      <FiShoppingCart className="mr-2" /> Cart
    </Link>
    <Link href="/order" className="flex items-center text-gray-700 font-semibold hover:text-yellow-500 transition-colors duration-300" onClick={() => setIsOpen && setIsOpen(false)}>
      <FiClipboard className="mr-2" /> Orders
    </Link>
    <Link href="/contact" className="flex items-center text-gray-700 font-semibold hover:text-yellow-500 transition-colors duration-300" onClick={() => setIsOpen && setIsOpen(false)}>
      <FiMail className="mr-2" /> Contact
    </Link>
  </div>
);

export default Navbar;
