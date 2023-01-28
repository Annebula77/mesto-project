import './index.css';
//import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { createDefaultCard, likePlace } from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import { cardsList,
  confirmDeleteBtn,
  confirmDelete,
  cardForDelete,
  openConfirmDelete,
  deleteCard,
  avatarForm,
  profile,
  profileSubmitBtn,
  avatarInput,
  avatarChangeBtn,
  avatarSubmitBtn,
  popupAvatar,
  profilePopup,
  formElement,
  popupButtonOpen,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  buttonOpenPopupCard,
  cardAddPopup,
  cardAddFormElement,
  placeInput,
  linkInput,
  imageModal,
  imagePop,
  captionPop,
  settings,
  cardSubmitButton,
  cfg,
 } from '../utils/utils.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

//Класс API
const api = new Api(cfg);
//Класс UserInfo
const userInfo = new UserInfo(profileName, profileJob, avatar);
export const popupWithImage = new PopupWithImage(imageModal, imagePop, captionPop);

const popupChangeData = new PopupWithForm(profilePopup, changeProfileData);
const popupChangeAvatar = new PopupWithForm(popupAvatar, addNewAvatar);
const popupAddUserCard = new PopupWithForm(cardAddPopup, addNewCard);

export const handleBigImage = () => {
 popupWithImage.openPopup();
popupWithImage.setEventListeners();
}

//Данные из промисов (вторые then)
Promise.all([api.getUserData(), api.getServerCards()])
.then(([me, cards]) => {
  // данные из профиля
    userInfo.setUserInfo(me);
    // добавление карточек c сервера
  cards.forEach((card) => {
    const defaultCard = createDefaultCard(card, handleLike, handleDislike, openConfirmDelete, handleBigImage);
    cardsList.append(defaultCard);
  });
  //Ниже код для класса Section
  const section = new Section({
    items: cards,
    renderer: (item) => {
      //Здесь нужно создать переменную, которая будет сохранит создаваемые карточчки
      //и передаст их в Section. Создавать карточки с помощью функции + класса Card.js
      //Оставил только console.log, из него видно, что класс Section получает необходимые данные
      //Которые нужно будет передать в функцию отрисовки класса Card
    }
  }, '.elemets');
  console.log(section);
  //Конец кода класса Section
})
.catch((err) => {
  console.error(err);
})

//обработчик формы изменения профиля
function changeProfileData (evt) {
  evt.preventDefault();
  profileSubmitBtn.textContent = 'Сохранение...';
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  api.editProfileData(nameInput.value, jobInput.value)
  .then((data) => {
    userInfo.setUserInfo(data);
    popupChangeData.closePopup(profilePopup);
    popupChangeData.setEventListeners();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    profileSubmitBtn.textContent = "Сохранить";
  });
}

// функция обработки формы изменения аватара
function addNewAvatar (evt) {
  evt.preventDefault();
  avatarSubmitBtn.textContent = 'Сохранение...';
  const avatarValue = avatarInput.value;
  api.changeAvatar(avatarValue).then((data) => {
    userInfo.setUserInfo(data);
    popupChangeAvatar.closePopup(popupAvatar);
    })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    avatarSubmitBtn.textContent = "Сохранить";
  });
}

function handleLike(defaultCard, card, profile) {
  api.putLike(card._id)
  .then((data) => {
    likePlace(defaultCard, data.likes, profile);
  })
  .catch((err) => {
    console.error(err);
  });
}

confirmDeleteBtn.addEventListener('click', function() {
  api.deleteMyCard(cardForDelete.dataset.id)
    .then(() => {
      deleteCard(cardForDelete)
      closePopup(confirmDelete)
    })
    .catch((err) => {
      console.error(err);
  });
});

export function handleDislike(defaultCard, card, profile) {
  api.deleteLike(card._id)
  .then((data) => {
    likePlace(defaultCard, data.likes, profile);
  })
  .catch((err) => {
    console.error(err);
  });
};

//добавление новой карточки из формы
export function addNewCard (evt) {
  evt.preventDefault();
  cardSubmitButton.textContent = "Создание...";
  api.postNewCard(placeInput.value, linkInput.value)
  .then((card) => {
    cardAddFormElement.reset();
    cardsList.prepend(createDefaultCard(card, profile));
    popupAddUserCard.closePopup(cardAddPopup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    cardSubmitButton.textContent = "Создать";
  });
};


avatarChangeBtn.addEventListener('click', function() {
  popupChangeAvatar.openPopup(popupAvatar);
});

buttonOpenPopupCard.addEventListener('click', function () {
  popupAddUserCard.openPopup(cardAddPopup);
  });

// обработчики открытия поапа
popupButtonOpen.addEventListener('click', function () {
  popupChangeData.openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});


// обработчик кнопки в форме изменения профиля
formElement.addEventListener('submit', changeProfileData);

//обработчик кнопки сохранить для пользовательских карточек
cardAddFormElement.addEventListener('submit', addNewCard);

//обработчик кнопки сохранить для аватара
avatarForm.addEventListener('submit', addNewAvatar);



[...document.forms].forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement)
  formValidator.enableValidation();
})

