import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, caption) {
    super(popupSelector);
    this._image = image;
    this._caption = caption;
  }
  openPopup() {
    this._image.src;
    this._image.alt;
    this._caption.textContent;
    super.openPopup();
   };

}
