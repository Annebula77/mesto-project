
function mesto() {
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
const profileName = document.querySelector('#profileTitle');
const profileJob = document.querySelector('#profileSubtitle');
const nameInput = document.querySelector('#form__person');
const jobInput = document.querySelector('#form__occupation');

//карточки
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardsList = document.querySelector('.elements');
const cardBlock = cardTemplate.querySelector('.element').cloneNode(true);



// попап добавления новых карточек
const addButtonOpen = document.querySelector('.profile__add');
const cardAddPopup = document.querySelector('#cardAddPopup');
const addFormElement = document.querySelector('#addForm');
const placeInput = document.querySelector('#form__place');
const linkInput = document.querySelector('#form__link');
//ts-check

//попап полноразмерное изображение
const imageModal = document.querySelector('#imagePopup');
const imagePop = document.querySelector('.pop-up__image');
const captionPop = document.querySelector('.pop-up__caption');

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.pop-up__closure');


const modalWindows = document.querySelectorAll('.pop-up');

//объект для профиля

const profileData = {
  name: 'Жак-Ив Кусто',
  occupation: 'Исследователь океана'
}


// ------ спасибо!!!------

//функция для лайков
function likePlace(defaultCard) {
  defaultCard.querySelector('.element__like').addEventListener('click', (evt) => {
  evt.target.classList.toggle('element__like_active');
  })
};

//функция удаления карточек
function removeCard(defaultCard) {
  defaultCard.querySelector('.element__remove').addEventListener('click', () => {
    const listItem = defaultCard.closest('.element');
    listItem.remove();
    });
}

//добавление новой карточки в галерею
   // создание шаблона для карточек
   function createDefaultCard(link, name) {
    const defaultCard = cardBlock.cloneNode(true);
    const cardImage = defaultCard.querySelector('.element__image');
    const cardTitle = defaultCard.querySelector('.element__title');
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    cardImage.addEventListener('click', () => {
      imagePop.src = cardImage.src;
      imagePop.alt = cardTitle.textContent;
      captionPop.textContent = cardTitle.textContent;
      openImageModal (cardImage, cardTitle);
    });

    likePlace(defaultCard);
    removeCard(defaultCard);
    return defaultCard;

    };

    // добавление карточек из массива на страницу
   initialCards.forEach(item => {

    cardsList.prepend(createDefaultCard(item.link, item.name, ));
  });

    //добавление новой карточки из формы
    function addNewCard (evt) {
      evt.preventDefault();
      cardsList.prepend(createDefaultCard(linkInput.value, placeInput.value));
      closePopup(cardAddPopup);
      addFormElement.reset();
       };

       //обработчик кнопки сохранить для пользовательских карточек
   addFormElement.addEventListener('submit', addNewCard);

//модальное окно увеличенного изображения
function openImageModal (cardImage, cardTitle) {
  imagePop.src = cardImage.src;
  imagePop.alt = cardImage.alt;
  captionPop.textContent = cardTitle.textContent;
  openPopup(imageModal);
}

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

// функция закрытия всех попапов
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.pop-up');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

modalWindows.forEach((item) => {
  item.addEventListener('mousedown', function(e) {
    if (e.target === item) {
      closePopup(item);
    }
  })
})


//функции открытия и закрытия поапа профиля
function openPopup (popup) {
  popup.classList.add('pop-up_opened');
};

function closePopup (popup) {
   popup.classList.remove('pop-up_opened');
};
modalWindows.forEach((item) => {
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      closePopup(item);
    }
  })
})

// обработчики открытия поапа
popupButtonOpen.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = profileData.name;
  jobInput.value = profileData.occupation;
});

addButtonOpen.addEventListener('click', function () {
  openPopup(cardAddPopup);
});



}

mesto();






