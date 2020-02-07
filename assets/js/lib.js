export const mobChecker = (maxWinWidth) =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent) ||
        window.matchMedia('(max-width: ' + maxWinWidth + 'px)').matches ||
        document.body.clientWidth < maxWinWidth;

