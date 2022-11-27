import { profilePopup, cardAddPopup, imageModal, popupButtonOpen, profileName, profileJob, nameInput, jobInput, closeButtons, modalWindows } from './utils.js';



//функции открытия и закрытия поапа профиля
function openPopup (popup) {
  popup.classList.add('pop-up_opened');
  document.addEventListener('keydown', closePopupByEsc);
 };

function closePopup (popup) {
   popup.classList.remove('pop-up_opened');
   document.removeEventListener('keydown', closePopupByEsc);
};

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

// закрытие поапов при клике на оверлей
modalWindows.forEach((item) => {
  item.addEventListener('mousedown', function(e) {
    if (e.target === item) {
      closePopup(item);
    }
  })
});

// функция закрытия попапа при нажатии кнопки escape

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(profilePopup);
    closePopup(cardAddPopup);
    closePopup(imageModal);
  }
}

export { openPopup, closePopup, closePopupByEsc };
