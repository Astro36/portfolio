import './particles';
import './render';
import particlesConfig from '../data/particles.config.json';

const fadeAnimationObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      element.classList.replace('invisible', 'visible');
      observer.unobserve(element);
    }
  });
});

const lazyImageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      element.src = element.dataset.src;
      element.classList.remove('lazy');
      observer.unobserve(element);
    }
  });
});

window.addEventListener('load', () => {
  particles(document.querySelector('#particles'), particlesConfig);
  document.querySelector('#scroll-next').addEventListener('click', () => {
    document.querySelector('main').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
  document.querySelectorAll('.invisible').forEach((element) => {
    fadeAnimationObserver.observe(element);
  });
  document.querySelectorAll('.lazy').forEach((element) => {
    lazyImageObserver.observe(element);
  });
});
