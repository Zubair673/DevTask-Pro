import logo from "../../assets/logo.png"; // Apna sahi path check kar lein
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="DevTask Logo" className="w-11 h-11 object-contain" />
          <div>
            <h1 className="text-2xl font-bold text-blue-600">DevTask</h1>
            <p className="text-xs text-gray-500 -mt-1">Task Management</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">Register</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-blue-600 focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-in slide-in-from-top-4">
          <div className="flex flex-col px-6 py-4 space-y-5">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition">Features</a>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition">Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;