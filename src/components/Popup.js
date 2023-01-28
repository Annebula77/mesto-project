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

setEventListeners() {
    this._popupSelector.querySelector('.pop-up__closure').addEventListener('click', () => this.closePopup());
    this._popupSelector.addEventListener('mousedown', (evt) => this._closeOnOverlay(evt));
}

_closeOnOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    this.closePopup();
  }
}
_closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    this.closePopup();
      }
    }
}
