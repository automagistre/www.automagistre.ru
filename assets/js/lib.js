import Odometer from 'odometer';
import TweenMax from 'gsap/TweenMax';

export const mobChecker = (maxWinWidth) =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent) ||
        window.matchMedia('(max-width: ' + maxWinWidth + 'px)').matches ||
        document.body.clientWidth < maxWinWidth;

const startParallax = element => {
    const winScroll = window.scrollY,
          winHeight = window.innerHeight;
    let secTop = element.getBoundingClientRect().top + pageYOffset,
        startLevel, stopLevel;
    startLevel = secTop - winHeight;
    stopLevel = secTop + winHeight;
    if (winScroll < startLevel || winScroll > stopLevel) return false;
    return  winScroll - startLevel;
};

export const initParallaxAnimation = (features, images) => {
    if (!mobChecker(1024) && features) {
        const featuresParr = () => {
            let thisOffset = startParallax(features);
            if (thisOffset) {
                for( let image of images) {
                    TweenMax.to(image.node,  2, {y: thisOffset / image.position, force3D: true, delay: 0.1});
                }
            }
        };
        document.addEventListener('scroll', featuresParr)
    } else {
        throw new Error('Failed init parallax in sec-features')
    }
};

export const odometer = odNode => {
    const startOdometer = () =>{
        odNode.querySelectorAll('.js-odometer').forEach(odElem => {
            odElem.classList.remove('is-hidden')
            let od = new Odometer({
                el: odElem,
                value: odElem.innerText,
                format: '( ddd)',
                duration: 3000,});
            od.update(odElem.dataset.value)
        })
    }
    nodesObserver([odNode], ()=> startOdometer())
}

export const initTabs = (tabsID, bodyID) => {
    const changeTab = event => {
        const secID = event.currentTarget.dataset.tab;
        tabsBtns.forEach(btn => btn.classList.remove('is-active'));
        event.currentTarget.classList.add('is-active');
        bodyItems.forEach(item => item.classList.remove('is-active'));
        bodySec.querySelector(`#${secID}`).classList.add('is-active');
    };
    const tabSec = document.querySelector(`#${tabsID}`),
          bodySec = document.querySelector(`#${bodyID}`);
    const tabsBtns = tabSec.querySelectorAll('.js-tabs-btn'),
          bodyItems = bodySec.querySelectorAll('.js-tabs-item');
    tabsBtns.forEach(btn => btn.addEventListener('click', changeTab))
};

export const script = (url) => {
    if (Array.isArray(url)) {
        let self = this;
        let prom = [];
        url.forEach(function (item) {
            prom.push(self.script(item));
        });
        return Promise.all(prom);
    }
    return new Promise(function (resolve, reject) {
        let r = false;
        let t = document.getElementsByTagName('script')[0];
        let s = document.createElement('script');

        s.type = 'text/javascript';
        s.src = url;
        s.async = true;
        s.onload = s.onreadystatechange = function () {
            if (!r && (!this.readyState || this.readyState === 'complete')) {
                r = true;
                resolve(this);
            }
        };
        s.onerror = s.onabort = reject;
        t.parentNode.insertBefore(s, t);
    });
};

export const nodesObserver = (nodes, callback) => {
    if ("IntersectionObserver" in window) {
        const nodeObserver = new IntersectionObserver(entries => {
            entries.forEach( entry => {
                if (entry.isIntersecting) {
                    const node = entry.target
                    callback(node)
                    nodeObserver.unobserve(node)
                }
            })
        },{threshold: 0.001})
        nodes.forEach(node => nodeObserver.observe(node))
    } else {
        let lazyloadThrottleTimeout

        const lazyload = () => {
            if(lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout)
            }

            lazyloadThrottleTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                nodes.forEach(node => {
                    if(node.offsetTop < (window.innerHeight + scrollTop)) {
                        callback(node)
                    }
                });
            }, 20)
        }
        document.addEventListener("scroll", lazyload)
        window.addEventListener("resize", lazyload)
        window.addEventListener("orientationChange", lazyload)
    }
}
