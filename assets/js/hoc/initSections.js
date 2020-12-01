export default function initSections() {
  if (document.querySelector('section.sec-start')){
    require.ensure([], require => {
      require('../sections/start').default();
    })
  }

  if(document.querySelector('section.sec-expert')) {
    require.ensure([], require => {
      require('../sections/expert').default();
    })
  }

  if(document.querySelector('section.sec-features')) {
    require.ensure([], require => {
      require('../sections/features').default();
    })
  }

  if (document.querySelector('section.sec-faq')){
    import('../sections/faq').then(sec => sec.default())
  }

  if (document.querySelector('section.sec-work')){
    require.ensure([], require => {
      require('../sections/work').default();
    })
  }

  if (document.querySelector('section.sec-gallery')){
    require.ensure([], require => {
      require('../sections/gallery').default();
    })
  }

  if (document.querySelector('section.sec-map')){
    import('../sections/map').then(sec => sec.default())
  }

  if (document.querySelector('section.sec-services')){
    require.ensure([], require => {
      require('../sections/services').default();
    })
  }

  if (document.querySelector('section.sec-experience')){
    require.ensure([], require => {
      require('../sections/experience').default();
    })
  }

  if (document.querySelector('section.sec-master')){
    import('../sections/master').then(sec => sec.default())
  }

  if (document.querySelector('section.sec-partners')){
    import('../sections/partners').then(sec => sec.default())
  }

  if (document.querySelector('section.sec-happen')){
    require.ensure([], require => {
      require('../sections/happen').default();
    })
  }

  if (document.querySelector('section.sec-costing')){
    import('../sections/costing/costing').then(sec => sec.default())
  }
  if (document.querySelector('section.sec-reviews')){
    import('../sections/reviews').then(sec => sec.default())
  }
  if (document.querySelector('#reviews-grid')){
    require.ensure([], require => {
      require('../pages/reviews').default();
    })
  }
  if (document.querySelector('#tire-service')){
    require.ensure([], require => {
      require('../sections/tire-sevice').default();
    })
  }
  if (document.querySelector('section.sec-intro')){
    import('../sections/intro').then(sec => sec.default())
  }
}
