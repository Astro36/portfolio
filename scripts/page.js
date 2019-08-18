const pageWrapper = document.querySelector('.page-wrapper');
const pageStart = document.querySelector('#start');
const pagePrev = document.querySelector('#previous');
const pageNext = document.querySelector('#next');
const pages = Array.from(document.querySelectorAll('.page'));

const { hash } = window.location;

let currentPage = 0;

const onPageLoaded = (pageIndex) => {
  Array.from(pages[pageIndex].querySelectorAll('img.lazy'))
    .filter((image) => image.dataset.src)
    .forEach((image) => {
      image.src = image.dataset.src;
      image.classList.remove('lazy');
    });
};

const onPageChanged = (pageIndex) => {
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
  const page = pages[pageIndex];
  pageWrapper.scrollLeft = page.offsetLeft;
  if (!page.dataset.loaded) {
    page.dataset.loaded = true;
    onPageLoaded(pageIndex);
  }
  onPageChanged(pageIndex);
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

if (hash) {
  const pageIndex = Math.floor(hash.substr(1));
  if (pageIndex >= 0 && pageIndex < pages.length) {
    currentPage = pageIndex;
    goPage(currentPage);
  } else {
    goPage(0);
  }
} else {
  goPage(0);
}
