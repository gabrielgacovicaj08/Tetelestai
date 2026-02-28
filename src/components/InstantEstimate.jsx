import { useMemo, useState } from "react";
import { FiPhone, FiMessageSquare, FiMail } from "react-icons/fi";

const PROJECT_TYPES = [
  "Kitchen remodel",
  "Bathroom remodel",
  "Home addition",
  "Whole-home renovation",
  "New construction",
  "Other",
];

const TIMELINES = [
  "ASAP",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Just exploring",
];

export default function InstantEstimate() {
  const [form, setForm] = useState({
    name: "",
    zip: "",
    projectType: "",
    timeline: "",
  });

  const detailMessage = useMemo(() => {
    const lines = [
      "Hi Tetelestai, I'd like a free estimate.",
      form.name ? `Name: ${form.name}` : null,
      form.zip ? `ZIP Code: ${form.zip}` : null,
      form.projectType ? `Project: ${form.projectType}` : null,
      form.timeline ? `Timeline: ${form.timeline}` : null,
    ].filter(Boolean);

    return encodeURIComponent(lines.join("\n"));
  }, [form]);

  const smsHref = `sms:+19408897215?body=${detailMessage}`;
  const emailHref = `mailto:Tetelestai.business@gmail.com?subject=Free%20Estimate%20Request&body=${detailMessage}`;

  return (
    <section id="contact" className="section-shell -mt-2 pb-6">
      <div className="rounded-3xl border border-white/60 bg-gradient-to-r from-[#1f2a37] via-[#243447] to-[#1f2a37] p-6 text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)] md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e3bf7b]">
              Free Estimate
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight md:text-3xl">
              Talk to a builder in under 5 minutes
            </h2>
            <p className="mt-3 text-sm text-white/80 md:text-base">
              Share a few project details below to send a pre-filled text or
              email. We reply same day for kitchens, bathrooms, additions, and
              full-home renovations.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="tel:+19408897215"
                className="inline-flex items-center gap-2 rounded-full bg-[#e3bf7b] px-5 py-3 text-sm font-semibold text-[#1b1b1b] transition hover:-translate-y-0.5 hover:bg-[#d3ac61]"
              >
                <FiPhone size={16} />
                Call Now
              </a>
              <a
                href="sms:+19408897215?body=Hi%20Tetelestai%2C%20I%27d%20like%20a%20free%20estimate%20for%20my%20project."
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
              >
                <FiMessageSquare size={16} />
                Quick Text
              </a>
            </div>
          </div>

          <form
            className="grid w-full max-w-xl grid-cols-1 gap-3 rounded-2xl border border-white/20 bg-white/6 p-4 md:grid-cols-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="text-xs font-medium text-white/85 md:col-span-1">
              Name
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Your name"
                autoComplete="name"
                className="mt-1 w-full rounded-xl border border-white/20 bg-[#0d141d] px-3 py-2.5 text-sm text-white outline-none ring-[#e3bf7b] transition focus:ring-2"
              />
            </label>

            <label className="text-xs font-medium text-white/85 md:col-span-1">
              ZIP code
              <input
                value={form.zip}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, zip: event.target.value }))
                }
                placeholder="75214"
                inputMode="numeric"
                autoComplete="postal-code"
                className="mt-1 w-full rounded-xl border border-white/20 bg-[#0d141d] px-3 py-2.5 text-sm text-white outline-none ring-[#e3bf7b] transition focus:ring-2"
              />
            </label>

            <label className="text-xs font-medium text-white/85 md:col-span-1">
              Project type
              <select
                value={form.projectType}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    projectType: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-white/20 bg-[#0d141d] px-3 py-2.5 text-sm text-white outline-none ring-[#e3bf7b] transition focus:ring-2"
              >
                <option value="">Select project</option>
                {PROJECT_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-medium text-white/85 md:col-span-1">
              Ideal timeline
              <select
                value={form.timeline}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, timeline: event.target.value }))
                }
                className="mt-1 w-full rounded-xl border border-white/20 bg-[#0d141d] px-3 py-2.5 text-sm text-white outline-none ring-[#e3bf7b] transition focus:ring-2"
              >
                <option value="">Select timeline</option>
                {TIMELINES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-1 flex flex-wrap gap-2 md:col-span-2">
              <a
                href={smsHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#e3bf7b] px-4 py-2.5 text-xs font-semibold text-[#1b1b1b] transition hover:bg-[#d3ac61]"
                aria-label="Send project details by text"
              >
                <FiMessageSquare size={15} />
                Send Details by Text
              </a>
              <a
                href={emailHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-xs font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
                aria-label="Send project details by email"
              >
                <FiMail size={15} />
                Send by Email
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
