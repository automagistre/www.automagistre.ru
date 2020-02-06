import './sections/start'

const body = document.body;

let isMobileView;

function mobChecker(maxWinWidth) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent) ||
        window.matchMedia('(max-width: ' + maxWinWidth + 'px)').matches ||
        document.body.clientWidth < maxWinWidth;
}

isMobileView = mobChecker(1024);
console.log(isMobileView);

setTimeout(function() {
    body.classList.remove('no-start-animations');
}, 500);

