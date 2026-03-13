const ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
];

const ATTR_STORAGE_KEY = "tetelestai_lead_attribution_v1";

function readStoredAttribution() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(ATTR_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredAttribution(value) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage write failures (private mode, blocked storage, etc.)
  }
}

function captureAttributionSnapshot() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const currentAttrs = Object.fromEntries(
    ATTR_KEYS.map((key) => [key, params.get(key)]).filter(([, value]) => value),
  );

  const stored = readStoredAttribution();
  const timestamp = new Date().toISOString();
  const hasCurrentAttrs = Object.keys(currentAttrs).length > 0;

  const snapshot = {
    firstTouch: stored?.firstTouch
      ? stored.firstTouch
      : {
          capturedAt: timestamp,
          attrs: currentAttrs,
          landingPage: window.location.href,
          referrer: document.referrer || "",
        },
    lastTouch: {
      capturedAt: timestamp,
      attrs: hasCurrentAttrs ? currentAttrs : stored?.lastTouch?.attrs || {},
      landingPage: window.location.href,
      referrer: document.referrer || stored?.lastTouch?.referrer || "",
    },
  };

  writeStoredAttribution(snapshot);
  return snapshot;
}

export function getAttributionSnapshot() {
  if (typeof window === "undefined") return null;

  return captureAttributionSnapshot() || readStoredAttribution();
}

export function getAttributionLines() {
  if (typeof window === "undefined") return [];

  const snapshot = getAttributionSnapshot();
  if (!snapshot) return [];

  const firstTouchPairs = ATTR_KEYS.map((key) => [
    key,
    snapshot.firstTouch?.attrs?.[key],
  ])
    .filter(([, value]) => value)
    .map(([key, value]) => `first_${key}: ${value}`);

  const lastTouchPairs = ATTR_KEYS.map((key) => [
    key,
    snapshot.lastTouch?.attrs?.[key],
  ])
    .filter(([, value]) => value)
    .map(([key, value]) => `last_${key}: ${value}`);

  return [
    ...firstTouchPairs,
    ...lastTouchPairs,
    snapshot.firstTouch?.landingPage
      ? `first_landing_page: ${snapshot.firstTouch.landingPage}`
      : null,
    snapshot.firstTouch?.referrer
      ? `first_referrer: ${snapshot.firstTouch.referrer}`
      : null,
    snapshot.lastTouch?.landingPage
      ? `last_landing_page: ${snapshot.lastTouch.landingPage}`
      : null,
    snapshot.lastTouch?.referrer
      ? `last_referrer: ${snapshot.lastTouch.referrer}`
      : null,
    snapshot.firstTouch?.capturedAt
      ? `first_touch_captured_at: ${snapshot.firstTouch.capturedAt}`
      : null,
    snapshot.lastTouch?.capturedAt
      ? `last_touch_captured_at: ${snapshot.lastTouch.capturedAt}`
      : null,
  ].filter(Boolean);
}

export function buildLeadDetailsMessage({
  name = "",
  phone = "",
  zip = "",
  projectType = "",
  timeline = "",
  budget = "",
  notes = "",
  includeAttribution = true,
} = {}) {
  const attribution = includeAttribution ? getAttributionLines() : [];

  const lines = [
    "Hi Tetelestai, I'd like a free estimate.",
    name ? `Name: ${name}` : null,
    phone ? `Phone: ${phone}` : null,
    zip ? `ZIP Code: ${zip}` : null,
    projectType ? `Project: ${projectType}` : null,
    timeline ? `Timeline: ${timeline}` : null,
    budget ? `Budget Range: ${budget}` : null,
    notes ? `Notes: ${notes}` : null,
    attribution.length ? "Lead Source:" : null,
    ...attribution,
  ].filter(Boolean);

  return lines.join("\n");
}

function isIOSDevice() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent || "");
}

export function buildSmsHref(details = {}) {
  const body = encodeURIComponent(buildLeadDetailsMessage(details));
  const separator = isIOSDevice() ? "&" : "?";
  return `sms:+19408827215${separator}body=${body}`;
}

export function buildEmailHref(details = {}) {
  const body = encodeURIComponent(buildLeadDetailsMessage(details));
  return `mailto:Tetelestai.business@gmail.com?subject=Free%20Estimate%20Request&body=${body}`;
}

export function buildGmailComposeHref(details = {}) {
  const subject = encodeURIComponent("Free Estimate Request");
  const body = encodeURIComponent(buildLeadDetailsMessage(details));
  return `https://mail.google.com/mail/?view=cm&fs=1&to=Tetelestai.business@gmail.com&su=${subject}&body=${body}`;
}

function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

export function buildPreferredEmailHref(details = {}) {
  return isMobileDevice() ? buildEmailHref(details) : buildGmailComposeHref(details);
}

export function buildWhatsAppHref(details = {}) {
  const text = encodeURIComponent(buildLeadDetailsMessage(details));
  return `https://wa.me/19408827215?text=${text}`;
}
