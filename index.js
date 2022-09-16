// массив для 6 карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//переменные

// попап профиля
const profilePopup = document.querySelector('#profilePopup');
const formElement = document.querySelector('#profileForm');
const popupButtonOpen = document.querySelector('.profile__data-change');
const popupButtonClose = document.querySelector('.pop-up__closure');
const nameInput = document.querySelector('#form__person');
const jobInput = document.querySelector('#form__occupation');

//карточки
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardsList = document.querySelector('.elements');
const cardBlock = cardTemplate.querySelector('.element').cloneNode
(true);

// попап добавления новых карточек
const addButtonOpen = document.querySelector('.profile__add');
const addButtonClose = document.querySelector('#addClose');
const cardAddPopup = document.querySelector('#cardAddPopup');
const addFormElement = document.querySelector('#addForm');
const placeInput = document.querySelector('#form__place');
const linkInput = document.querySelector('#form__link');
//ts-check

//попап полноразмерное изображение
const imageModal = document.querySelector('#imagePopup')
const imagePopupButtonClose = document.querySelector('#imageClose');
const imagePop = document.querySelector('.pop-up__image');
const captionPop = document.querySelector('.pop-up__caption');

//функция для лайков
function likePlace(newCard) {
  newCard.querySelector('.element__like').addEventListener('click', (evt) => {
  evt.target.classList.toggle('element__like_active');
  })
};

//функция удаления карточек
function removeCard(newCard) {
  newCard.querySelector('.element__remove').addEventListener('click', () => {
    const listItem = newCard.closest('.element');
    listItem.remove();
    });
}

//функции открытия и закрытия поапа профиля
function openPopup (popup) {
  popup.classList.add('pop-up_opened');
};

function closePopup (popup) {
  popup.classList.remove('pop-up_opened');
};

// обработчики открытия и закрытия попапов
popupButtonOpen.addEventListener('click', function () {
  openPopup(profilePopup);
});

popupButtonClose.addEventListener('click', function () {
  closePopup(profilePopup);
});
//ts-check

addButtonOpen.addEventListener('click', function () {
  openPopup(cardAddPopup);
});

addButtonClose.addEventListener('click', function () {
  closePopup(cardAddPopup);
});

imagePopupButtonClose.addEventListener('click', function () {
  closePopup(imageModal);
});
// добавление карточек из массива
initialCards.forEach(function(element) {
  const newCard = cardBlock.cloneNode(true);
  newCard.querySelector('.element__image').src = element.link;
  newCard.querySelector('.element__title').textContent = element.name;
  cardsList.prepend(newCard);
  likePlace(newCard);
     removeCard(newCard);
     openImageModal(newCard);
  });

//передача данных в профиль
function formSubmitHandler (evt) {
  evt.preventDefault();
  const profileName = document.querySelector('#profileTitle');
  const profileJob = document.querySelector('#profileSubtitle');
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
    };
// обработчик кнопки в форме изменения профиля
  formElement.addEventListener('submit', formSubmitHandler);

  //добавление новой карточки
function addFormSubmitHandler (evt) {
  evt.preventDefault();
  const userCard = cardBlock.cloneNode(true);
  userCard.querySelector('.element__image').src = linkInput.value;
  userCard.querySelector('.element__title').textContent = placeInput.value;

  cardsList.prepend(userCard);
  likePlace(userCard);
  removeCard(userCard);
  closePopup(cardAddPopup);
  openImageModal(userCard)
      };
    //обработчик кнопки сохранить попапа профиля
  addFormElement.addEventListener('submit', addFormSubmitHandler);

  // функция открытия модального окна с большим изображением
  function openImageModal(newCard) {
    newCard.querySelector('.element__image').addEventListener('click', () => {
      imagePop.src = newCard.querySelector('.element__image').src;
      imagePop.alt = newCard.querySelector('.element__image').alt;
      captionPop.textContent = newCard.querySelector('.element__title').textContent;
      openPopup(imageModal);
    })
  };








