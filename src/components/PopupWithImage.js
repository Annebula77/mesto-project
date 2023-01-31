import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = document.querySelector('.pop-up__image');
    this.popupCaption = document.querySelector('.pop-up__caption');
  };

  openPopup(name, link) {
    super.openPopup();
    this.popupCaption.alt = name;
    this.popupImage.src = link;
    this.popupCaption.textContent = name;
  };
};
