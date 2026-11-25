/* 83D Production: smooth scroll, the scroll-linked scenes, the menu and the footer reveal.
   Text is always in the HTML and readable: motion only moves it or brings it from 22% to full strength. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* each language is its own page (/, /ru/, /hy/) with its text in the HTML, so search engines read all three */

  /* split text into words after the language is set, so a translation never breaks a heading */
  document.querySelectorAll('[data-words]').forEach(function (el) {
    var words = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span'); s.className = 'wd'; s.textContent = part; words.push(s); frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    })(el);
    words.forEach(function (w, i) { w.style.setProperty('--i', i / words.length); });
  });

  /* menu sheet */
  var menu = document.querySelector('.hd__menu'), sheet = document.getElementById('sheet');
  if (menu && sheet) {
    var setOpen = function (open) { menu.setAttribute('aria-expanded', open ? 'true' : 'false'); sheet.hidden = !open; document.body.style.overflow = open ? 'hidden' : ''; };
    menu.addEventListener('click', function () { setOpen(menu.getAttribute('aria-expanded') !== 'true'); });
    sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* footer reveal: the page keeps room under it for the fixed footer, unless the footer is taller than the screen */
  var ft = document.querySelector('.ft'), page = document.querySelector('.page');
  function sizeFooter() {
    if (!ft || !page) return;
    var h = ft.offsetHeight;
    if (h > window.innerHeight - 40) { ft.classList.add('is-static'); page.style.setProperty('--fh', '0px'); }
    else { ft.classList.remove('is-static'); page.style.setProperty('--fh', h + 'px'); }
  }
  sizeFooter(); window.addEventListener('resize', sizeFooter);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeFooter);

  /* the header turns solid once the page moves */
  var hd = document.querySelector('.hd');

  /* scroll scenes: --p for a section passing the screen (0 entering, 1 leaving), --q for a pinned one (0 to 1 while held) */
  var pSecs = Array.prototype.slice.call(document.querySelectorAll('[data-p]'));
  var qSecs = Array.prototype.slice.call(document.querySelectorAll('[data-pin]'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.stack__card'));
  function frame() {
    var vh = window.innerHeight;
    if (hd) hd.classList.toggle('is-solid', window.scrollY > 20);
    if (reduce) return;
    pSecs.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.bottom < -vh || r.top > 2 * vh) return;
      var p = (vh - r.top) / (vh + r.height);
      s.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(4));
    });
    qSecs.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.bottom < -vh || r.top > 2 * vh) return;
      var span = r.height - vh;
      var q = span > 0 ? -r.top / span : 1;
      s.style.setProperty('--q', Math.max(0, Math.min(1, q)).toFixed(4));
    });
    var on = -1;
    cards.forEach(function (c, i) { if (c.getBoundingClientRect().top <= parseFloat(getComputedStyle(c).top) + 4) on = i; });
    cards.forEach(function (c, i) { c.classList.toggle('is-on', i === on || (on === -1 && i === 0)); });
  }
  if (reduce) { qSecs.forEach(function (s) { s.style.setProperty('--q', 1); }); cards.forEach(function (c) { c.classList.add('is-on'); }); }

  /* smooth scrolling where motion is welcome */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', frame);
    var raf = function (time) { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) { var id = a.getAttribute('href'); var el = id === '#top' ? 0 : document.querySelector(id); if (el !== null) { e.preventDefault(); lenis.scrollTo(el, { offset: id === '#top' ? 0 : -20 }); } });
    });
  } else {
    var ticking = false;
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; frame(); }); } }, { passive: true });
  }
  window.addEventListener('resize', frame);
  frame();
})();
