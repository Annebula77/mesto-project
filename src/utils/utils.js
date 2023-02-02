
// переменные попапа профиля
//const profilePopup = document.querySelector('#profilePopup');
const formElement = document.querySelector('#profileForm');
const avatar = document.querySelector('.profile__avatar');
const avatarChangeBtn = document.querySelector('.profile__avatar-wrapper ');
const avatarSubmitBtn = document.querySelector('#avatarButton');
const popupButtonOpen = document.querySelector('.profile__data-change');
const profileName = document.querySelector('#profileTitle');
const profileJob = document.querySelector('#profileSubtitle');
const nameInput = document.querySelector('#form__person');
const jobInput = document.querySelector('#form__occupation');
const profileSubmitBtn = document.querySelector('#submitButton');

// переменные попапа добавления новых карточек
const buttonOpenPopupCard = document.querySelector('.profile__add');
const cardAddFormElement = document.querySelector('#addForm');
const cardSubmitButton = document.querySelector('#submitButtonAdd');

//переменные карточек

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

//Токен для API
export const token = 'dc3d0102-85f5-46b6-8a3a-9a4f53b03533';
//Конфиг для API
export const cfg= {
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-17/',
    headers: {
        authorization: token,
        'Content-Type': 'application/json',
    },
};

export {
  profileSubmitBtn,
  avatarChangeBtn,
  avatarSubmitBtn,
  formElement,
  popupButtonOpen,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  buttonOpenPopupCard,
  cardAddFormElement,
  cardTemplate,
  cardBlock,
  settings,
  cardSubmitButton,
  avatar
  }
