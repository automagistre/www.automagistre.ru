class Header {
  lastScrollY = 0;
  navBarHeight = 0;
  isScrolled = false;
  isVisible = true;
  isInit = false;

  constructor()  {
    const header = document.getElementById('header-line');
    if (header) {
      this.header = header;
      this.navBarHeight = header.offsetHeight;
      document.addEventListener('scroll', ()=> this._toggleHeader());
      this.isInit = true
    }
  };

  scrolledColor(isScrolled) {
    this.isScrolled = isScrolled;
    this.header.classList.toggle('is-scrolled', this.isScrolled);
  }

  hide() {
    this.isVisible = true;
    this.header.classList.remove('nav-down');
    this.header.classList.add('nav-up');
  }

  show() {
    this.isVisible = false;
    this.header.classList.remove('nav-up');
    this.header.classList.add('nav-down');
  }

  _toggleHeader() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop,
        delta = 5;
    if (Math.abs(this.lastScrollY - currentScroll) <= delta) return;
    this.scrolledColor(currentScroll > 150);
    if (currentScroll > this.lastScrollY && currentScroll > this.navBarHeight * 5) {
      this.hide();
    } else {
      if (currentScroll + window.innerHeight  <= document.body.scrollHeight) this.show();
    }
    if (currentScroll + window.innerHeight + 5 >= document.body.scrollHeight) this.show();
    this.lastScrollY = currentScroll
  };
}

export default Header;