// Demo only: forms do not send anything. Validates, shows inline errors ("Fel:" + icon + thicker border)
// and replaces the form with a confirmation panel.
(function () {
  var EN = document.documentElement.lang === 'en';
  var M = EN ? {
    err: 'Error:',
    fill: function (l) { return 'fill in ' + l + '.'; },
    choose: function (l) { return 'choose ' + l + '.'; },
    email: 'enter a valid email address, for example name@company.com.',
    org: 'enter the organisation number with 10 digits, for example 556677-8899.',
    consent: 'accept the handling of your data to send the form.',
    thanks: { offert: 'Thank you! We have received your quote request.', service: 'Thank you! We have received your service report.', intresse: 'Thank you! We have received your expression of interest.', other: 'Thank you! We have received your message.' },
    demo: 'This is a demo – nothing has been sent.', again: 'Send another'
  } : {
    err: 'Fel:',
    fill: function (l) { return 'fyll i ' + l + '.'; },
    choose: function (l) { return 'välj ' + l + '.'; },
    email: 'ange en giltig e-postadress, till exempel namn@foretag.se.',
    org: 'ange organisationsnummer med 10 siffror, till exempel 556677-8899.',
    consent: 'godkänn hanteringen av era uppgifter för att kunna skicka.',
    thanks: { offert: 'Tack! Vi har tagit emot er offertförfrågan.', service: 'Tack! Vi har tagit emot er serviceanmälan.', intresse: 'Tack! Vi har tagit emot er intresseanmälan.', other: 'Tack! Vi har tagit emot ert meddelande.' },
    demo: 'Det här är en demo – inget har skickats.', again: 'Skicka en ny'
  };
  var ICON = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"><path d="M12 3L2 21h20L12 3z"/><path d="M12 10v5M12 18v.5"/></svg>';

  function labelText(el) {
    var l = el.id && document.querySelector('label[for="' + el.id + '"]');
    var t = l ? l.textContent : '';
    return t.replace(/\*/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  }
  function legendText(fs) {
    var lg = fs && fs.querySelector('legend');
    return lg ? lg.textContent.replace(/\*/g, '').replace(/\s+/g, ' ').trim().toLowerCase() : '';
  }
  var n = 0;
  function showError(host, ctrl, msg, after) {
    var id = 'err-' + (++n);
    var p = document.createElement('p');
    p.className = 'field-error';
    p.id = id;
    p.setAttribute('data-demo-error', '');
    p.innerHTML = ICON + '<span><b>' + M.err + '</b> ' + msg + '</span>';
    if (after && after.parentNode) after.parentNode.insertBefore(p, after.nextSibling); else host.appendChild(p);
    ctrl.setAttribute('aria-invalid', 'true');
    var d = ctrl.getAttribute('aria-describedby');
    ctrl.setAttribute('aria-describedby', (d ? d + ' ' : '') + id);
    ctrl.setAttribute('data-err-id', id);
    var clear = function () {
      ctrl.removeAttribute('aria-invalid');
      var e = document.getElementById(id); if (e) e.remove();
      var dd = (ctrl.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== id; }).join(' ');
      if (dd) ctrl.setAttribute('aria-describedby', dd); else ctrl.removeAttribute('aria-describedby');
      ctrl.removeEventListener('input', clear); ctrl.removeEventListener('change', clear);
    };
    ctrl.addEventListener('input', clear); ctrl.addEventListener('change', clear);
  }
  function validate(f) {
    var first = null;
    function bad(ctrl, host, msg, after) { showError(host, ctrl, msg, after); if (!first) first = ctrl; }
    var seen = {};
    f.querySelectorAll('input,select,textarea').forEach(function (el) {
      if (el.type === 'radio') {
        if (seen[el.name]) return; seen[el.name] = 1;
        var group = f.querySelectorAll('input[type="radio"][name="' + el.name + '"]');
        var req = Array.prototype.some.call(group, function (r) { return r.required; });
        var any = Array.prototype.some.call(group, function (r) { return r.checked; });
        if (req && !any) { var fs = el.closest('fieldset'); bad(group[0], fs, M.choose(legendText(fs)), fs.querySelector('label.opt:last-of-type')); }
        return;
      }
      var v = (el.value || '').trim();
      if (el.type === 'checkbox') {
        if (el.required && !el.checked) bad(el, el.parentNode, M.consent, el.nextElementSibling);
        return;
      }
      if (el.required && !v) {
        bad(el, el.parentNode, el.tagName === 'SELECT' ? M.choose(labelText(el)) : M.fill(labelText(el)), el);
        return;
      }
      if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { bad(el, el.parentNode, M.email, el); return; }
      if (el.name === 'orgnr' && v) {
        var d = v.replace(/\D/g, '');
        if (d.length !== 10 || /[^0-9\-\s]/.test(v)) { bad(el, el.parentNode, M.org, el); return; }
        el.value = d.slice(0, 6) + '-' + d.slice(6);
      }
    });
    return first;
  }
  function success(f, btn) {
    var bt = btn.textContent; var kind = /offert|quote/i.test(bt) ? 'offert' : /service/i.test(bt) ? 'service' : /intresse|interest/i.test(bt) ? 'intresse' : 'other';
    var kids = Array.prototype.slice.call(f.children);
    kids.forEach(function (c) { c.setAttribute('data-prev-display', c.style.display || ''); c.style.display = 'none'; });
    var panel = document.createElement('div');
    panel.setAttribute('data-demo-success', '');
    panel.setAttribute('role', 'status');
    panel.style.cssText = 'display:flex;flex-direction:column;gap:16px';
    panel.innerHTML = '<h2 class="h3" tabindex="-1"></h2><p></p><div><button class="btn btn-secondary" type="button" style="font-family:inherit;cursor:pointer"></button></div>';
    panel.querySelector('h2').textContent = M.thanks[kind];
    panel.querySelector('p').textContent = M.demo;
    var again = panel.querySelector('button'); again.textContent = M.again;
    again.addEventListener('click', function () {
      panel.remove(); f.reset();
      kids.forEach(function (c) { c.style.display = c.getAttribute('data-prev-display'); c.removeAttribute('data-prev-display'); });
      var fl = f.querySelector('input,select,textarea'); if (fl) fl.focus();
    });
    f.appendChild(panel);
    panel.querySelector('h2').focus();
  }
  document.querySelectorAll('form').forEach(function (f) {
    var btn = f.querySelector('button[type="button"]');
    if (!btn || btn.hasAttribute('data-next')) return;
    f.noValidate = true;
    function run() {
      f.querySelectorAll('[data-demo-error]').forEach(function (e) { e.remove(); });
      f.querySelectorAll('[aria-invalid]').forEach(function (e) { e.removeAttribute('aria-invalid'); });
      var first = validate(f);
      if (first) { first.focus(); return; }
      success(f, btn);
    }
    btn.addEventListener('click', run);
    f.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    f.addEventListener('keydown', function (e) {
      var t = e.target;
      if (e.key === 'Enter' && t.tagName === 'INPUT' && t.type !== 'checkbox' && t.type !== 'radio') { e.preventDefault(); run(); }
    });
  });
})();
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
