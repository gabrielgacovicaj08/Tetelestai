import { getAttributionSnapshot } from "./leadAttribution";

const LEAD_EVENTS_STORAGE_KEY = "tetelestai_lead_events_v1";
const MAX_STORED_EVENTS = 60;

function readStoredEvents() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LEAD_EVENTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredEvents(events) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      LEAD_EVENTS_STORAGE_KEY,
      JSON.stringify(events.slice(-MAX_STORED_EVENTS)),
    );
  } catch {
    // Ignore storage failures (private mode, blocked storage, etc.)
  }
}

function getLeadContext() {
  if (typeof window === "undefined") return {};

  const attribution = getAttributionSnapshot();

  return {
    first_utm_source: attribution?.firstTouch?.attrs?.utm_source || undefined,
    first_utm_medium: attribution?.firstTouch?.attrs?.utm_medium || undefined,
    first_utm_campaign: attribution?.firstTouch?.attrs?.utm_campaign || undefined,
    first_utm_term: attribution?.firstTouch?.attrs?.utm_term || undefined,
    first_utm_content: attribution?.firstTouch?.attrs?.utm_content || undefined,
    first_gclid: attribution?.firstTouch?.attrs?.gclid || undefined,
    first_fbclid: attribution?.firstTouch?.attrs?.fbclid || undefined,
    first_msclkid: attribution?.firstTouch?.attrs?.msclkid || undefined,
    last_utm_source: attribution?.lastTouch?.attrs?.utm_source || undefined,
    last_utm_medium: attribution?.lastTouch?.attrs?.utm_medium || undefined,
    last_utm_campaign: attribution?.lastTouch?.attrs?.utm_campaign || undefined,
    last_utm_term: attribution?.lastTouch?.attrs?.utm_term || undefined,
    last_utm_content: attribution?.lastTouch?.attrs?.utm_content || undefined,
    last_gclid: attribution?.lastTouch?.attrs?.gclid || undefined,
    last_fbclid: attribution?.lastTouch?.attrs?.fbclid || undefined,
    last_msclkid: attribution?.lastTouch?.attrs?.msclkid || undefined,
    first_referrer: attribution?.firstTouch?.referrer || undefined,
    last_referrer: attribution?.lastTouch?.referrer || undefined,
    first_landing_page: attribution?.firstTouch?.landingPage || undefined,
    last_landing_page: attribution?.lastTouch?.landingPage || undefined,
    first_touch_captured_at: attribution?.firstTouch?.capturedAt || undefined,
    last_touch_captured_at: attribution?.lastTouch?.capturedAt || undefined,
    page_title: window.document?.title || undefined,
  };
}

export function trackLeadEvent(action, details = {}) {
  if (typeof window === "undefined") return;

  const context = getLeadContext();

  const payload = {
    event: "lead_intent",
    action,
    ts: new Date().toISOString(),
    path: window.location.pathname,
    ...context,
    ...details,
  };

  window.dataLayer?.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: "lead",
      page_path: payload.path,
      ...context,
      ...details,
    });
  }

  const events = readStoredEvents();
  events.push(payload);
  writeStoredEvents(events);
}

function detectLeadChannelFromHref(href = "") {
  const normalized = href.trim().toLowerCase();

  if (!normalized) return null;
  if (normalized.startsWith("tel:")) return "phone";
  if (normalized.startsWith("sms:")) return "sms";
  if (normalized.startsWith("mailto:")) return "email";
  if (normalized.includes("wa.me/") || normalized.includes("whatsapp.com")) {
    return "whatsapp";
  }

  return null;
}

function inferPlacement(anchor) {
  if (!anchor) return "unknown";

  return (
    anchor.getAttribute("data-lead-placement") ||
    anchor.id ||
    anchor.getAttribute("aria-label") ||
    anchor.textContent?.trim()?.slice(0, 80) ||
    "unknown"
  );
}

export function installGlobalLeadClickTracking() {
  if (typeof window === "undefined") return () => {};

  const onDocumentClick = (event) => {
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!anchor) return;

    const href = anchor.getAttribute("href") || "";
    const channel = detectLeadChannelFromHref(href);
    if (!channel) return;

    trackLeadEvent("lead_channel_click", {
      channel,
      href,
      placement: inferPlacement(anchor),
    });
  };

  document.addEventListener("click", onDocumentClick, { capture: true });

  return () => {
    document.removeEventListener("click", onDocumentClick, { capture: true });
  };
}

export function getTrackedLeadEvents() {
  return readStoredEvents();
}
