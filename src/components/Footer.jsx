import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok } from "react-icons/fa6";
import Logo from "../assets/tetelestailogo1.PNG"; // adjust path

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
  <div className="mx-auto max-w-[1900px] px-10 py-10">
    
    {/* Top row */}
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
      
      {/* LEFT: logo */}
      <div className="flex-shrink-0">
        <img
          src={Logo}
          alt="Tetelestai Renovations"
          className="w-[320px] max-w-full opacity-95"
        />
      </div>

      {/* MIDDLE: contact */}
      <div className="text-sm leading-6 text-white/90 lg:pt-2">
        <div>940-889-7215</div>
        <div>918-706-4419</div>
        <div className="mt-1">Tetelestai.business@gmail.com</div>

        <div className="mt-4">
          <div>2703 Sherrill Park Dr,</div>
          <div>Richardson, TX 75082</div>
        </div>

        {/* Social icons */}
        <div className="mt-6 flex items-center gap-3">
          <FaFacebookF className="opacity-70 hover:opacity-100 transition" />
          <FaInstagram className="opacity-70 hover:opacity-100 transition" />
          <FaXTwitter className="opacity-70 hover:opacity-100 transition" />
          <FaTiktok className="opacity-70 hover:opacity-100 transition" />
        </div>
      </div>

      {/* RIGHT: policy links */}
      <div className="text-sm leading-7 text-white/90 lg:pt-2">
        <a href="/privacy" className="block hover:text-white transition">
          Privacy Policy
        </a>
        <a href="/accessibility" className="block hover:text-white transition">
          Accessibility Statement
        </a>
        <a href="/terms" className="block hover:text-white transition">
          Terms &amp; Conditions
        </a>
      </div>
    </div>

    {/* Bottom row */}
    <div className="mt-12 flex justify-end">
      <p className="text-xs text-white/60">
        © 2021 by Tetelestai Renovations. 
      </p>
    </div>

  </div>
</footer>

  );
}
