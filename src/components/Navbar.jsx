
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/tetelestailogo1.PNG";

function Navbar({ title, links = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/40 bg-[#f8f3e9e6] backdrop-blur-md">
      <div className="section-shell flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Tetelestai Renovations logo"
            loading="lazy"
            className="h-10 w-auto md:h-12"
          />
          <a href="#" className="text-base font-semibold tracking-wide md:text-lg">
            {title}
          </a>
        </div>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="inline-block text-sm font-medium text-slate-700 transition hover:text-black"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-[#e3bf7b] px-4 py-2 text-sm font-semibold text-[#1b1b1b] transition hover:bg-[#d3ac61] md:inline-flex"
        >
          Get Free Estimate
        </a>

        <button
          className="md:hidden p-2 rounded hover:bg-black/10 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open main menu"
          aria-expanded={open}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="section-shell pb-4 md:hidden">
          <ul className="flex flex-col gap-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-black/10 transition"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="mt-1 block rounded-lg bg-[#e3bf7b] px-3 py-2 text-sm font-semibold text-[#1b1b1b] transition hover:bg-[#d3ac61]"
                onClick={() => setOpen(false)}
              >
                Get Free Estimate
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

