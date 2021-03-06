import animateScrollTo from 'animated-scroll-to';

class ScrollToTop {
  visible = false;

  constructor() {
    const scrollButton = document.createElement('a');
    scrollButton.className = 'scroll-top';
    scrollButton.title = 'Вверх';
    scrollButton.onclick = () => animateScrollTo(0);

    document.body.append(scrollButton);
    this.scrollButton = scrollButton;
    this.setVisibility();
    document.addEventListener('scroll', () => this.setVisibility());
  }

  setVisibility = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 150 && this.visible === false) {
      this.visible = !this.visible;
    }
    if (scrollTop <= 150 && this.visible === true) {
      this.visible = !this.visible;
    }
    this.update();
  };

  update() {
    this.scrollButton.classList.toggle('is-active', this.visible);
  }
}

export default ScrollToTop;
