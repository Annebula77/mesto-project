export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
  }

  openPopup() {
    this._popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._closePopupByEsc);
  };

  closePopup() {
    this._popup.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._closePopupByEsc);
  };

  _closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._popup.querySelector('.pop-up__closure').addEventListener('mousedown', () => this.closePopup());
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup) {
        this.closePopup();
      };
    });
  };

};
