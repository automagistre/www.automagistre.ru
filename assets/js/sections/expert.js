import { initParallaxAnimation, nodesObserver } from '../lib';
import $ from "jquery";
import "slick-carousel";
import 'modal-video/js/jquery-modal-video';


const initSlickSlider = () => {
    const slickOptions = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type=\'button\' class=\'slick-arrow slick-prev\'></button>',
        nextArrow: '<button type=\'button\' class=\'slick-arrow slick-next\'></button>',
    };
    const $secExpertSlider = $('#sec-expert-slider'),
        expertBtn = document.querySelectorAll('.js-expert-btn');
    const changeSlide = event => {
        const target = event.currentTarget;
        $secExpertSlider.slick('slickGoTo', +target.dataset.num - 1, false);
    };
    if ($secExpertSlider.length) {
        $secExpertSlider.slick(slickOptions);
        expertBtn.forEach(btn => btn.addEventListener('click', changeSlide));
    } else {
        throw new Error('Fail init slick slider on sec-expert');
    }
    import('../../less/2_plugins/modal-video.min').then(()=>{
        const modalVideoOptions = {
            'channel': 'youtube',
            'autoplay': 1,
            'controls': 0,
            'enablejsapi': 1,
            'showinfo': 0,
            'nocookie': true,};
        $('.js-expert-video').modalVideo(modalVideoOptions);
    })
};

const expertSec = () => {
    const expertBackNode = document.querySelector('#sec-expert-back')
    const expertBackImages = [
        {
            node: expertBackNode.querySelector('.sec-expert__lt-img_01'),
            img: 'lt-img_01.png',
            position: 14
        },
        {
            node: expertBackNode.querySelector('.sec-expert__lt-img_02'),
            img: 'lt-img_02.png',
            position: 12
        },
        {
            node: expertBackNode.querySelector('.sec-expert__lt-img_03'),
            img: 'lt-img_03.png',
            position: 10
        },
        {
            node: expertBackNode.querySelector('.sec-expert__lt-img_04'),
            img: 'lt-img_04.png',
            position: 8
        },
        {
            node: expertBackNode.querySelector('.sec-expert__lt-img_05'),
            img: 'lt-img_05.png',
            position: 6
        },
        {
            node: expertBackNode.querySelector('.sec-expert__lt-img_06'),
            img: 'lt-img_06.png',
            position: 4
        },
        {
            node: expertBackNode.querySelector('.sec-expert__lt-img_07'),
            img: 'lt-img_07.png',
            position: 2
        },
        {
            node: expertBackNode.querySelector('.sec-expert__rt-img_01'),
            img: 'rt-img_01.png',
            position: 12
        },
        {
            node: expertBackNode.querySelector('.sec-expert__rt-img_02'),
            img: 'rt-img_02.png',
            position: 10
        },
        {
            node: expertBackNode.querySelector('.sec-expert__rt-img_03'),
            img: 'rt-img_03.png',
            position: 8
        },
        {
            node: expertBackNode.querySelector('.sec-expert__rt-img_04'),
            img: 'rt-img_04.png',
            position: 6
        },
        {
            node: expertBackNode.querySelector('.sec-expert__rt-img_05'),
            img: 'rt-img_05.png',
            position: 4
        },
        {
            node: expertBackNode.querySelector('.sec-expert__rt-img_06'),
            img: 'rt-img_06.png',
            position: 2
        },
    ]
    const imgPromises = []
    for (let img of expertBackImages) {
        imgPromises.push(import(`../../img/sec-expert/${img.img}`).then(res=>{
            img.node.src = res.default
        }))
    }
    Promise.all(imgPromises).then(()=>{
        nodesObserver(document.querySelectorAll('section.sec-features'), ()=> {
            initParallaxAnimation(expertBackNode, expertBackImages)
        })
    })
    initSlickSlider()
};

export default expertSec;
