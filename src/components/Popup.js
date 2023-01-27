
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.closePopup = this.closePopup.bind(this);
  }
openPopup() {
  this._popupSelector.classList.add('pop-up_opened');
  document.addEventListener('keydown', this.closePopupByEsc);
 };

closePopup() {
   this._popupSelector.classList.remove('pop-up_opened');
   document.removeEventListener('keydown', this.closePopupByEsc);
};

setEventListeners () {
    this._popupSelector.addEventListener('click', (evt) => this._closeByXBtn(evt));
}

_closeByXBtn(evt) {
    if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__closure')) {
        this.closePopup();
    }
};


_closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    if(document.querySelector('.pop-up_opened')) {
      this.closePopup();
    }
    }
  }
}
