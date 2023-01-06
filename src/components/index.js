import '../pages/index.css';
import { serverData, getUserData, getServerCards, editProfileData, changeAvatar, postNewCard, deleteMyCard, putLike, deleteLike, checkResponse } from './api.js';
import { openPopup, closePopup, closePopupByEsc } from '../components/modal.js';
import { createDefaultCard, likePlace } from './card.js';
import { isValid, showInputError, hideInputError, hasInvalidInput, setEventListeners, blockSubmitButton, enableValidation } from './validtion.js';
import { cardsList, cardTemplate, cardBlock, confirmDeleteBtn, confirmDelete, cardForDelete, deleteCard,   openConfirmDelete, avatarForm, profile, profileSubmitBtn, avatar, avatarInput, avatarChangeBtn, avatarSubmitBtn, popupAvatar, profilePopup, formElement, popupButtonOpen, profileName, profileJob, nameInput, jobInput, buttonOpenPopupCard, cardAddPopup, cardAddFormElement, placeInput, linkInput, imageModal, imagePop, captionPop, closeButtons, modalWindows, submitButton, settings, cardSubmitButton } from './utils.js';



//Данные из промисов (вторые then)
Promise.all([getUserData(), getServerCards()])
.then(([me, cards]) => {
  // данные из профиля
  profile.id = me._id;
  profileName.textContent = me.name;
  profileJob.textContent = me.about;
  avatar.src = me.avatar;

  // добавление карточек c сервера
  cards.forEach((card) => {
    const defaultCard = createDefaultCard(card, profile);
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
    editProfileData(nameInput.value, jobInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      closePopup(profilePopup);
    })

    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileSubmitBtn.textContent = "Сохранить";

    });
          };

// функция обработки формы изменения аватара
       function addNewAvatar (evt) {
        evt.preventDefault();
        avatarSubmitBtn.textContent = 'Сохранение...';
        const avatarValue = avatarInput.value;
        changeAvatar(avatarValue).then((me) => {
          console.log(avatarValue);
          avatar.src = me.avatar;
          avatar.alt = me.avatar;
          closePopup(popupAvatar);
          })
          .catch((err) => {
            console.error(err);
          })
        .finally(() => {
          avatarSubmitBtn.textContent = "Сохранить";
        });
               }
       avatarForm.addEventListener('submit', addNewAvatar);


       export function handleLike(defaultCard, card, profile) {
        putLike(card._id)
          .then((data) => {
            likePlace(defaultCard, data.likes, profile);
          })
          .catch((err) => {
            console.error(err);
          });
      }


      confirmDeleteBtn.addEventListener('click', function() {
        deleteMyCard(cardForDelete.dataset.id)
          .then(() => {
            deleteCard(cardForDelete)
            closePopup(confirmDelete)
          })
          .catch((err) => {
            console.error(err);
      });
    })


       export function handleDislike(defaultCard, card, profile) {
        deleteLike(card._id)
        .then((data) => {
          likePlace(defaultCard, data.likes, profile);
        })
        .catch((err) => {
          console.error(err);
        });
    }



    //добавление новой карточки из формы
export function addNewCard (evt) {
  evt.preventDefault();

  cardSubmitButton.textContent = "Создание...";
  postNewCard(placeInput.value, linkInput.value)
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
  blockSubmitButton(settings, cardSubmitButton);
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

   // обработчик удаления карточки после подтверждения





enableValidation(settings);


