import { useEffect, useMemo, useRef, useState } from "react";
import { FiPhone, FiMessageSquare, FiMail, FiCheck, FiAlertCircle } from "react-icons/fi";
import {
  buildPreferredEmailHref,
  buildSmsHref,
  buildWhatsAppHref,
  buildLeadDetailsMessage,
} from "../utils/leadAttribution";
import { trackLeadEvent } from "../utils/leadTracking";

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

const BUDGET_RANGES = [
  "Under $25k",
  "$25k - $50k",
  "$50k - $100k",
  "$100k+",
  "Not sure yet",
];

const LEAD_DRAFT_STORAGE_KEY = "tetelestai_estimate_draft_v1";

const EMPTY_FORM = {
  name: "",
  phone: "",
  zip: "",
  projectType: "",
  timeline: "",
  budget: "",
  notes: "",
};

function readStoredDraft() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(LEAD_DRAFT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return {
      name: parsed?.name || "",
      phone: parsed?.phone || "",
      zip: parsed?.zip || "",
      projectType: parsed?.projectType || "",
      timeline: parsed?.timeline || "",
      budget: parsed?.budget || "",
      notes: parsed?.notes || "",
    };
  } catch {
    return null;
  }
}

function normalizePhone(value) {
  const digits = (value || "").replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function normalizeZip(value) {
  return (value || "").replace(/\D/g, "").slice(0, 5);
}

export default function InstantEstimate() {
  const [form, setForm] = useState(() => readStoredDraft() || EMPTY_FORM);
  const [copied, setCopied] = useState(false);
  const [showValidationHint, setShowValidationHint] = useState(false);
  const hasTrackedCompleteForm = useRef(false);
  const hasTrackedFormStart = useRef(false);
  const trackedMilestones = useRef(new Set());

  const detailFields = useMemo(
    () => ({
      name: form.name,
      phone: form.phone,
      zip: form.zip,
      projectType: form.projectType,
      timeline: form.timeline,
      budget: form.budget,
      notes: form.notes,
      includeAttribution: true,
    }),
    [form],
  );

  const smsHref = useMemo(() => buildSmsHref(detailFields), [detailFields]);
  const emailHref = useMemo(() => buildPreferredEmailHref(detailFields), [detailFields]);
  const whatsAppHref = useMemo(
    () => buildWhatsAppHref(detailFields),
    [detailFields],
  );
  const quickTextHref = useMemo(
    () =>
      buildSmsHref({
        includeAttribution: true,
      }),
    [],
  );

  const leadReadiness = useMemo(() => {
    const hasName = Boolean(form.name.trim());
    const hasProjectType = Boolean(form.projectType.trim());
    const zipDigits = form.zip.replace(/\D/g, "");
    const hasValidZip = zipDigits.length === 5;

    const score = [hasName, hasProjectType, hasValidZip].filter(Boolean).length;

    return {
      hasName,
      hasProjectType,
      hasValidZip,
      canSendDetailedLead: score === 3,
      completionPercent: Math.round((score / 3) * 100),
    };
  }, [form.name, form.projectType, form.zip]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const hasValue = Object.values(form).some((value) => value?.trim());
      if (!hasValue) {
        window.localStorage.removeItem(LEAD_DRAFT_STORAGE_KEY);
        return;
      }

      window.localStorage.setItem(LEAD_DRAFT_STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Ignore storage failures (private mode, storage blocked, etc.)
    }
  }, [form]);

  useEffect(() => {
    if (leadReadiness.canSendDetailedLead && showValidationHint) {
      setShowValidationHint(false);
    }

    if (leadReadiness.canSendDetailedLead && !hasTrackedCompleteForm.current) {
      trackLeadEvent("estimate_form_completed", {
        completionPercent: leadReadiness.completionPercent,
      });
      hasTrackedCompleteForm.current = true;
    }

    if (!leadReadiness.canSendDetailedLead) {
      hasTrackedCompleteForm.current = false;
    }

    const milestone =
      leadReadiness.completionPercent >= 100
        ? 100
        : leadReadiness.completionPercent >= 67
          ? 67
          : leadReadiness.completionPercent >= 33
            ? 33
            : null;

    if (milestone && !trackedMilestones.current.has(milestone)) {
      trackLeadEvent("estimate_form_progress", {
        completionPercent: leadReadiness.completionPercent,
        milestone,
      });
      trackedMilestones.current.add(milestone);
    }
  }, [leadReadiness.canSendDetailedLead, leadReadiness.completionPercent, showValidationHint]);

  const focusFirstInvalidField = () => {
    if (leadReadiness.hasName === false) {
      document.getElementById("estimate-name")?.focus();
      return;
    }

    if (leadReadiness.hasValidZip === false) {
      document.getElementById("estimate-zip")?.focus();
      return;
    }

    if (leadReadiness.hasProjectType === false) {
      document.getElementById("estimate-project-type")?.focus();
    }
  };

  const handleCopyBrief = async () => {
    const message = buildLeadDetailsMessage(detailFields);

    trackLeadEvent("copy_project_brief", {
      completionPercent: leadReadiness.completionPercent,
    });

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleClearForm = () => {
    trackLeadEvent("estimate_form_cleared", {
      completionPercent: leadReadiness.completionPercent,
    });
    setForm(EMPTY_FORM);
    setCopied(false);
    setShowValidationHint(false);
    hasTrackedFormStart.current = false;
    trackedMilestones.current = new Set();
  };

  const handleDetailedLeadClick = (event, channel) => {
    if (leadReadiness.canSendDetailedLead) {
      trackLeadEvent("detailed_lead_click", {
        channel,
        completionPercent: leadReadiness.completionPercent,
      });
      return;
    }

    event.preventDefault();
    trackLeadEvent("detailed_lead_blocked", {
      channel,
      completionPercent: leadReadiness.completionPercent,
      hasName: leadReadiness.hasName,
      hasProjectType: leadReadiness.hasProjectType,
      hasValidZip: leadReadiness.hasValidZip,
    });
    setShowValidationHint(true);
    focusFirstInvalidField();
  };

  const handleFieldChange = (field, value) => {
    if (!hasTrackedFormStart.current) {
      trackLeadEvent("estimate_form_started", {
        field,
      });
      hasTrackedFormStart.current = true;
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fieldClass =
    "mt-1 w-full rounded-xl border border-white/20 bg-[#0d141d] px-3 py-2.5 text-sm text-white outline-none ring-[#e3bf7b] transition focus:ring-2";

  const disabledLeadButtonClass = !leadReadiness.canSendDetailedLead
    ? "pointer-events-none opacity-55"
    : "";

  return (
    <section id="instant-estimate" className="section-shell -mt-2 pb-6">
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
            <p className="mt-2 text-xs text-white/60">
              Your draft is saved automatically if you leave and come back.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/80">
              <span className="inline-block h-2 w-28 overflow-hidden rounded-full bg-white/20">
                <span
                  className="block h-full bg-[#e3bf7b] transition-all duration-300"
                  style={{ width: `${leadReadiness.completionPercent}%` }}
                />
              </span>
              <span>
                Estimate request completion: {leadReadiness.completionPercent}%
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="tel:+19408827215"
                onClick={() => trackLeadEvent("call_click", { placement: "instant_estimate_primary" })}
                className="inline-flex items-center gap-2 rounded-full bg-[#e3bf7b] px-5 py-3 text-sm font-semibold text-[#1b1b1b] transition hover:-translate-y-0.5 hover:bg-[#d3ac61]"
              >
                <FiPhone size={16} />
                Call Now
              </a>
              <a
                href={quickTextHref}
                onClick={() => trackLeadEvent("sms_click", { placement: "instant_estimate_quick_text" })}
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
              Name <span className="text-[#e3bf7b]">*</span>
              <input
                id="estimate-name"
                value={form.name}
                onChange={(event) =>
                  handleFieldChange("name", event.target.value)
                }
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={showValidationHint && !leadReadiness.hasName}
                className={fieldClass}
              />
              {showValidationHint && !leadReadiness.hasName ? (
                <span className="mt-1 block text-[11px] text-[#f7d9a0]">Name is required.</span>
              ) : null}
            </label>

            <label className="text-xs font-medium text-white/85 md:col-span-1">
              Phone (optional)
              <input
                value={form.phone}
                onChange={(event) =>
                  handleFieldChange("phone", normalizePhone(event.target.value))
                }
                placeholder="(940) 882-7215"
                inputMode="tel"
                autoComplete="tel"
                className={fieldClass}
              />
            </label>

            <label className="text-xs font-medium text-white/85 md:col-span-1">
              ZIP code <span className="text-[#e3bf7b]">*</span>
              <input
                id="estimate-zip"
                value={form.zip}
                onChange={(event) =>
                  handleFieldChange("zip", normalizeZip(event.target.value))
                }
                placeholder="75214"
                inputMode="numeric"
                autoComplete="postal-code"
                aria-invalid={showValidationHint && !leadReadiness.hasValidZip}
                className={fieldClass}
              />
              {showValidationHint && !leadReadiness.hasValidZip ? (
                <span className="mt-1 block text-[11px] text-[#f7d9a0]">Enter a valid 5-digit ZIP code.</span>
              ) : null}
            </label>

            <label className="text-xs font-medium text-white/85 md:col-span-1">
              Project type <span className="text-[#e3bf7b]">*</span>
              <select
                id="estimate-project-type"
                value={form.projectType}
                onChange={(event) =>
                  handleFieldChange("projectType", event.target.value)
                }
                aria-invalid={showValidationHint && !leadReadiness.hasProjectType}
                className={fieldClass}
              >
                <option value="">Select project</option>
                {PROJECT_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {showValidationHint && !leadReadiness.hasProjectType ? (
                <span className="mt-1 block text-[11px] text-[#f7d9a0]">Project type is required.</span>
              ) : null}
            </label>

            <label className="text-xs font-medium text-white/85 md:col-span-1">
              Ideal timeline
              <select
                value={form.timeline}
                onChange={(event) =>
                  handleFieldChange("timeline", event.target.value)
                }
                className={fieldClass}
              >
                <option value="">Select timeline</option>
                {TIMELINES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-medium text-white/85 md:col-span-1">
              Budget range
              <select
                value={form.budget}
                onChange={(event) =>
                  handleFieldChange("budget", event.target.value)
                }
                className={fieldClass}
              >
                <option value="">Select budget</option>
                {BUDGET_RANGES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-medium text-white/85 md:col-span-2">
              Notes
              <textarea
                value={form.notes}
                onChange={(event) =>
                  handleFieldChange("notes", event.target.value)
                }
                placeholder="Tell us a bit more about your project..."
                rows={3}
                className={`${fieldClass} resize-y`}
              />
            </label>

            <div className="mt-1 flex flex-wrap gap-2 md:col-span-2">
              <a
                href={smsHref}
                onClick={(event) => handleDetailedLeadClick(event, "sms")}
                className={`inline-flex items-center gap-2 rounded-full bg-[#e3bf7b] px-4 py-2.5 text-xs font-semibold text-[#1b1b1b] transition hover:bg-[#d3ac61] ${disabledLeadButtonClass}`}
                aria-label="Send project details by text"
                aria-disabled={!leadReadiness.canSendDetailedLead}
              >
                <FiMessageSquare size={15} />
                Send by Text
              </a>
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => handleDetailedLeadClick(event, "whatsapp")}
                className={`inline-flex items-center gap-2 rounded-full border border-[#74d68f]/70 bg-[#2c5b39] px-4 py-2.5 text-xs font-semibold text-white transition hover:border-[#8ee0a5] hover:bg-[#336843] ${disabledLeadButtonClass}`}
                aria-label="Send project details by WhatsApp"
                aria-disabled={!leadReadiness.canSendDetailedLead}
              >
                <FiMessageSquare size={15} />
                Send by WhatsApp
              </a>
              <a
                href={emailHref}
                onClick={(event) => handleDetailedLeadClick(event, "email")}
                className={`inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-xs font-semibold text-white transition hover:border-white/60 hover:bg-white/10 ${disabledLeadButtonClass}`}
                aria-label="Send project details by email"
                aria-disabled={!leadReadiness.canSendDetailedLead}
              >
                <FiMail size={15} />
                Send by Email
              </a>
              <button
                type="button"
                onClick={handleCopyBrief}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-xs font-semibold text-white/90 transition hover:border-white/60 hover:bg-white/10"
                aria-label="Copy project details"
              >
                {copied ? <FiCheck size={15} /> : <FiMail size={15} />}
                {copied ? "Copied" : "Copy Project Brief"}
              </button>
              <button
                type="button"
                onClick={handleClearForm}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white/75 transition hover:border-white/50 hover:text-white"
                aria-label="Clear project details"
              >
                Clear form
              </button>
            </div>

            {showValidationHint && !leadReadiness.canSendDetailedLead ? (
              <p className="mt-1 flex items-center gap-2 text-xs text-[#f7d9a0] md:col-span-2">
                <FiAlertCircle size={14} />
                Please add name, 5-digit ZIP code, and project type before
                sending a detailed request.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
