import Swiper, {Pagination, Autoplay} from 'swiper';
import Odometer from 'odometer';

const workSec = () => {
    Swiper.use([Pagination, Autoplay])
    const secWorkNode = document.querySelector('section.sec-work'),
          secWorkSlider = document.getElementById('sec-work-slider'),
          workFilterBtn = secWorkNode.querySelectorAll('.js-work-filter'),
          workCounter = secWorkNode.querySelector('#sec-work-count')
    const odometerOptions = {
        el: workCounter,
        duration: 300,
        value: 101,
        format: '(dd)',
    }
    const swiperOptions = {
        loop: true,
        speed: 600,
        observer: true,
        autoplay: {
            delay: 5000
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    }

    const od = new Odometer(odometerOptions);
    let swiper = new Swiper(secWorkSlider, swiperOptions)

    const changeSlide = event => {
        const target = event.currentTarget;
        workFilterBtn.forEach(btn => btn.classList.remove('is-active'));
        target.classList.add('is-active');
        secWorkFilter(target.dataset.key)
    };
    const secWorkFilter = (key) => {
        secWorkNode.querySelectorAll('.sec-work__slide').forEach(node => {
            node.className = `sec-work__slide swiper-slide${+node.dataset.groupKey === +key ? '': '-hidden'}`
        })
        swiper.destroy()
        swiper = new Swiper(secWorkSlider, swiperOptions)
        swiper.autoplay.start()
        od.update(+key + 100);
    };

    secWorkFilter(1); // Init slider
    workFilterBtn.forEach(element => element.addEventListener('click', changeSlide));
};

export default workSec;

