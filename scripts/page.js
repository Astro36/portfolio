/* eslint-disable no-param-reassign */
const pageWrapper = document.querySelector('.page-wrapper');
const pageStart = document.querySelector('#start');
const pagePrev = document.querySelector('#previous');
const pageNext = document.querySelector('#next');
const pages = Array.from(document.querySelectorAll('.page'));

const { hash } = window.location;

let currentPage = 0;

const onPageUpdated = (pageIndex) => {
  if (pageIndex === 0) {
    pagePrev.style.opacity = 0;
    pageNext.style.opacity = 0;
  } else if (pageIndex === pages.length - 1) {
    pagePrev.style.opacity = 1;
    pageNext.style.opacity = 0;
  } else {
    pagePrev.style.opacity = 1;
    pageNext.style.opacity = 1;
  }
};

const goPage = (pageIndex) => {
  pageWrapper.scrollLeft = pages[pageIndex].offsetLeft;
  onPageUpdated(pageIndex);
};

const goPreviousPage = () => {
  if (currentPage > 0) {
    currentPage -= 1;
    goPage(currentPage);
  }
};

const goNextPage = () => {
  if (currentPage < pages.length - 1) {
    currentPage += 1;
    goPage(currentPage);
  }
};

pageStart.addEventListener('click', goNextPage);
pagePrev.addEventListener('click', goPreviousPage);
pageNext.addEventListener('click', goNextPage);

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      goPreviousPage();
      break;
    case 'ArrowRight':
      goNextPage();
      break;
    default:
  }
});

window.addEventListener('resize', () => goPage(currentPage));

Array.from(document.querySelectorAll('img.lazy'))
  .filter((image) => image.dataset.src)
  .forEach((image) => {
    image.src = image.dataset.src;
    image.classList.remove('lazy');
  });

if (hash) {
  const pageIndex = Math.floor(hash.substr(1));
  if (pageIndex >= 0 && pageIndex < pages.length) {
    currentPage = pageIndex;
    goPage(currentPage);
  } else {
    onPageUpdated(0);
  }
} else {
  onPageUpdated(0);
}
