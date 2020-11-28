import './hoc/service'
import {mobChecker} from "./lib";
import inDevPopup from './ui/Popups/InDevPopup';

const BODY = document.body;

let isMobileView;

if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.src = img.dataset.src
    })
} else {
    require.ensure([], require => {
        require('lazysizes')
    })
}

document.addEventListener("DOMContentLoaded", () => {
    let lazyloadNodes;
    if ("IntersectionObserver" in window) {
        lazyloadNodes = document.querySelectorAll(".lazy")
        const nodeObserver = new IntersectionObserver(entries => {
            entries.forEach( entry => {
                if (entry.isIntersecting) {
                    const node = entry.target
                    node.classList.remove("lazy")
                    nodeObserver.unobserve(node)
                }
            })
        })
        lazyloadNodes.forEach(node => nodeObserver.observe(node))
    } else {
        let lazyloadThrottleTimeout
        lazyloadNodes = document.querySelectorAll(".lazy")

        const lazyload = () => {
            if(lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout)
            }

            lazyloadThrottleTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                lazyloadNodes.forEach(node => {
                    if(node.offsetTop < (window.innerHeight + scrollTop)) {
                        node.classList.remove('lazy')
                    }
                });
                if(lazyloadNodes.length === 0) {
                    document.removeEventListener("scroll", lazyload)
                    window.removeEventListener("resize", lazyload)
                    window.removeEventListener("orientationChange", lazyload)
                }
            }, 20)
        }
        document.addEventListener("scroll", lazyload)
        window.addEventListener("resize", lazyload)
        window.addEventListener("orientationChange", lazyload)
    }
})

isMobileView = mobChecker(1024);

setTimeout(function() {
    BODY.classList.remove('no-start-animations');
}, 500);


document.querySelectorAll('.js-in-dev').forEach(link => {
    link.addEventListener('click', e =>{
        e.preventDefault()
        const popup = new inDevPopup()
        popup.message = 'Мы работаем над новым функционалом, в скором времени все заработает'
        popup.open()
    })
})
