import './index.css';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import FormValidator from '../components/FormValidator.js';
import { cardsList,
  confirmDelete,
  profileSubmitBtn,
  avatarChangeBtn,
  avatarSubmitBtn,
  popupAvatar,
  profilePopup,
  popupButtonOpen,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  buttonOpenPopupCard,
  cardAddPopup,
  cardAddFormElement,
  imageModal,
  imagePop,
  captionPop,
  settings,
  cardSubmitButton,
  avatar,
  cfg,
  cardTemplate,
  } from '../utils/utils.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Сard.js';
//Класс API
const api = new Api(cfg);
//Класс UserInfo
const userInfo = new UserInfo(profileName, profileJob, avatar);
export const popupWithImage = new PopupWithImage(imageModal, imagePop, captionPop);

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

function createCardTemplate(cards) {
  const card = new Card(
    cards,
    userInfo.userId,  //Передаю айдишник юзера (наш)
    cardTemplate,
    {
      handleLike: (cardId ,isLiked) => {
        (isLiked ? api.deleteLike(cardId) : api.putLike(cardId))
        .then((data) => {
          card.toggleLikes(data);
        })
      },
      handleImagePopup: (name, link) => {
        popupWithImage.openPopup(name, link);
        popupWithImage.setEventListeners();
      },
      deleteCallback: (evt) => { popupWithDelete.openPopup(evt) }
    }
  )
  return card.createCard();
}

//Класс работы модальных окон для добавления места
const popupAddUserCard = new PopupWithForm(cardAddPopup, (evt, getInputs) => {
  evt.preventDefault();
  cardSubmitButton.textContent = "Создание...";
  api.postNewCard(getInputs)
  .then((card) => {
    cardAddFormElement.reset();
    cardsList.prepend(createCardTemplate(card, userInfo.userId));
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

const popupWithDelete = new PopupWithDelete(confirmDelete, {deleteCallback:
(card) => {
  api.removeCard(card.dataset.id)
  .then(() => {
    card.remove()
    popupWithDelete.closePopup();
    popupWithDelete.removeEventListeners();
  })
  .catch((err) => {
    console.error(err);
}) }
});

Promise.all([api.getUserData(), api.getServerCards()])
.then((data) => {
  // данные из профиля
    userInfo.setUserInfo(data[0]);
    // добавление карточек c сервера
   //Ниже код для класса Section
  const section = new Section({
    items: data[1],
    renderer: (item) => {
      //Здесь нужно создать переменную, которая будет сохранит создаваемые карточчки
      //и передаст их в Section. Создавать карточки с помощью функции + класса Card.js
      //Оставил только console.log, из него видно, что класс Section получает необходимые данные
      //Которые нужно будет передать в функцию отрисовки класса Card
      const cardElement = createCardTemplate(item);
      section.addItem(cardElement);

    }
  }, '.elements');
  //Конец кода класса Section
  section.renderItems();
})
.catch((err) => {
  console.error(err);
})

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
