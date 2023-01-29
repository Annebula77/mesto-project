import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, caption) {
    super(popupSelector);
    this._image = image;
    this._caption = caption;
  }
  openPopup(name, link) {
    super.openPopup();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
   };
}
