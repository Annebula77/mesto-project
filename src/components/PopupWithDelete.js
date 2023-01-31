import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup  {
  constructor(popupSelector, {deleteCallback}) {
    super(popupSelector);
    this._deleteCallback = deleteCallback;
    this._button = this._popupSelector.querySelector('#confirmDelete');
    this._functionForDelete = this._functionForDelete.bind(this);
  };

  openPopup(evt) {
    super.openPopup();
    this._cardToDelete = evt.target.closest('.element');
    this.setEventListeners();
  };

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', this._functionForDelete);
  };

  _functionForDelete() {
    this._deleteCallback(this._cardToDelete);
  };

  removeEventListeners() {
    if (this._confirmButton != undefined) {
      this._confirmButton.removeEventListener('click', this._functionForDelete);
    }
  };
};
