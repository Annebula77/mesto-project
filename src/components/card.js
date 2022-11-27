import { cardAddFormElement, captionPop, imagePop, cardBlock } from './utils.js';
import { openImageModal, addNewCard } from './index.js';

//функция для лайков
function likePlace(defaultCard) {
  defaultCard.querySelector('.element__like').addEventListener('click', (evt) => {
  evt.target.classList.toggle('element__like_active');
  })
};

//функция удаления карточек
function removeCard(defaultCard) {
  defaultCard.querySelector('.element__remove').addEventListener('click', () => {
    const listItem = defaultCard.closest('.element');
    listItem.remove();
    });
}

 // создание шаблона для карточек
 function createDefaultCard(link, name) {
  const defaultCard = cardBlock.cloneNode(true);
  const cardImage = defaultCard.querySelector('.element__image');
  const cardTitle = defaultCard.querySelector('.element__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardImage.addEventListener('click', () => {
    imagePop.src = cardImage.src;
    imagePop.alt = cardTitle.textContent;
    captionPop.textContent = cardTitle.textContent;
    openImageModal (cardImage, cardTitle);
  });

  likePlace(defaultCard);
  removeCard(defaultCard);
  return defaultCard;

  };

   //обработчик кнопки сохранить для пользовательских карточек
   cardAddFormElement.addEventListener('submit', addNewCard);

export { createDefaultCard, likePlace, removeCard, addNewCard };
