

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/tetelestailogo1.PNG"; // adjust path

function Navbar({ title, links = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#fafad2] shadow-md z-50">
      <div className="px-6 py-2 flex justify-between items-center">
        {/* LEFT: Logo + Title */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="h-12 md:h-16 w-auto" />
          <a href="/" className="text-lg md:text-xl font-medium">
            {title}
          </a>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex gap-4">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="inline-block px-2 py-2 transition-all duration-300 ease-out hover:scale-110 hover:opacity-80"


              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 rounded hover:bg-black/10 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-2 bg-white/60 backdrop-blur-md rounded-xl p-3 shadow">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="block px-3 py-2 rounded hover:bg-black/10 transition"
                  onClick={() => setOpen(false)} // close after click
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

