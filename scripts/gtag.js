window.dataLayer = window.dataLayer || [];

export const GA_MEASUREMENT_ID = 'UA-140031790-2';

export const gtag = (...args) => {
  window.dataLayer.push(args);
};

export const pageview = (pageIndex) => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: pageIndex == 0 ? '/' : `/#${pageIndex}`,
  });
};

gtag('js', new Date());
