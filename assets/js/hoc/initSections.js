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
    require.ensure([], require => {
      require('../sections/faq').default();
    })
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
    require.ensure([], require => {
      require('../sections/map').default();
    })
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
    require.ensure([], require => {
      require('../sections/master').default();
    })
  }
}
