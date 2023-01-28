import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
  }

  closePopup() {
    super.closePopup();
    this._popupSelector.querySelector('.form').reset();
  }
  setEventListeners() {
    super.setEventListeners();
      this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues())
    });

  }
  _getInputValues() {
    this._inputListValuesList = Array.from(this._popupSelector.querySelectorAll('.form__input'));
    this._inputValues = {};
    this._inputListValuesList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
  }
/*
  _getInputValues(inputList) {
    const inputListValuesList = [];
    inputList.forEach((item) => {
    inputListValuesList.push(item.value)
  });

  return inputListValuesList;
  }
*/
}
