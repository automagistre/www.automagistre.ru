class Header {
  lastScrollY = 0;
  navBarHeight = 0;
  isScrolled = false;
  navDown = true;

  init()  {
    document.addEventListener('scroll', ()=> this.__toggleHeader());
    this.header = document.getElementById('header-line');
    this.navBarHeight = this.header.offsetHeight
  };

  __update(newState) {
    newState();
    const headerClasses = this.header.classList;
    headerClasses.toggle('is-scrolled', this.isScrolled);
    headerClasses.toggle('nav-up', !this.navDown);
    headerClasses.toggle('nav-down', this.navDown);
  };

  __toggleHeader() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop,
        delta = 5;
    if (Math.abs(this.lastScrollY - currentScroll) <= delta) return;
    this.__update(()=> this.isScrolled = currentScroll > 150);
    if (currentScroll > this.lastScrollY && currentScroll > this.navBarHeight * 5) {
      this.__update(()=> this.navDown = false);
    } else {
      if (currentScroll + window.innerHeight  <= document.body.scrollHeight) this.__update(()=> this.navDown = true);
    }
    if (currentScroll + window.innerHeight + 5 >= document.body.scrollHeight) this.__update(()=> this.navDown = true);
    this.lastScrollY = currentScroll
  };
}

export default Header;
