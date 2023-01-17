
//функции открытия и закрытия поапа профиля
function openPopup (popup) {
  popup.classList.add('pop-up_opened');
  document.addEventListener('keydown', closePopupByEsc);
 };

function closePopup (popup) {
   popup.classList.remove('pop-up_opened');
   document.removeEventListener('keydown', closePopupByEsc);
};

// функция закрытия попапа при нажатии кнопки escape

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.pop-up_opened'));
      }
}

export { openPopup, closePopup, closePopupByEsc };
