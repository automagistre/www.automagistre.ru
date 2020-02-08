import Odometer from 'odometer';

export const mobChecker = (maxWinWidth) =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent) ||
        window.matchMedia('(max-width: ' + maxWinWidth + 'px)').matches ||
        document.body.clientWidth < maxWinWidth;

export const odometer = className => {
    const odBlock = document.getElementsByClassName(className)[0];
    const startOdometer = () =>{
        if (odBlock.getBoundingClientRect().top + pageYOffset < pageYOffset + window.innerHeight - 100) {
            document.querySelectorAll('.js-odometer').forEach(odElem => {
                odElem.classList.remove('is-hidden');
                let od = new Odometer({
                    el: odElem,
                    value: odElem.innerText,
                    format: '( ddd)',
                    duration: 3000,});
                od.update(odElem.dataset.value);
                document.removeEventListener('scroll', startOdometer)
            })
        }
    };
    document.addEventListener('scroll', startOdometer);
};