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

buttonOpenPopupCard.addEventListener('click', function () {
  openPopup(cardAddPopup);
  blockSubmitButton(settings, cardSubmitButton);
});

// обработчики открытия поапа
popupButtonOpen.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  });


// функция закрытия всех попапов
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.pop-up');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});


  // обработчик кнопки в форме изменения профиля
  formElement.addEventListener('submit', changeProfileData);

   //обработчик кнопки сохранить для пользовательских карточек
   cardAddFormElement.addEventListener('submit', addNewCard);

 // добавление карточек из массива на страницу
 initialCards.forEach(item => {
  cardsList.prepend(createDefaultCard(item.link, item.name, ));
});


enableValidation(settings);









