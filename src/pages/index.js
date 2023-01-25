import './index.css';
import { openPopup, closePopup } from '../components/modal.js';
import { createDefaultCard, likePlace } from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import { cardsList,
  confirmDeleteBtn,
  confirmDelete,
  cardForDelete,
  deleteCard,
  openConfirmDelete,
  avatarForm,
  profile,
  profileSubmitBtn,
  avatar,
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
  closeButtons,
  modalWindows,
  settings,
  cardSubmitButton,
  cfg
} from '../utils/utils.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';

//Класс API
const api = new Api(cfg);
//Класс UserInfo
const userInfo = new UserInfo('#profileTitle', '#profileSubtitle', '.profile__avatar');

//Данные из промисов (вторые then)
Promise.all([api.getUserData(), api.getServerCards()])
.then(([me, cards]) => {
  // данные из профиля
  userInfo.setUserInfo(me);

  // добавление карточек c сервера
  cards.forEach((card) => {
    const defaultCard = createDefaultCard(card, profile, handleLike, handleDislike, openImageModal, openConfirmDelete);
    cardsList.append(defaultCard);
  });
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
    closePopup(profilePopup);
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
    closePopup(popupAvatar);
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
    closePopup(cardAddPopup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    cardSubmitButton.textContent = "Создать";
  });
};

//модальное окно увеличенного изображения
export function openImageModal (cardImage, cardTitle) {
  imagePop.src = cardImage.src;
  imagePop.alt = cardImage.alt;
  captionPop.textContent = cardTitle.textContent;
  openPopup(imageModal);
}

avatarChangeBtn.addEventListener('click', function() {
  openPopup(popupAvatar);
});

buttonOpenPopupCard.addEventListener('click', function () {
  openPopup(cardAddPopup);
  });

// обработчики открытия поапа
popupButtonOpen.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// функция закрытия всех попапов
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.pop-up');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// обработчик кнопки в форме изменения профиля
formElement.addEventListener('submit', changeProfileData);

//обработчик кнопки сохранить для пользовательских карточек
cardAddFormElement.addEventListener('submit', addNewCard);

//обработчик кнопки сохранить для аватара
avatarForm.addEventListener('submit', addNewAvatar);

modalWindows.forEach((item) => {
  item.addEventListener('mousedown', function(e) {
    if (e.target === item) {
      closePopup(item);
    }
  })
});

[...document.forms].forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement)
  formValidator.enableValidation();
})

