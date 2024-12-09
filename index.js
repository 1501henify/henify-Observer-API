//Fenster beim Laden einblenden(Fade-in-Effekt)
window.onload = () => document.body.classList.add('fade-in');
window.onbeforeunload = () => document.body.classList.add('fade-out');

//Nach oben CONST
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', (event) => {
  event.preventDefault();
  smoothScrollToTop();
});

function smoothScrollToTop() {
  const scrollDuration = 600;
  const scrollStop = -window.scrollY / (scrollDuration / 16);
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStop);
    } else {
      clearInterval(scrollInterval);
    }
  }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
  function animateCount(element, target, duration, hasPlus) {
    let start = 0;
    const increment = Math.ceil(target / (duration / 16)); // Inkrement pro Frame
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target; // Stellt sicher, dass der Endwert dem ziel entspricht.
        clearInterval(interval); // Stop das intervall
      }
      element.textContent = hasPlus
        ? `+${start.toLocaleString()}`
        : start.toLocaleString(); // Add "+" für Ziel mit "+"
    }, 16); // Flüssige Animation mit 16ms Updates
  }

  // Beobachte den Zähler, wenn er ins Sichtfeld kommt.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const text = counter.textContent.trim();
          const hasPlus = text.startsWith('+');
          const targetText = text.replace(/[^0-9]/g, '');
          const target = parseInt(targetText, 10);

          counter.classList.add('in-view');

          counter.textContent = hasPlus ? '+0' : '0';

          animateCount(counter, target, 2000, hasPlus);

          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.counter').forEach((counter) => {
    observer.observe(counter);
  });
});
