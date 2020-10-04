const pageWrapper = document.querySelector('.page-wrapper');
const pageStart = document.querySelector('#start');
const pagePrev = document.querySelector('#previous');
const pageNext = document.querySelector('#next');
const pages = Array.from(document.querySelectorAll('.page'));
const scrollWrapper = document.querySelector('.page-wrapper');

const FIRST_PAGE_INDEX = 0;
const LAST_PAGE_INDEX = pages.length - 1;

let currentPage = 0;

const smoothScroll = (smooth) => {
  scrollWrapper.style.scrollBehavior = smooth ? 'smooth' : 'auto';
};

const onPageLoaded = (pageIndex) => {
  Array.from(pages[pageIndex].querySelectorAll('img.lazy'))
    .filter((image) => image.dataset.src)
    .forEach((image) => {
      image.src = image.dataset.src;
      image.classList.remove('lazy');
    });
};

const onPageChanged = (pageIndex) => {
  if (pageIndex === FIRST_PAGE_INDEX) {
    window.history.pushState('', document.title, window.location.href.replace(window.location.hash, ''));
    pagePrev.style.opacity = 0;
    pageNext.style.opacity = 0;
  } else {
    window.location.hash = `#${pageIndex}`;
    pagePrev.style.opacity = 1;
    pageNext.style.opacity = pageIndex === LAST_PAGE_INDEX ? 0 : 1;
  }
  gtag('config', 'UA-140031790-2', {
    page_path: pageIndex === 0 ? '/' : `/#${pageIndex}`,
  });
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

const goPageInstant = (pageIndex) => {
  smoothScroll(false);
  goPage(pageIndex);
  smoothScroll(true);
};

const goPreviousPage = () => {
  if (currentPage > FIRST_PAGE_INDEX) {
    currentPage -= 1;
    goPage(currentPage);
  }
};

const goNextPage = () => {
  if (currentPage < LAST_PAGE_INDEX) {
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

window.addEventListener('resize', () => goPageInstant(currentPage));

if (window.location.hash) {
  const pageIndex = Number(window.location.hash.substr(1));
  if (pageIndex >= 0 && pageIndex < pages.length) {
    currentPage = pageIndex;
    goPageInstant(currentPage);
  } else {
    goPage(0);
  }
} else {
  goPage(0);
}
