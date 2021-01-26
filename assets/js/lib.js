import Odometer from 'odometer';
import gsap from 'gsap';
import ServerData from './helpers/ServerData';

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
                    gsap.to(image.node,{duration: 2, y: thisOffset / image.position, force3D: true, delay: 0.1});
                }
            }
        };
        document.addEventListener('scroll', featuresParr)
    } else {
        throw new Error('Failed init parallax in sec-features')
    }
};

export const updateOdometerData = async node => {
    const ordersOdometerNode = node.querySelector('[data-type="orders"]'),
          vehiclesOdometerNode = node.querySelector('[data-type="vehicles"]')

    const serverData = new ServerData()
    const {response, data: {orders, vehicles}} = await serverData.getStats()
    if (response === 200) {
        ordersOdometerNode.dataset.value = orders
        ordersOdometerNode.innerHTML = `${orders - orders % 50}`

        vehiclesOdometerNode.dataset.value = vehicles
        vehiclesOdometerNode.innerHTML = `${vehicles - vehicles % 50}`
    }
}

export const odometer = odNode => {
    const odometers = odNode.querySelectorAll('.js-odometer')
    nodesObserver(odometers, node => {
        node.classList.remove('is-hidden')
        const od = new Odometer({
            auto: false,
            el: node,
            value: node.innerText,
            format: '( ddd)',
            duration: 1500
        })
        od.update(node.dataset.value)
    })
}

export const initTabs = (tabsID, bodyID) => {
    const changeTab = event => {
        event.preventDefault()
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
        },)
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

export const declOfNum = (number, titles) => {
    let cases = [2, 0, 1, 1, 1, 2]
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]
}
