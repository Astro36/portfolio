/* eslint-disable import/no-unresolved */
import './particles';
import particlesConfig from '../data/particles.config.json';
import projects from '../data/projects.json';
import images from '../images/*.svg';

const createLicenseTagHtml = (license) => {
  let text = license;
  if (!license.toLowerCase().includes('l')) {
    text += ' License';
  }
  return `<span class="license">${text}</span>`;
};

const createLogoHtml = (logo, size = '24px') => {
  const file = logo.toLowerCase();
  if (file in images) {
    return `<img class="logo lazy" data-src="${images[file]}" alt=${logo} width="${size}" height="${size}"/>`;
  }
  return logo;
};

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

window.addEventListener('DOMContentLoaded', () => {
  const projectGrid = document.querySelector('#my-projects');
  let html = '';
  projects.sort((a, b) => a.name.localeCompare(b.name)).forEach(({
    name, description, tech, license, url,
  }) => {
    html += `<div class="card invisible"><h2>${name} ${createLicenseTagHtml(license)}</h2><p>${description}</p>`;
    if (tech && Array.isArray(tech)) {
      html += tech.map(logo => createLogoHtml(logo)).join('');
    }
    if (url) {
      html += `<div class="actions"><a class="material-icons" href="${url}">call_made</a></div>`;
    }
    html += '</div>';
  });
  projectGrid.innerHTML = html;
});

window.addEventListener('load', () => {
  particles(document.querySelector('#particles'), particlesConfig);
  document.querySelector('#scroll-next').addEventListener('click', () => {
    document.querySelector('main').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
  document.querySelectorAll('.card.invisible').forEach((element) => {
    fadeAnimationObserver.observe(element);
  });
  document.querySelectorAll('.lazy').forEach((element) => {
    lazyImageObserver.observe(element);
  });
});
