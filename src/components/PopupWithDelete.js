import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup  {
  constructor(popupSelector, {deleteCallback}) {
    super(popupSelector);
    this._deleteCallback = deleteCallback;
    this._button = this._popup.querySelector('#confirmDelete');
    this._functionForDelete = this._functionForDelete.bind(this);
  };

  openPopup(evt) {
    super.openPopup();
    this._cardToDelete = evt.target.closest('.element');
    this._button.addEventListener('click', this._functionForDelete);
  };

  closePopup() {
    super.closePopup();
    this._button.removeEventListener('click', this._functionForDelete);
  }

   _functionForDelete() {
    this._deleteCallback(this._cardToDelete);
  };

};
