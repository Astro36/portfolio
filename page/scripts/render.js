/* eslint-disable import/no-unresolved */
import projects from '../data/projects.json';
import skills from '../data/skills.json';
import images from '../images/*.svg';

const createBadgeHtml = text => `<span class="badge">${text}</span>`;

const createLicenseBadgeHtml = (license) => {
  if (license) {
    let text = license;
    if (license.length <= 4) {
      text += ' License';
    }
    return `<span class="license-badge">${text}</span>`;
  }
  return '';
};

const createLogoHtml = (logo, size = '24px') => {
  const file = logo.toLowerCase();
  if (file in images) {
    return `<img class="logo lazy" data-src="${images[file]}" title="${logo}" alt="${logo}" width="${size}" height="${size}"/>`;
  }
  return `<img class="logo lazy" data-src="${images.photo}" title="${logo}" alt="${logo}" width="${size}" height="${size}"/>`;
};

const createProjectCardHtml = ({
  name, description, tech, license, url,
}) => {
  let html = '<div class="card elevation invisible">';
  html += `<h2>${name} ${createLicenseBadgeHtml(license)}</h2>`;
  html += `<p>${description}</p>`;
  if (tech && Array.isArray(tech)) {
    html += tech.map(logo => createLogoHtml(logo)).join('');
  }
  if (url) {
    html += `<div class="actions"><a class="material-icons" href="${url}">call_made</a></div>`;
  }
  html += '</div>';
  return html;
};

const createProjectList = ({
  name, description, tech, license, url,
}) => {
  let html = '';
  html += '<li>';
  html += '<h3>';
  if (url) {
    html += `<a href="${url}">${name}</a> ${createLicenseBadgeHtml(license)} ${tech.map(logo => createLogoHtml(logo, '16px')).join('')}`;
  } else {
    html += `${name} ${createLicenseBadgeHtml(license)} ${createBadgeHtml('Private')} ${tech.map(logo => createLogoHtml(logo, '16px')).join('')}`;
  }
  html += '</h3>';
  html += `<span>${description}</span>`;
  html += '</li>';
  return html;
};

const projectSorter = (projectA, projectB) => projectA.name.localeCompare(projectB.name);

window.addEventListener('DOMContentLoaded', () => {
  // Skill Lists
  document.querySelector('#strong-skills')
    .insertAdjacentHTML('beforeend', skills.strong.map(skill => createLogoHtml(skill, '32px')).join(''));
  document.querySelector('#knowledgeable-skills')
    .insertAdjacentHTML('beforeend', skills.knowledgeable.map(skill => createLogoHtml(skill, '32px')).join(''));
  // Project Cards
  document.querySelector('#pinned-projects').innerHTML = projects.pinned
    .sort(projectSorter)
    .map(createProjectCardHtml)
    .join('');
  document.querySelector('#other-projects').innerHTML = projects.others
    .sort(projectSorter)
    .map(createProjectList)
    .join('');
});
