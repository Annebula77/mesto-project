export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
  }
  openPopup() {
    this._popupSelector.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._closePopupByEsc);
  };

  closePopup() {
    this._popupSelector.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._closePopupByEsc);
  };
  _closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  };
  setEventListeners() {
    this._popupSelector.querySelector('.pop-up__closure').addEventListener('mousedown', () => this.closePopup());
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target === this._popupSelector) {
        this.closePopup();
      };
    });
  };
}