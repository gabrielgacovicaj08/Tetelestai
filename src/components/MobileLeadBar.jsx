import { useMemo } from "react";
import { FiPhone, FiMessageSquare } from "react-icons/fi";
import { buildSmsHref } from "../utils/leadAttribution";
import { trackLeadEvent } from "../utils/leadTracking";

export default function MobileLeadBar() {
  const smsHref = useMemo(
    () =>
      buildSmsHref({
        includeAttribution: true,
      }),
    [],
  );
  return (
    <div className="fixed right-0 bottom-0 left-0 z-[60] border-t border-white/40 bg-[#0f1720f2] px-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
        <a
          href="tel:+19408897215"
          onClick={() => trackLeadEvent("call_click", { placement: "mobile_sticky_bar" })}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e3bf7b] px-4 py-3 text-sm font-semibold text-[#1b1b1b]"
          aria-label="Call Tetelestai now"
        >
          <FiPhone size={16} />
          Call Now
        </a>
        <a
          href={smsHref}
          onClick={() => trackLeadEvent("sms_click", { placement: "mobile_sticky_bar" })}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/8 px-4 py-3 text-sm font-semibold text-white"
          aria-label="Text Tetelestai for a free estimate"
        >
          <FiMessageSquare size={16} />
          Text Us
        </a>
      </div>
    </div>
  );
}
