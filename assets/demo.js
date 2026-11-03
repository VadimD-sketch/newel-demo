// Demo only: forms do not send anything.
document.querySelectorAll('form').forEach(function (f) {
  var btn = f.querySelector('button[type="button"]');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var n = f.querySelector('[data-demo-msg]');
    if (!n) {
      n = document.createElement('p');
      n.setAttribute('data-demo-msg', '');
      n.setAttribute('role', 'status');
      n.style.cssText = 'margin:16px 0 0;font-weight:700';
      btn.parentNode.appendChild(n);
    }
    n.textContent = 'Tack! Det här är en demo – inget har skickats.';
  });
});
document.querySelectorAll('.chip').forEach(function (c) {
  c.addEventListener('click', function () {
    document.querySelectorAll('.chip').forEach(function (x) {
      x.setAttribute('aria-pressed', x === c ? 'true' : 'false');
    });
  });
});
