import './particles';
import config from '../data/particles.config.json';

const intersectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      element.classList.replace('invisible', 'visible');
      observer.unobserve(element);
    }
  });
});

window.addEventListener('load', () => {
  particles(document.querySelector('.particles'), config);
  document.querySelector('#scroll-next').addEventListener('click', () => {
    document.querySelector('main').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
  document.querySelectorAll('.card.invisible').forEach((element) => {
    intersectionObserver.observe(element);
  });
});
