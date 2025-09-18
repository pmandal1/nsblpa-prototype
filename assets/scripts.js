document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');

 
  const body = document.body;
  let scrollPos = 0;

  function lockBodyScroll() {
    scrollPos = window.scrollY || window.pageYOffset || 0;
   
    body.style.top = `-${scrollPos}px`;
    body.classList.add('nav-open');
  }

  function unlockBodyScroll() {
    body.classList.remove('nav-open');
    
    const top = parseInt(body.style.top || '0', 10) || 0;
    body.style.top = '';
    window.scrollTo(0, Math.abs(top));
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const spans = navToggle.querySelectorAll('span');

      const opening = !navMenu.classList.contains('active');
      navMenu.classList.toggle('active');

      if (opening) {
        lockBodyScroll();
       
        if (spans.length >= 3) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
      } else {
        unlockBodyScroll();
      
        if (spans.length >= 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });

    
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          unlockBodyScroll();
          const spans = navToggle.querySelectorAll('span');
          if (spans.length >= 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
          }
        }
      });
    });
  }


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
       
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          unlockBodyScroll();
          const spans = navToggle.querySelectorAll('span');
          if (spans.length >= 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
          }
        }
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });

  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const status = document.getElementById('contactStatus');
      if (status) {
        status.textContent = 'Sending…';
        setTimeout(() => {
          status.textContent = 'Thank you — your message has been received.';
          contactForm.reset();
        }, 900);
      }
    });
  }


  document.querySelectorAll('.video-section-inner').forEach(el => {
    el.addEventListener('click', () => {
      alert('Video playback placeholder — implement modal/video player here.');
    });
  });
});
(function bgParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq && mq.matches) return;

  
  function onScroll() {
    const rect = hero.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const visible = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
    const offset = (visible - 0.5) * 6; 
    hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

 
  onScroll();
})();