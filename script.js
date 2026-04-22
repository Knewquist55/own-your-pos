document.addEventListener('DOMContentLoaded', function () {
  var trackedElements = document.querySelectorAll('[data-track]');
  trackedElements.forEach(function (element) {
    element.addEventListener('click', function () {
      var label = element.getAttribute('data-track');
      if (typeof gtag === 'function') {
        gtag('event', 'click', {
          event_category: 'engagement',
          event_label: label
        });
      }
    });
  });

  var leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          method: 'website_form'
        });
      }
    });
  }
});
