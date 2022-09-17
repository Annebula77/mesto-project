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
const cardBlock = cardTemplate.querySelector('.element').cloneNode(true);



// попап добавления новых карточек
const addButtonOpen = document.querySelector('.profile__add');
const addButtonClose = document.querySelector('#addClose');
const cardAddPopup = document.querySelector('#cardAddPopup');
const addFormElement = document.querySelector('#addForm');
const placeInput = document.querySelector('#form__place');
const linkInput = document.querySelector('#form__link');
//ts-check

//попап полноразмерное изображение
const imagePopupButtonClose = document.querySelector('#imageClose');
const imageModal = document.querySelector('#imagePopup');
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

//модальное окно увеличенного изображения
function openImageModal (cardImage, cardTitle) {
  imagePop.src = cardImage.src;
  imagePop.alt = cardImage.alt;
  captionPop.textContent = cardTitle.textContent;
  openPopup(imageModal);
}

// создание карточки из массива
function createNewCard(element) {
  let newCard = cardBlock.cloneNode(true);
  let cardImage = newCard.querySelector('.element__image');
  let cardTitle = newCard.querySelector('.element__title');
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  cardImage.addEventListener('click', () => {
    imagePop.src = cardImage.src;
    captionPop.textContent = cardTitle.textContent;
    openImageModal (cardImage, cardTitle);
  });

  likePlace(newCard);
  removeCard(newCard);
  return newCard;

  };

  // добавление карточек из массива на страницу
   initialCards.forEach(element => {
    cardsList.prepend(createNewCard(element));
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

  //добавление новой карточки
function addFormSubmitHandler (evt) {
  evt.preventDefault();
  const userCard = cardBlock.cloneNode(true);
  userCard.link = linkInput.value;
  userCard.name = placeInput.value;

  cardsList.prepend(createNewCard(userCard));
  likePlace(userCard);
  removeCard(userCard);
  closePopup(cardAddPopup);
       };

//функции открытия и закрытия поапа профиля
function openPopup (popup) {
  popup.classList.add('pop-up_opened');
};

function closePopup (popup) {
  popup.classList.remove('pop-up_opened');
};


//слушатели

 //обработчик кнопки сохранить попапа профиля
 addFormElement.addEventListener('submit', addFormSubmitHandler);

// обработчик кнопки в форме изменения профиля
formElement.addEventListener('submit', formSubmitHandler);

// обработчики открытия и закрытия попапов
popupButtonOpen.addEventListener('click', function () {
  openPopup(profilePopup);
});

popupButtonClose.addEventListener('click', function () {
  closePopup(profilePopup);
});

addButtonOpen.addEventListener('click', function () {
  openPopup(cardAddPopup);
});

addButtonClose.addEventListener('click', function () {
  closePopup(cardAddPopup);
});

imagePopupButtonClose.addEventListener('click', function () {
  closePopup(imageModal);
});

















