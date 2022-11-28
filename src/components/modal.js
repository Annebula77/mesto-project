import { profilePopup, cardAddPopup, imageModal, modalWindows } from './utils.js';

//функции открытия и закрытия поапа профиля
function openPopup (popup) {
  popup.classList.add('pop-up_opened');
  document.addEventListener('keydown', closePopupByEsc);
 };

function closePopup (popup) {
   popup.classList.remove('pop-up_opened');
   document.removeEventListener('keydown', closePopupByEsc);
};

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
    document.querySelector('.pop-up_opened');
      }
}

export { openPopup, closePopup, closePopupByEsc };
