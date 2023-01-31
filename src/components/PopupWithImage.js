import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  };

  openPopup(name, link) {
    super.openPopup();
    this._name.alt = name;
    this._link.src = link;
    this._name.textContent = name;
  };

};
