import measurement from './measurement-config.json';

const preferenceKey = 'solera-privacy-v1';
const preferenceLifetime = 180 * 24 * 60 * 60 * 1000;
const notice = document.querySelector('#cookie-notice');
const preferences = document.querySelector('#cookie-preferences');
const analyticsInput = document.querySelector('#analytics-consent');
const configureButton = document.querySelector('[data-cookie-configure]');
const saveButton = document.querySelector('[data-cookie-save]');
let returnFocus;

function storedPreference() {
  try {
    const value = JSON.parse(localStorage.getItem(preferenceKey));
    if (value?.version === 1 && typeof value.analytics === 'boolean' && value.at <= Date.now() && Date.now() - value.at < preferenceLifetime) return value;
    localStorage.removeItem(preferenceKey);
  } catch {}
  return null;
}

let preference = storedPreference();
let analyticsAllowed = preference?.analytics === true;
document.querySelectorAll('a[href^="mailto:"]').forEach(link => link.setAttribute('data-nat-event', 'email_click'));
document.querySelectorAll('.hero-links a,.header-contact,.closing a,.service-link,.dialogue-portrait a').forEach(link => link.setAttribute('data-nat-event', 'cta_click'));
function clearMeasurement() {
  try {
    localStorage.removeItem('nat_visitor_id');
    sessionStorage.removeItem('nat_session');
    sessionStorage.removeItem('nat_session_closing');
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0].trim();
      if (!/^(nat_visitor_id|nat_session_id|_ga(?:_|$)|_gid$|_gat)/.test(name)) continue;
      for (const domain of ['', location.hostname, '.' + location.hostname]) {
        document.cookie = name + '=; path=/; max-age=0; SameSite=Lax; Secure' + (domain ? '; domain=' + domain : '');
      }
    }
  } catch {}
  document.querySelectorAll('input[name=nat_visitor_id],input[name=nat_session_id]').forEach(input => input.remove());
}

function applyPreference(allowed) {
  analyticsAllowed = allowed;
  if (measurement.ga4Id) window['ga-disable-' + measurement.ga4Id] = !allowed;
  window.NatAnalytics?.setConsent(allowed, false);
  if (!allowed) clearMeasurement();
}

applyPreference(analyticsAllowed);

// The CRM SDK provides the requested enquiry service. Its optional activity
// collection and Google tag remain disabled until the visitor opts in.
export const measurementReady = new Promise(resolve => {
  if (!measurement.publicKey || location.hostname !== 'soleraestates.eu') { resolve(false); return; }
  const script = document.createElement('script');
  script.src = 'https://crm.natconsulting.es/ventia-analytics/tracker.js';
  script.async = true;
  script.dataset.site = measurement.siteId;
  script.dataset.key = measurement.publicKey;
  script.dataset.endpoint = 'https://crm.natconsulting.es/ventia-analytics/api/ingest';
  script.dataset.consent = 'required';
  script.dataset.ga4 = measurement.ga4Id;
  script.dataset.clickMode = 'explicit';
  script.addEventListener('load', () => { applyPreference(analyticsAllowed); resolve(true); }, { once: true });
  script.addEventListener('error', () => resolve(false), { once: true });
  document.head.append(script);
  setTimeout(() => resolve(false), 5000);
});

function showNotice(configure = false) {
  if (!notice) return;
  notice.hidden = false;
  document.body.classList.add('cookie-visible');
  analyticsInput.checked = analyticsAllowed;
  preferences.hidden = !configure;
  saveButton.hidden = !configure;
  configureButton.hidden = configure;
  configureButton.setAttribute('aria-expanded', String(configure));
}

function savePreference(allowed) {
  preference = { version: 1, analytics: allowed, at: Date.now() };
  try { localStorage.setItem(preferenceKey, JSON.stringify(preference)); } catch {}
  applyPreference(allowed);
  notice.hidden = true;
  document.body.classList.remove('cookie-visible');
  returnFocus?.focus({ preventScroll: true });
}

if (!preference) showNotice();
document.querySelector('[data-cookie-accept]')?.addEventListener('click', () => savePreference(true));
document.querySelector('[data-cookie-reject]')?.addEventListener('click', () => savePreference(false));
configureButton?.addEventListener('click', () => { showNotice(true); analyticsInput.focus(); });
saveButton?.addEventListener('click', () => savePreference(analyticsInput.checked));
document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => {
  returnFocus = button;
  showNotice(true);
  analyticsInput.focus({ preventScroll: true });
}));
window.addEventListener('storage', event => {
  if (event.key !== preferenceKey) return;
  preference = storedPreference();
  applyPreference(preference?.analytics === true);
  if (!preference) showNotice();
  else { notice.hidden = true; document.body.classList.remove('cookie-visible'); }
});

export function confirmEnquiry(formId) {
  document.dispatchEvent(new CustomEvent('nat:form:confirmed', { detail: { formId } }));
  if (analyticsAllowed && typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', { form_id: formId, method: 'contact_form' });
  }
}

const goUp = document.querySelector('.go-up');
function updateGoUp() { if (goUp) goUp.hidden = window.scrollY < 500; }
window.addEventListener('scroll', updateGoUp, { passive: true });
updateGoUp();
goUp?.addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('.brand')?.focus({ preventScroll: true });
});
