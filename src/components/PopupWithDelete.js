import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup  {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
  }
setEventListeners() {
  super.setEventListeners();
  this._cardForDelete = evt.target.closest('.element');
  this._popupSelector.querySelector('#confirmDelete').addEventListener('click', () => { this._callback(this._cardToDelete) } );
}
}
