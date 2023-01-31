import './index.css';
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
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const api = new Api(cfg);
const userInfo = new UserInfo(profileName, profileJob, avatar);
export const popupWithImage = new PopupWithImage(imageModal, imagePop, captionPop);

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
});
popupChangeAvatar.setEventListeners();

function createCardTemplate(cards) {
  const card = new Card(
    cards,
    userInfo.userId,
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
      deleteCallback: (evt) => { 
        popupWithDelete.openPopup(evt);
      }
    }
  );
  return card.createCard();
};

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
});
popupAddUserCard.setEventListeners();

const popupWithDelete = new PopupWithDelete(
  confirmDelete,
  {
    deleteCallback: (card) => {
      api.removeCard(card.dataset.id)
      .then(() => {
        card.remove();
        popupWithDelete.closePopup();
        popupWithDelete.removeEventListeners();
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }
);

Promise.all([api.getUserData(), api.getServerCards()])
.then((data) => {
  userInfo.setUserInfo(data[0]);
  const section = new Section({
    items: data[1],
    renderer: (item) => {
      const cardElement = createCardTemplate(item);
      section.addItem(cardElement);
    }
  }, '.elements');
  section.renderItems();
})
.catch((err) => {
  console.error(err);
});

avatarChangeBtn.addEventListener('click', function() {
  popupChangeAvatar.openPopup();
});

buttonOpenPopupCard.addEventListener('click', function () {
  popupAddUserCard.openPopup();
});

popupButtonOpen.addEventListener('click', function () {
  popupChangeData.openPopup();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

[...document.forms].forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement)
  formValidator.enableValidation();
});
