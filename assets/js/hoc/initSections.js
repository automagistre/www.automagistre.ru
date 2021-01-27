export default function initSections() {
  if (document.querySelector('section.sec-start')) {
    import('../sections/start').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-expert')) {
    import('../sections/expert').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-features')) {
    import('../sections/features').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-faq')) {
    import('../sections/faq').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-work')) {
    import('../sections/work').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-gallery')) {
    import('../sections/gallery').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-map')) {
    import('../sections/map').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-services')) {
    import('../sections/services').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-experience')) {
    import('../sections/experience').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-master')) {
    import('../sections/master').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-partners')) {
    import('../sections/partners').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-happen')) {
    import('../sections/happen').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-costing')) {
    import('../sections/costing/costing').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-reviews')) {
    import('../sections/reviews').then((sec) => sec.default());
  }

  if (document.querySelector('#reviews-grid')) {
    import('../pages/reviews').then((sec) => sec.default());
  }

  if (document.querySelector('#tire-service')) {
    import('../sections/tire-service').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-intro')) {
    import('../sections/intro').then((sec) => sec.default());
  }

  if (document.querySelector('#js-blog-page')) {
    import('../../less/3_blocks/block_blog-card');
    import('../../less/3_blocks/block_blog-list');
  }

  if (document.querySelector('#js-article-page')) {
    import('../pages/article').then((sec) => sec.default());
  }

  if (document.querySelector('section.sec-announces')) {
    import('../sections/announces').then((sec) => sec.default());
  }
}
