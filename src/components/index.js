import '../pages/index.css';
import { initialCards, profileData } from './array.js';
import { openPopup, closePopup, closePopupByEsc } from '../components/modal.js';
import { createDefaultCard, likePlace, removeCard } from './card.js';
import { isValid, showInputError, hideInputError, hasInvalidInput, toggleButtonState, setEventListeners, blockSubmitButton, enableValidation } from './validtion.js';
import { cardsList, cardTemplate, cardBlock, profilePopup, formElement, popupButtonOpen, profileName, profileJob, nameInput, jobInput, buttonOpenPopupCard, cardAddPopup, cardAddFormElement, placeInput, linkInput, imageModal, imagePop, captionPop, closeButtons, modalWindows, submitButton, settings, cardSubmitButton } from './utils.js';

//передача данных в профиль
    function changeProfileData (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
    profileData.name = nameInput.value;
    profileData.occupation = jobInput.value;
    };

  // обработчик кнопки в форме изменения профиля
  formElement.addEventListener('submit', changeProfileData);

 // добавление карточек из массива на страницу
 initialCards.forEach(item => {
  cardsList.prepend(createDefaultCard(item.link, item.name, ));
});

 //добавление новой карточки из формы
 export function addNewCard (evt) {
  evt.preventDefault();
  cardsList.prepend(createDefaultCard(linkInput.value, placeInput.value));
  closePopup(cardAddPopup);
  cardAddFormElement.reset();
   };

//модальное окно увеличенного изображения
export function openImageModal (cardImage, cardTitle) {
  imagePop.src = cardImage.src;
  imagePop.alt = cardImage.alt;
  captionPop.textContent = cardTitle.textContent;
  openPopup(imageModal);
}

enableValidation(settings);









