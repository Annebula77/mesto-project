import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._form = this._popup.querySelector('.form');
    this._formList = this._form.querySelectorAll('.form__input');
  };

  closePopup() {
    super.closePopup();
    this._form.reset();
  };

  _getInputValues() {
    this._inputValues = {};
    this._formList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._callback(evt, this._getInputValues());
    });
  };

};
