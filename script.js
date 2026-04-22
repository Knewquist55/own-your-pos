(function () {
  var cookieKey = window.RS_COOKIE_KEY || 'rs_tracking_consent_v1';
  var ids = window.RS_TRACKING_IDS || {};
  var consentBanner = null;
  var trackingLoaded = false;

  function getConsent() {
    try {
      return localStorage.getItem(cookieKey);
    } catch (err) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(cookieKey, value);
    } catch (err) {
      // no-op
    }
  }

  function hideBanner() {
    if (consentBanner) {
      consentBanner.hidden = true;
    }
  }

  function showBanner() {
    if (consentBanner) {
      consentBanner.hidden = false;
    }
  }

  function loadScript(src, onload) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;
    if (onload) {
      script.onload = onload;
    }
    document.head.appendChild(script);
  }

  function initTracking() {
    if (trackingLoaded) return;
    if (!ids.ga4 && !ids.ads) return;

    trackingLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());

    if (ids.ga4) {
      window.gtag('config', ids.ga4);
    }
    if (ids.ads) {
      window.gtag('config', ids.ads);
    }

    var primaryId = ids.ga4 || ids.ads;
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(primaryId), function () {
      if (window.RS_LOAD_CONVERSION_ON_THANK_YOU && window.RS_ADS_CONVERSION_SEND_TO) {
        window.gtag('event', 'conversion', {
          'send_to': window.RS_ADS_CONVERSION_SEND_TO,
          'value': 1.0,
          'currency': 'USD'
        });

        window.gtag('event', 'generate_lead', {
          method: 'website_form'
        });
      }
    });
  }

  function wireConsentButtons() {
    var acceptBtn = document.getElementById('consent-accept');
    var declineBtn = document.getElementById('consent-decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setConsent('accepted');
        hideBanner();
        initTracking();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        setConsent('declined');
        hideBanner();
      });
    }
  }

  function wireTrackedClicks() {
    var trackedElements = document.querySelectorAll('[data-track]');
    trackedElements.forEach(function (element) {
      element.addEventListener('click', function () {
        var label = element.getAttribute('data-track');
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click', {
            event_category: 'engagement',
            event_label: label
          });
        }
      });
    });
  }

  function wireLeadForm() {
    var leadForm = document.getElementById('lead-form');
    if (!leadForm) return;

    leadForm.addEventListener('submit', function () {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          method: 'website_form'
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    consentBanner = document.getElementById('consent-banner');
    wireConsentButtons();
    wireTrackedClicks();
    wireLeadForm();

    var consent = getConsent();
    if (consent === 'accepted') {
      hideBanner();
      initTracking();
    } else if (consent === 'declined') {
      hideBanner();
    } else {
      showBanner();
    }
  });
})();
