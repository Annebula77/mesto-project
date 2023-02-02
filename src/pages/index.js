import './index.css';
import {
  profileSubmitBtn,
  avatarChangeBtn,
  avatarSubmitBtn,
  popupButtonOpen,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  buttonOpenPopupCard,
  cardAddFormElement,
  settings,
  cardSubmitButton,
  avatar,
  cfg,
  cardTemplate,
} from '../utils/utils.js';
import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
let section;
let cardElement;

const api = new Api(cfg);
const userInfo = new UserInfo(profileName, profileJob, avatar);
export const popupWithImage = new PopupWithImage('#imagePopup');
popupWithImage.setEventListeners();
const profileValidator = new FormValidator(settings, document.querySelector('#profileForm'));
profileValidator.enableValidation();
const cardValidator = new FormValidator(settings, document.querySelector('#cardAddPopup'));
cardValidator.enableValidation();
const avatarValidator = new FormValidator(settings, document.querySelector('#avatarForm'));
avatarValidator.enableValidation()


Promise.all([api.getUserData(), api.getServerCards()])
.then((data) => {
  userInfo.setUserInfo(data[0]);
  section = new Section({
    items: data[1],
    renderer: (item) => {
      cardElement = createCardTemplate(item);
      section.addItem(cardElement);
    }
  }, '.elements');
  section.renderItems();
})
.catch((err) => {
  console.error(err);
});

const popupChangeData = new PopupWithForm('#profilePopup', (evt, getInputs) => {
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

const popupChangeAvatar = new PopupWithForm('#changeAvatar', (evt, getInputs) => {
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
});
popupChangeAvatar.setEventListeners();

function createCardTemplate(cards) {
  const card = new Card(
    cards,
    userInfo.userId,
    cardTemplate,
    {
      handleLike: (cardId, isLiked) => {
        (isLiked ? api.deleteLike(cardId) : api.putLike(cardId))
        .then((data) => {
          card.toggleLikes(data);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
      },
      handleImagePopup: (name, link) => {
        popupWithImage.openPopup(name, link);
      },
      deleteCallback: (evt) => {
        popupWithDelete.openPopup(evt);
      }
    }
  );
  return card.createCard();
};

const popupAddUserCard = new PopupWithForm('#cardAddPopup', (evt, getInputs) => {
  evt.preventDefault();
  cardSubmitButton.textContent = "Создание...";
  api.postNewCard(getInputs)
  .then((card) => {
    cardAddFormElement.reset();
    cardElement = createCardTemplate(card);
    section.addItem(cardElement);
    popupAddUserCard.closePopup();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    cardSubmitButton.textContent = "Создать";
  });
});
popupAddUserCard.setEventListeners();

const popupWithDelete = new PopupWithDelete('#confirmChoice',
  {
    deleteCallback: (card) => {
      api.removeCard(card.dataset.id)
      .then(() => {
        card.remove();
        popupWithDelete.closePopup();
       })
      .catch((err) => {
        console.error(err);
      })
    }
  }
);
popupWithDelete.setEventListeners();

avatarChangeBtn.addEventListener('click', function() {
  avatarValidator.resetValidation();
  popupChangeAvatar.openPopup();
});

buttonOpenPopupCard.addEventListener('click', function () {
  cardValidator.resetValidation();
  popupAddUserCard.openPopup();
});

popupButtonOpen.addEventListener('click', function () {
  popupChangeData.openPopup();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
 });



