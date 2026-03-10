import { useEffect, useMemo, useState } from "react";
import { FiPhone, FiMessageSquare } from "react-icons/fi";
import { buildSmsHref } from "../utils/leadAttribution";
import { trackLeadEvent } from "../utils/leadTracking";

const SHOW_AFTER_SCROLL_PX = 420;

export default function DesktopLeadRail() {
  const [isVisible, setIsVisible] = useState(false);

  const smsHref = useMemo(
    () =>
      buildSmsHref({
        includeAttribution: true,
      }),
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_SCROLL_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed right-5 bottom-5 z-[55] hidden transition-all duration-300 md:block ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="pointer-events-auto rounded-2xl border border-white/55 bg-[#0f1720f2] p-2 shadow-[0_20px_50px_rgba(10,12,20,0.35)] backdrop-blur">
        <div className="grid grid-cols-1 gap-2">
          <a
            href="tel:+19408897215"
            onClick={() =>
              trackLeadEvent("call_click", { placement: "desktop_sticky_rail" })
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e3bf7b] px-4 py-2.5 text-sm font-semibold text-[#1b1b1b]"
            aria-label="Call Tetelestai now"
          >
            <FiPhone size={16} />
            Call Now
          </a>
          <a
            href={smsHref}
            onClick={() =>
              trackLeadEvent("sms_click", { placement: "desktop_sticky_rail" })
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e3bf7b] px-4 py-2.5 text-sm font-semibold text-[#1b1b1b]"
            aria-label="Text Tetelestai for a free estimate"
          >
            <FiMessageSquare size={16} />
            Text for Estimate
          </a>
        </div>
      </div>
    </div>
  );
}
