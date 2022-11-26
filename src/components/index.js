import '../pages/index.css';
import { initialCards, profileData } from './array.js';
import { profilePopup, formElement, popupButtonOpen, profileName, profileJob, nameInput, jobInput, addButtonOpen, cardAddPopup, addFormElement, placeInput, linkInput, imageModal, imagePop, captionPop, closeButtons, modalWindows, openPopup, closePopup, openImageModal } from '../components/modal.js';
import { changeProfileData } from './utils.js';
import { cardsList, cardTemplate, cardBlock, createDefaultCard, likePlace, removeCard, addNewCard } from './card.js';
import { isValid, showInputError, hideInputError, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from './validtion.js';

 // добавление карточек из массива на страницу
 initialCards.forEach(item => {
  cardsList.prepend(createDefaultCard(item.link, item.name, ));
});

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
  });









