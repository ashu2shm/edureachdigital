
const setCookie = (cname, cvalue, exhours) => {
  const d = new Date();
  d.setTime(d.getTime() + (30 * 60 * 1000)); 
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length);
    }
  }
  return "";
};

const deleteCookie = (cname) => {
  const d = new Date();
  d.setTime(d.getTime() - 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=;${expires};path=/`;
};

/* ----------------------------
   Contact Form & Subscription Handler
----------------------------- */

function contactForm() {
  'use strict';

  // Google reCAPTCHA callback replacements
  window.verifyRecaptchaCallback = function (response) {
    const input = document.querySelector('input[data-recaptcha]');
    if (input) {
      input.value = response;
      input.dispatchEvent(new Event('change'));
    }
  };

  window.expiredRecaptchaCallback = function () {
    const input = document.querySelector('input[data-recaptcha]');
    if (input) {
      input.value = "";
      input.dispatchEvent(new Event('change'));
    }
  };

  // Handle .dzForm submission
  document.querySelectorAll('.dzForm').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const msgBox = document.querySelector('.dzFormMsg');
      if (msgBox) {
        msgBox.innerHTML = '<div class="gen alert dz-alert alert-success">Submitting..</div>';
      }

      const dzFormAction = form.getAttribute('action');
      const formData = new FormData(form);

      fetch(dzFormAction, {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(dzRes => {
          let msgDiv = '';
          if (dzRes.status === 1) {
            msgDiv = `<div class="gen alert dz-alert alert-success">${dzRes.msg}</div>`;
          } else if (dzRes.status === 0) {
            msgDiv = `<div class="err alert dz-alert alert-danger">${dzRes.msg}</div>`;
          }

          if (msgBox) {
            msgBox.innerHTML = msgDiv;

            setTimeout(() => {
              const alertEl = msgBox.querySelector('.alert');
              if (alertEl) alertEl.style.display = 'none';
            }, 5000);
          }

          form.reset();
          if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
        });
    });
  });

  // Handle .dzSubscribe submission
  document.addEventListener('submit', function (e) {
    const targetForm = e.target;
    if (targetForm.classList.contains('dzSubscribe')) {
      e.preventDefault();

      const dzFormAction = targetForm.getAttribute('action');
      const formData = new FormData(targetForm);
      const msgBox = document.querySelector('.dzSubscribeMsg');

      targetForm.classList.add('dz-ajax-overlay');

      fetch(dzFormAction, {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(dzRes => {
          targetForm.classList.remove('dz-ajax-overlay');

          let msgDiv = '';
          if (dzRes.status === 1) {
            msgDiv = `<div class="gen p-20 text-green bg-green/20">${dzRes.msg}</div>`;
            setCookie('prevent_subscription', 'true', 1);
          } else if (dzRes.status === 0) {
            msgDiv = `<div class="err p-20 text-red bg-red/20">${dzRes.msg}</div>`;
          }

          if (msgBox) {
            msgBox.innerHTML = msgDiv;

            setTimeout(() => {
              const alertEl = msgBox.querySelector('.alert');
              if (alertEl) alertEl.style.display = 'none';
            }, 5000);
          }

          targetForm.reset();
        });
    }
  });
}

/* ----------------------------
   Init on DOM ready
----------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  contactForm();
});
