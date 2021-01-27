class LoadingSpinner {
  constructor(node, size = 0.6) {
    this._node = node;
    this._size = size;
  }

  show() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
                    <div class="spinner__wrapper">
                      <div class="spinner is-loading " style="transform: scale(${this._size})">
                          <div class="spinner__dot spinner__dot_01"></div><div class="spinner__dot spinner__dot_02"></div>
                          <div class="spinner__dot spinner__dot_03"></div><div class="spinner__dot spinner__dot_04"></div>
                          <div class="spinner__dot spinner__dot_05"></div><div class="spinner__dot spinner__dot_06"></div>
                          <div class="spinner__dot spinner__dot_07"></div><div class="spinner__dot spinner__dot_08"></div>
                      </div>
                    </div>`;
    this._spinnerNode = wrapper.firstElementChild;
    this._node.appendChild(this._spinnerNode);
  }

  remove() {
    this._spinnerNode.remove();
  }
}

export default LoadingSpinner;
