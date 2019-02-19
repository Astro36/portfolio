import './particles';
import './render';
import particlesConfig from '../data/particles.config.json';
import activityImages from '../images/activity/*.*';

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
      const { src } = element.dataset;
      const file = src.split('/').reverse()[0];
      const fileName = file.replace(/\..+$/, '');
      const fileExtension = file.match(/\.(.+)$/)[1];
      if (fileName in activityImages) {
        element.src = activityImages[fileName][fileExtension];
      } else {
        element.src = src;
      }
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
