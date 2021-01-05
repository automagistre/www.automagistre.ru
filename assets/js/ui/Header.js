let singleton = Symbol();
let singletonEnforcer = Symbol();

class Header {
  lastScrollY = 0;
  navBarHeight = 0;
  isScrolled = false;
  isVisible = true;
  isInit = false;
  isMobileMenuOpen = false;
  _isAlwaysHide = false;

  constructor(enforcer)  {

    if (enforcer !== singletonEnforcer){
      throw "Instantiation failed: use Singleton.getInstance() instead of new.";
    }

    this._headerNode = document.querySelector('#site-header')
    const header = document.getElementById('header-line');
    if (header) {
      this.header = header;
      this.navBarHeight = header.offsetHeight;
      document.addEventListener('scroll', ()=> this._toggleHeader());
      this.isInit = true
      this._toggleHeader();
    }

    this._initMobileMenu()

  };

  static get instance() {
    if (!this[singleton])
      this[singleton] = new Header(singletonEnforcer);
    return this[singleton];
  }

  whiteColor() {
    this.header.classList.add('is-white');
  }

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

  set isAlwaysHide(status) {
    this.hide()
    this._isAlwaysHide = Boolean(status)
  }

  get isAlwaysHide() {
    return this._isAlwaysHide
  }

  _toggleHeader() {
    if (this.isAlwaysHide) {
      if (this.isVisible) this.hide()
      return;
    }
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

  _initMobileMenu() {
    if(this._headerNode) {
      const mobileMenuButton = this._headerNode.querySelector('.js-mobmenu-toggle ')
      mobileMenuButton.addEventListener('click', ()=>{
        this.isMobileMenuOpen = !this.isMobileMenuOpen
        document.body.classList.toggle('is-cut', this.isMobileMenuOpen)
        mobileMenuButton.classList.toggle('is-open', this.isMobileMenuOpen)
        this._headerNode.classList.toggle('is-open', this.isMobileMenuOpen)

      })
    }
  }
}

export default Header;
