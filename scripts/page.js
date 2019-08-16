/* eslint no-param-reassign: off */
const pageNavigation = document.querySelector('.page-nav');
const pageWrapper = document.querySelector('.page-wrapper');
const pages = Array.from(document.querySelectorAll('.page'));

let currentPage = 0;

const onPageUpdated = (pageIndex) => {
  if (pageIndex >= 1) {
    pageNavigation.style.visibility = 'visible';
  } else {
    pageNavigation.style.visibility = 'hidden';
  }
};

const goPreviousPage = () => {
  if (currentPage > 0) {
    currentPage -= 1;
    pageWrapper.scrollLeft = pages[currentPage].offsetLeft;
    onPageUpdated(currentPage);
  }
};

const goNextPage = () => {
  if (currentPage < pages.length - 1) {
    currentPage += 1;
    pageWrapper.scrollLeft = pages[currentPage].offsetLeft;
    onPageUpdated(currentPage);
  }
};

document.querySelector('#previous')
  .addEventListener('click', goPreviousPage);
document.querySelector('#next')
  .addEventListener('click', goNextPage);
document.querySelector('#start')
  .addEventListener('click', goNextPage);

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      goPreviousPage();
      break;
    case 'ArrowRight':
      goNextPage();
      break;
    case 'Tab':
      event.preventDefault();
      break;
    default:
  }
});

Array.from(document.querySelectorAll('img.lazy'))
  .forEach((image) => {
    image.src = image.dataset.src;
    image.classList.remove('lazy');
  });

onPageUpdated(0);
