// Demo only: forms do not send anything.
document.querySelectorAll('form').forEach(function (f) {
  var btn = f.querySelector('button[type="button"]');
  if (!btn || btn.hasAttribute('data-next')) return;
  btn.addEventListener('click', function () {
    var n = f.querySelector('[data-demo-msg]');
    if (!n) {
      n = document.createElement('p');
      n.setAttribute('data-demo-msg', '');
      n.setAttribute('role', 'status');
      n.style.cssText = 'margin:16px 0 0;font-weight:700';
      btn.parentNode.appendChild(n);
    }
    n.textContent = document.documentElement.lang === 'en' ? 'Thank you! This is a demo – nothing has been sent.' : 'Tack! Det här är en demo – inget har skickats.';
  });
});
document.querySelectorAll('.chip').forEach(function (c) {
  c.addEventListener('click', function () {
    document.querySelectorAll('.chip').forEach(function (x) {
      x.setAttribute('aria-pressed', x === c ? 'true' : 'false');
    });
  });
});

// Variant B: hand the short start-page form over to the quote page, and prefill from the query string
document.querySelectorAll('button[data-next]').forEach(function (b) {
  b.addEventListener('click', function () {
    var q = [];
    b.closest('form').querySelectorAll('input,select,textarea').forEach(function (i) {
      if (i.name && i.value && i.type !== 'checkbox') q.push(encodeURIComponent(i.name) + '=' + encodeURIComponent(i.value));
    });
    location.href = b.getAttribute('data-next') + (q.length ? '?' + q.join('&') : '');
  });
});
(function () {
  var p = new URLSearchParams(location.search);
  p.forEach(function (v, k) {
    var els = document.querySelectorAll('[name="' + k + '"]');
    els.forEach(function (el) {
      if (el.type === 'checkbox' || el.type === 'radio') { if (el.value === v) el.checked = true; }
      else if (el.tagName === 'SELECT' || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = v;
    });
  });
})();

// Mobile menu
(function () {
  var t = document.querySelector('.nav-toggle');
  var n = document.getElementById('site-nav');
  if (!t || !n) return;
  t.addEventListener('click', function () {
    var open = n.classList.toggle('open');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();
