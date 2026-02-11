// src/Components/Footer.jsx
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-white">

        {/* LOGO / BRAND */}
        <div className="flex items-center justify-center h-full">
          <NavLink to="/" className="hover:text-red-400">
            <img
              src={logo}
              alt="MovieNest Logo"
              className="h-20 w-auto object-contain"
            />
          </NavLink>
        </div>

        {/* COPYRIGHT */}
       <p className="
  mt-4 text-sm text-gray-400
  flex items-center justify-center gap-1
  tracking-wide
">
  <FaRegCopyright className="text-xs opacity-80" />
  <span>
    2025 · Created by 
     
        <span
    className="
      ml-1
      text-red-500
      font-semibold
      tracking-wide
      drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]
    "
  >
    pG-23
  </span>

  </span>
</p>

        {/* 🔐 DISCLAIMER (IMPORTANT) */}
        <div className="mt-6 max-w-3xl mx-auto text-xs text-gray-400 leading-relaxed">
          <p>
            <span className="font-semibold text-gray-300">Disclaimer:</span>{" "}
            MoviesNest does not host, store, or upload any media files on its own
            servers. All content provided on this website is for informational
            and promotional purposes only. Any external links redirect to
            third-party websites, and MoviesNest is not responsible for the
            content hosted on those external sites.
          </p>
        </div>

        {/* FOOTER LINKS */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <a href="/contact" className="hover:text-yellow-400 transition">
            Contact Us
          </a>
          <span className="text-gray-500">|</span>

          <a href="/request" className="hover:text-yellow-400 transition">
            Request Us
          </a>
          <span className="text-gray-500">|</span>

          <a href="/dmca" className="hover:text-yellow-400 transition">
            DMCA
          </a>
          <span className="text-gray-500">|</span>

          <a href="/about" className="hover:text-yellow-400 transition">
            About Us
          </a>
          <span className="text-gray-500">|</span>

          <a href="/sitemap" className="hover:text-yellow-400 transition">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
