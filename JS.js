// Hide .head on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const header = document.querySelector('.head');
let ticking = false;
let isDropdownHovered = false;

// Listen for mouseenter/mouseleave on dropdown menu
window.addEventListener('DOMContentLoaded', function() {
  // Mobile burger menu toggle
  const burger = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    function closeMenu(e) {
      if (!mobileMenu.classList.contains('open')) return;
      if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
        mobileMenu.classList.remove('open');
        document.removeEventListener('click', closeMenu);
      }
    }
    burger.addEventListener('click', function(e) {
      e.preventDefault();
      mobileMenu.classList.toggle('open');
      if (mobileMenu.classList.contains('open')) {
        setTimeout(() => document.addEventListener('click', closeMenu));
      } else {
        document.removeEventListener('click', closeMenu);
      }
    });
  }
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  dropdownMenus.forEach(menu => {
    menu.addEventListener('mouseenter', () => {
      isDropdownHovered = true;
    });
    menu.addEventListener('mouseleave', () => {
      isDropdownHovered = false;
    });
  });

    // Prevent dropdown menu links from navigating
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });

  // Logo scroll to top with custom speed
  function slowScrollToTop(duration) {
    const start = window.scrollY;
    const startTime = performance.now();
    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - progress));
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }
    requestAnimationFrame(scrollStep);
  }

  const logoLink = document.querySelector('.logo');
  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.preventDefault();
      slowScrollToTop(300); //ms
    });
  }
});

function handleScroll() {
  const currentScrollY = window.scrollY;
  if (!isDropdownHovered && currentScrollY > lastScrollY && currentScrollY > 70) {
    // Scrolling down and not hovering dropdown
    header.style.transform = 'translateY(-100%)';
    header.style.transition = 'transform 0.3s';
  } else {
    // Scrolling up or hovering dropdown
    header.style.transform = 'translateY(0)';
    header.style.transition = 'transform 0.3s';
  }
  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});
