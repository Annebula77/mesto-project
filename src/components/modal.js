import { profileData } from './array.js';

// переменный попапа профиля
const profilePopup = document.querySelector('#profilePopup');
const formElement = document.querySelector('#profileForm');
const popupButtonOpen = document.querySelector('.profile__data-change');
const profileName = document.querySelector('#profileTitle');
const profileJob = document.querySelector('#profileSubtitle');
const nameInput = document.querySelector('#form__person');
const jobInput = document.querySelector('#form__occupation');

// переменные попапа добавления новых карточек
const addButtonOpen = document.querySelector('.profile__add');
const cardAddPopup = document.querySelector('#cardAddPopup');
const addFormElement = document.querySelector('#addForm');
const placeInput = document.querySelector('#form__place');
const linkInput = document.querySelector('#form__link');


//переменные попапа полноразмерных изображений
const imageModal = document.querySelector('#imagePopup');
const imagePop = document.querySelector('.pop-up__image');
const captionPop = document.querySelector('.pop-up__caption');

// массив закрывающих кнопок попапов
const closeButtons = document.querySelectorAll('.pop-up__closure');

// массив из всех модальных окон
const modalWindows = document.querySelectorAll('.pop-up');


//функции открытия и закрытия поапа профиля
function openPopup (popup) {
  popup.classList.add('pop-up_opened');
};

function closePopup (popup) {
   popup.classList.remove('pop-up_opened');
};


//модальное окно увеличенного изображения
function openImageModal (cardImage, cardTitle) {
  imagePop.src = cardImage.src;
  imagePop.alt = cardImage.alt;
  captionPop.textContent = cardTitle.textContent;
  openPopup(imageModal);
}

// обработчики открытия поапа
popupButtonOpen.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = profileData.name;
  jobInput.value = profileData.occupation;
});


// функция закрытия всех попапов
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.pop-up');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// закрытие поапов при клике на оверлей
modalWindows.forEach((item) => {
  item.addEventListener('mousedown', function(e) {
    if (e.target === item) {
      closePopup(item);
    }
  })
});

// закрытие попапа при нажатии кнопки escape
modalWindows.forEach((item) => {
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      openPopup(item);
      closePopup(item);
    }
  })
})

 export { profilePopup, formElement, popupButtonOpen, profileName, profileJob, nameInput, jobInput, addButtonOpen, cardAddPopup, addFormElement, placeInput, linkInput, imageModal, imagePop, captionPop, closeButtons, modalWindows, openPopup, closePopup, openImageModal };
