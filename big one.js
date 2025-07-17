// Hide .head on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const header = document.querySelector('.head');
let ticking = false;

function handleScroll() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
    header.style.transition = 'transform 0.3s';
  } else {
    // Scrolling up
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
