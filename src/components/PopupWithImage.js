import Popup from "./Popup.js";
import { imagePop, captionPop} from "../utils/utils.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = imagePop;
    this._cardTitle = captionPop;
  }
  openPopup(image, caption) {
    this._cardImage.src = image.src;
    this._cardImage.alt = image.alt;
    this._cardTitle.textContent = caption.textContent;
    super.openPopup();
   };

}
