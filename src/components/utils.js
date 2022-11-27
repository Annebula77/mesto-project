import { openPopup } from './modal.js';
import { blockSubmitButton } from './validtion.js';


// переменный попапа профиля
const profilePopup = document.querySelector('#profilePopup');
const formElement = document.querySelector('#profileForm');
const popupButtonOpen = document.querySelector('.profile__data-change');
const profileName = document.querySelector('#profileTitle');
const profileJob = document.querySelector('#profileSubtitle');
const nameInput = document.querySelector('#form__person');
const jobInput = document.querySelector('#form__occupation');

// переменные попапа добавления новых карточек
const buttonOpenPopupCard = document.querySelector('.profile__add');
const cardAddPopup = document.querySelector('#cardAddPopup');
const cardAddFormElement = document.querySelector('#addForm');
const placeInput = document.querySelector('#form__place');
const linkInput = document.querySelector('#form__link');
const cardSubmitButton = document.querySelector('#submitButtonAdd');

//переменные попапа полноразмерных изображений
const imageModal = document.querySelector('#imagePopup');
const imagePop = document.querySelector('.pop-up__image');
const captionPop = document.querySelector('.pop-up__caption');

// массив закрывающих кнопок попапов
const closeButtons = document.querySelectorAll('.pop-up__closure');

// массив из всех модальных окон
const modalWindows = document.querySelectorAll('.pop-up');

//переменные карточек

const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardBlock = cardTemplate.querySelector('.element').cloneNode(true);

//объект валидации
const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
  };


  buttonOpenPopupCard.addEventListener('click', function () {
  openPopup(cardAddPopup);
  blockSubmitButton(settings, cardSubmitButton);
});

export { profilePopup, formElement, popupButtonOpen, profileName, profileJob, nameInput, jobInput, buttonOpenPopupCard, cardAddPopup, cardAddFormElement, placeInput, linkInput, imageModal, imagePop, captionPop, closeButtons, modalWindows, cardsList, cardTemplate, cardBlock, settings, cardSubmitButton }
