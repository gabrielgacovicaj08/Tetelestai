import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";
import Logo from "../assets/tetelestailogo1.PNG";

export default function Footer() {
  return (
    <footer className="mt-10 w-full bg-[#0f1720] text-white">
      <div className="section-shell py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img
              src={Logo}
              alt="Tetelestai Renovations"
              loading="lazy"
              className="w-[280px] max-w-full opacity-95"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Full-service renovation and custom home improvement for homeowners
              across Dallas and nearby communities.
            </p>
          </div>

          <div className="text-sm leading-7 text-white/90">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d5b073]">
              Contact
            </h3>
            <a href="tel:+19408897215" className="mt-3 block hover:text-white">
              940-889-7215
            </a>
            <a href="tel:+19187064419" className="block hover:text-white">
              918-706-4419
            </a>
            <a
              href="mailto:Tetelestai.business@gmail.com"
              className="block hover:text-white"
            >
              Tetelestai.business@gmail.com
            </a>
            <div className="mt-4 text-white/75">
              <p>2703 Sherrill Park Dr</p>
              <p>Richardson, TX 75082</p>
            </div>
          </div>

          <div className="text-sm leading-7 text-white/90">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d5b073]">
              Company
            </h3>
            <a href="/privacy" className="mt-3 block hover:text-white">
              Privacy Policy
            </a>
            <a href="/accessibility" className="block hover:text-white">
              Accessibility Statement
            </a>
            <a href="/terms" className="block hover:text-white">
              Terms and Conditions
            </a>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-white/20 p-2 transition hover:border-white/50 hover:bg-white/10"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://www.instagram.com/tetelestai.renovationz/"
                aria-label="Instagram"
                className="rounded-full border border-white/20 p-2 transition hover:border-white/50 hover:bg-white/10"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                aria-label="X"
                className="rounded-full border border-white/20 p-2 transition hover:border-white/50 hover:bg-white/10"
              >
                <FaXTwitter size={14} />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="rounded-full border border-white/20 p-2 transition hover:border-white/50 hover:bg-white/10"
              >
                <FaTiktok size={14} />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/15 pt-5 text-xs text-white/60">
          Copyright 2021 Tetelestai Renovations. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
