import './particles';

window.addEventListener('load', () => {
  document.querySelector('#scroll-next').addEventListener('click', () => {
    document.querySelector('main').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
