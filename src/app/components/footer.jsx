import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaShoppingCart, FaHome, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-12 rounded-t-lg shadow-lg">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">SnapBuy</h2>
        <p className="text-sm sm:text-base opacity-90 mt-2">Your one-stop shop for the best products online.</p>

        
        <div className="mt-5 flex flex-wrap justify-center gap-6 text-sm sm:text-base">
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <FaHome /> Home
          </Link>
          <Link href="/contact" className="flex items-center gap-2 hover:underline">
            <FaEnvelope /> Contact
          </Link>
          <Link href="/cart" className="flex items-center gap-2 hover:underline">
            <FaShoppingCart /> Cart
          </Link>
        </div>

        
        <div className="mt-6 flex justify-center space-x-6 text-xl">
          <Link href="#" className="hover:text-blue-400 transition-all duration-300">
            <FaFacebookF />
          </Link>
          <Link href="#" className="hover:text-blue-300 transition-all duration-300">
            <FaTwitter />
          </Link>
          <Link href="#" className="hover:text-pink-400 transition-all duration-300">
            <FaInstagram />
          </Link>
        </div>


        <p className="mt-8 text-xs opacity-80">© {new Date().getFullYear()} SnapBuy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
