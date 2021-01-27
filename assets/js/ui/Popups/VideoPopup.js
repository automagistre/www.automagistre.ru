import YTplayer from 'yt-player';
import Popup from './Popup';

class VideoPopup extends Popup {
  constructor(videoId) {
    super();
    this._videoId = videoId;
  }

  renderPopupBody() {
    return `<div class="popup__video">
                <div class="popup__youtube js-popbox-youtube"></div>
            </div>`;
  }

  async onOpen() {
    const opt = {
      width: 640,
      height: 360,
      autoplay: true,

    };
    const wrapper = this._node.querySelector('.popup__wrap');
    wrapper.classList.add('for_video');
    this.player = new YTplayer(this._node.querySelector('.js-popbox-youtube'), opt);
    await this.player.load(this._videoId);
    this.player.play();
  }
}

export default VideoPopup;
