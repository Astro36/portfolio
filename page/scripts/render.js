/* eslint-disable import/no-unresolved */
import projects from '../data/projects.json';
import skills from '../data/skills.json';
import images from '../images/*.svg';

const createLicenseBadgeHtml = (license) => {
  let text = license;
  if (!license.toLowerCase().includes('l')) {
    text += ' License';
  }
  return `<span class="license">${text}</span>`;
};

const createLogoHtml = (logo, size = '24px') => {
  const file = logo.toLowerCase();
  if (file in images) {
    return `<img class="logo lazy" data-src="${images[file]}" title=${logo} alt=${logo} width="${size}" height="${size}"/>`;
  }
  return `<img class="logo lazy" data-src="${images.photo}" title=${logo} alt=${logo} width="${size}" height="${size}"/>`;
};

window.addEventListener('DOMContentLoaded', () => {
  // Skill Lists
  document.querySelector('#strong-skills')
    .insertAdjacentHTML('beforeend', skills.strong.map(skill => createLogoHtml(skill, '32px')).join(''));
  document.querySelector('#knowledgeable-skills')
    .insertAdjacentHTML('beforeend', skills.knowledgeable.map(skill => createLogoHtml(skill, '32px')).join(''));
  // Project Cards
  const projectGrid = document.querySelector('#my-projects');
  let projectHtml = '';
  projects.sort((a, b) => a.name.localeCompare(b.name)).forEach(({
    name, description, tech, license, url,
  }) => {
    projectHtml += `<div class="card invisible"><h2>${name} ${createLicenseBadgeHtml(license)}</h2><p>${description}</p>`;
    if (tech && Array.isArray(tech)) {
      projectHtml += tech.map(logo => createLogoHtml(logo)).join('');
    }
    if (url) {
      projectHtml += `<div class="actions"><a class="material-icons" href="${url}">call_made</a></div>`;
    }
    projectHtml += '</div>';
  });
  projectGrid.innerHTML = projectHtml;
});
