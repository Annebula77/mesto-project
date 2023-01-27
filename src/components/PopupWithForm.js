import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
  }
  setEventListeners(formElement) {
    super.setEventListeners();
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._callback(this._getInputValues())
    });

  }

  closePopup(formElement) {
    super.closePopup();
    formElement.reset();
  }


  _getInputValues(inputList) {
    const inputListValuesList = [];
    inputList.forEach((item) => {
    inputListValuesList.push(item.value)
  });

  return inputListValuesList;
  }

}
