import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import logo from "../assets/logo.png";

const Navbar = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

   const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // send text to parent
  };
  return (
    <nav className="bg-black text-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="hover:text-red-400">
          <img
            src={logo}
            alt="MovieNest Logo"
          className="h-20 w-auto object-contain"
          />
        </NavLink>

        {/* <div className="text-2xl font-bold text-red-400">
          Movie <span className="text-white">Nest</span>
        </div> */}

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <NavLink to="/" className="hover:text-red-400">
            Home
          </NavLink>
          <NavLink to="/bollywood" className="hover:text-red-400">
            Bollywood
          </NavLink>
          <NavLink to="/hollywood" className="hover:text-red-400">
            Hollywood
          </NavLink>
          <NavLink to="/dual-audio" className="hover:text-red-400">
             SouthDub
          </NavLink>
          <NavLink to="/telugu" className="hover:text-red-400">
            Telugu
          </NavLink>
          <NavLink to="/animation" className="hover:text-red-400">
            Anime
          </NavLink>
         
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
             value={query}
        onChange={handleSearch}
            className="bg-[#2b2b2b] px-3 py-1 rounded text-sm outline-none"
          />
          <button
          onClick={() => onSearch(query)}
           className="bg-red-400 text-black px-3 py-1 rounded">
            <IoSearch />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaAlignJustify />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/bollywood" onClick={() => setMenuOpen(false)}>
            Bollywood
          </NavLink>
          <NavLink to="/hollywood" onClick={() => setMenuOpen(false)}>
            Hollywood
          </NavLink>
          <NavLink to="/dual-audio" onClick={() => setMenuOpen(false)}>
            SouthDub
          </NavLink>
          <NavLink to="/telugu" onClick={() => setMenuOpen(false)}>
            Telugu
          </NavLink>
          <NavLink to="/animation" onClick={() => setMenuOpen(false)}>
            Anime
          </NavLink>
          

          {/* Mobile Search */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Search..."
              value={query}
        onChange={handleSearch}
              className="bg-black px-3 py-1 rounded text-sm outline-none w-full"
            />
            <button 
             onClick={() => onSearch(query)}
            className="bg-red-400 text-black px-3 py-1 rounded">
              <IoSearch />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
