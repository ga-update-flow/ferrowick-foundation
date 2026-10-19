// Progressive enhancements only: every page and link works without this script.
(function () {
  // Header search overlay
  var toggle = document.querySelector('.search-toggle');
  var overlay = document.querySelector('.search-overlay');
  if (toggle && overlay) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.classList.add('open');
      var input = overlay.querySelector('input[type=search]');
      if (input) input.focus();
    });
    overlay.querySelector('.close').addEventListener('click', function () { overlay.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') overlay.classList.remove('open'); });
  }

  // Demonstration forms: there is no backend, so say so plainly instead of pretending to submit.
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var notice = document.getElementById(form.getAttribute('data-demo-form'));
      if (notice) { notice.classList.add('show'); notice.setAttribute('tabindex', '-1'); notice.focus(); }
      form.querySelectorAll('input, textarea, select, button').forEach(function (el) { el.disabled = true; });
    });
  });

  // Site search results page
  var results = document.getElementById('search-results');
  if (results) {
    var q = new URLSearchParams(location.search).get('s') || '';
    var box = document.getElementById('search-query');
    if (box) box.value = q;
    if (!q.trim()) return;
    fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (index) {
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      var hits = index.map(function (p) {
        var hay = (p.title + ' ' + p.text).toLowerCase();
        var score = terms.reduce(function (s, t) { return s + (hay.indexOf(t) >= 0 ? 1 : 0) + (p.title.toLowerCase().indexOf(t) >= 0 ? 2 : 0); }, 0);
        return { p: p, score: score, all: terms.every(function (t) { return hay.indexOf(t) >= 0; }) };
      }).filter(function (h) { return h.all; }).sort(function (a, b) { return b.score - a.score; });
      var h = '<p>' + hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for “' + q.replace(/</g, '&lt;') + '”</p>';
      hits.slice(0, 50).forEach(function (x) {
        var i = x.p.text.toLowerCase().indexOf(terms[0]);
        var snip = x.p.text.slice(Math.max(0, i - 80), i + 160);
        h += '<article class="search-hit"><h3><a href="' + x.p.url + '">' + x.p.title + '</a></h3><p>…' + snip.replace(/</g, '&lt;') + '…</p></article>';
      });
      results.innerHTML = h;
    });
  }
})();
