import './index.css';
//import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import { createDefaultCard, likePlace } from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import { cardsList,
  confirmDelete,
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
  avatar,
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

// const popupAddUserCard = new PopupWithForm(cardAddPopup, addNewCard);
const popupWithDelete = new PopupWithDelete(confirmDelete, confirmDel);

export const handleBigImage = () => {
 popupWithImage.openPopup();
popupWithImage.setEventListeners();
}

//Класс работы модальных окон для профиля
const popupChangeData = new PopupWithForm(profilePopup, (evt, getInputs) => {
  evt.preventDefault();
  profileSubmitBtn.textContent = 'Сохранение...';
  api.editProfileData({
    name: getInputs.name,
    about: getInputs.about,
  })
  .then((data) => {
    userInfo.setUserInfo(data);
    popupChangeData.closePopup();
  })
  .catch(err => console.log(err))
  .finally(() => {
    profileSubmitBtn.textContent = "Сохранить";
  })
});
popupChangeData.setEventListeners();

//Класс работы модальных окон для аватара
const popupChangeAvatar = new PopupWithForm(popupAvatar, (evt, getInputs) => {
  evt.preventDefault();
  avatarSubmitBtn.textContent = 'Сохранение...';
  api.changeAvatar({
    avatar: getInputs.avatar,
  })
  .then((data) => {
    userInfo.setUserInfo(data);
    popupChangeAvatar.closePopup();
  })
  .catch(err => console.log(err))
  .finally(() => {
    avatarSubmitBtn.textContent = 'Сохранить';
  })
})
popupChangeAvatar.setEventListeners();

//Класс работы модальных окон для добавления места
const popupAddUserCard = new PopupWithForm(cardAddPopup, (evt, getInputs) => {
  evt.preventDefault();
  cardSubmitButton.textContent = "Создание...";
  api.postNewCard(getInputs)
  .then((card) => {
    cardAddFormElement.reset();
    cardsList.prepend(createDefaultCard(card, profile));
    popupAddUserCard.closePopup();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    cardSubmitButton.textContent = "Создать";
  });
})
popupAddUserCard.setEventListeners();
//Данные из промисов (вторые then)
Promise.all([api.getUserData(), api.getServerCards()])
.then(([me, cards]) => {
  // данные из профиля
    userInfo.setUserInfo(me);
    // добавление карточек c сервера
  cards.forEach((card) => {
    const defaultCard = createDefaultCard(card, handleLike, handleDislike, handleBigImage);
    cardsList.append(defaultCard);
  })
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

function handleLike(defaultCard, card, profile) {
  api.putLike(card._id)
  .then((data) => {
    likePlace(defaultCard, data.likes, profile);
  })
  .catch((err) => {
    console.error(err);
  });
}

function confirmDel(card) {
  api.deleteMyCard(card.dataset.id)
    .then(() => {
      card.remove();
      popupWithDelete.closePopup();
    })
    .catch((err) => {
      console.error(err);
  });
};

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
    popupAddUserCard.closePopup();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    cardSubmitButton.textContent = "Создать";
  });
};

avatarChangeBtn.addEventListener('click', function() {
  popupChangeAvatar.openPopup();
});

buttonOpenPopupCard.addEventListener('click', function () {
  popupAddUserCard.openPopup();
  });

// обработчики открытия поапа
popupButtonOpen.addEventListener('click', function () {
  popupChangeData.openPopup();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

[...document.forms].forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement)
  formValidator.enableValidation();
})
