import {openPopup} from './modal.js';

// переменные попапа профиля
const profilePopup = document.querySelector('#profilePopup');
const formElement = document.querySelector('#profileForm');
const profile = document.querySelector('.profile');
const avatar = document.querySelector('.profile__avatar');
const avatarChangeBtn = document.querySelector('.profile__avatar-wrapper ');
const avatarForm = document.querySelector('#avatarForm');
const avatarSubmitBtn = document.querySelector('#avatarButton');
const avatarInput = document.querySelector('#form__avatar');
const popupAvatar = document.querySelector('#changeAvatar');
const popupButtonOpen = document.querySelector('.profile__data-change');
const profileName = document.querySelector('#profileTitle');
const profileJob = document.querySelector('#profileSubtitle');
const nameInput = document.querySelector('#form__person');
const jobInput = document.querySelector('#form__occupation');
const profileSubmitBtn = document.querySelector('#submitButton');

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

// Подтверждение удаления карточки

const confirmDelete = document.querySelector('#confirmChoice');
const confirmDeleteBtn = document.querySelector('#confirmDelete');
let cardForDelete = null;
const openConfirmDelete = (evt) => {
  cardForDelete = evt.target.closest('.element');
  //console.log(cardForDelete);
  openPopup(confirmDelete);
}
const deleteCard = (cardForDelete) => {cardForDelete.remove()};



//объект валидации
const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
  };


export { profilePopup, profile, avatar, confirmDelete, confirmDeleteBtn, cardForDelete, deleteCard, openConfirmDelete, avatarForm, profileSubmitBtn, avatarChangeBtn, avatarInput, avatarSubmitBtn, popupAvatar, formElement, popupButtonOpen, profileName, profileJob, nameInput, jobInput, buttonOpenPopupCard, cardAddPopup, cardAddFormElement, placeInput, linkInput, imageModal, imagePop, captionPop, closeButtons, modalWindows, cardsList, cardTemplate, cardBlock, settings, cardSubmitButton }
