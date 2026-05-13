document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScroll();
  setupMobileNav();
  setupHeaderShadow();
  setupScrollAnimations();
});

function setupSmoothScroll() {
  const header = document.getElementById('site-header');
  const headerHeight = header ? header.offsetHeight : 0;

  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    link.addEventListener('click', (event) => {
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();

      const rect = target.getBoundingClientRect();
      const offset = window.scrollY + rect.top - headerHeight - 8;

      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    });
  });
}

function setupMobileNav() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('mobile-nav');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');

    if (isOpen) {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="fa-solid fa-bars text-lg" aria-hidden="true"></i>';
    } else {
      menu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.innerHTML = '<i class="fa-solid fa-xmark text-lg" aria-hidden="true"></i>';
    }
  });

  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="fa-solid fa-bars text-lg" aria-hidden="true"></i>';
    });
  });
}

function setupHeaderShadow() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const applyShadow = () => {
    if (window.scrollY > 2) {
      header.classList.add('shadow-md', 'border-slate-900');
    } else {
      header.classList.remove('shadow-md', 'border-slate-900');
    }
  };

  applyShadow();
  window.addEventListener('scroll', applyShadow, { passive: true });
}

function setupScrollAnimations() {
  const animated = document.querySelectorAll('[data-animate]');
  if (!animated.length) return;

  animated.forEach((el) => {
    el.classList.add('opacity-0', 'translate-y-4');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-animate-delay') || '0', 10);

          setTimeout(() => {
            el.classList.remove('opacity-0', 'translate-y-4');
            el.classList.add(
              'opacity-100',
              'translate-y-0',
              'transition',
              'duration-700',
              'ease-out'
            );
          }, delay);

          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  animated.forEach((el) => observer.observe(el));
}
