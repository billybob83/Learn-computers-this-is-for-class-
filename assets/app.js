// Respect prefers-reduced-motion
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal on scroll (Intersection Observer)
(function initReveal(){
  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

// Active nav link
(function highlightActive(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.links a').forEach(a=>{
    const href = a.getAttribute('href');
    if (href && href.endsWith(path)) a.classList.add('active');
  });
})();

// Mobile nav toggle
(function mobileNav(){
  const btn = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if(!btn || !links) return;
  btn.addEventListener('click', ()=>{
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close on outside click
  document.addEventListener('click', (e)=>{
    if(!links.classList.contains('open')) return;
    if(!e.target.closest('.links') && !e.target.closest('.nav-toggle')){
      links.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });
})();