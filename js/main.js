(function () {
  var CONFIG = { animacoes: true, barraProgresso: true, abrirPropostas: false };

  var q = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var bar = document.querySelector('[data-progress]');
  if (bar && !CONFIG.barraProgresso) bar.style.display = 'none';

  /* --- reveal ao rolar --- */
  var reveals = q('[data-reveal]'), io = null;
  if (CONFIG.animacoes && 'IntersectionObserver' in window) {
    reveals.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      el.style.transition = 'opacity .75s cubic-bezier(.22,.8,.3,1), transform .75s cubic-bezier(.22,.8,.3,1)';
    });
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var d = parseInt(e.target.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { e.target.style.opacity = '1'; e.target.style.transform = 'none'; }, d);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* --- acordeões das propostas --- */
  function setOpen(card, open) {
    var detail = card.querySelector('[data-detail]');
    var chev = card.querySelector('[data-chev]');
    if (!detail) return;
    if (open) {
      detail.style.maxHeight = (detail.scrollHeight + 40) + 'px';
      detail.style.opacity = '1';
      if (chev) { chev.style.transform = 'rotate(135deg)'; chev.style.background = '#003B77'; chev.style.color = '#fff'; }
    } else {
      detail.style.maxHeight = '0px';
      detail.style.opacity = '0';
      if (chev) { chev.style.transform = 'none'; chev.style.background = '#eef3fa'; chev.style.color = '#003B77'; }
    }
    card.dataset.open = open ? '1' : '0';
  }
  var cards = q('[data-acc]');
  cards.forEach(function (card) {
    var head = card.querySelector('[data-acchead]');
    if (head) head.addEventListener('click', function () { setOpen(card, card.dataset.open !== '1'); });
    if (CONFIG.abrirPropostas) setTimeout(function () { setOpen(card, true); }, 60);
  });
  window.addEventListener('resize', function () {
    cards.forEach(function (c) { if (c.dataset.open === '1') setOpen(c, true); });
  });

  /* --- header, parallax e scroll-spy --- */
  var nav = document.querySelector('[data-nav]');
  var navLogo = document.querySelector('[data-navlogo]');
  var links = q('[data-spy]');
  var pills = q('[data-pill]');
  var sections = q('[data-section]');
  var wave = document.querySelector('[data-wave]');
  var doc = document.scrollingElement || document.documentElement;

  function onScroll() {
    var y = window.scrollY || doc.scrollTop;
    if (bar && CONFIG.barraProgresso) {
      var max = doc.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    if (nav) {
      var solid = y > 80;
      nav.style.background = solid ? 'rgba(0,42,85,.92)' : 'rgba(0,42,85,0)';
      nav.style.backdropFilter = solid ? 'blur(12px)' : 'blur(0px)';
      nav.style.boxShadow = solid ? '0 6px 24px rgba(0,0,0,.18)' : 'none';
      nav.style.paddingTop = solid ? '9px' : '14px';
      nav.style.paddingBottom = solid ? '9px' : '14px';
    }
    if (navLogo) navLogo.style.height = (y > 80 ? 34 : 44) + 'px';
    if (wave && CONFIG.animacoes) wave.style.transform = 'translateY(' + Math.min(y * 0.18, 120) + 'px)';

    var active = '';
    sections.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= 220 && r.bottom > 220) active = s.id;
    });
    links.forEach(function (a) {
      a.style.color = a.getAttribute('data-spy') === active ? '#FAD200' : 'rgba(255,255,255,.72)';
    });
    pills.forEach(function (a) {
      var on = a.getAttribute('data-pill') === active;
      a.style.background = on ? '#003B77' : 'transparent';
      a.style.color = on ? '#fff' : '#4a5a75';
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(onScroll);
})();
