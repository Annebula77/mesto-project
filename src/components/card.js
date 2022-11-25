import { closePopup, linkInput, placeInput, cardAddPopup, addFormElement, imagePop, captionPop, openImageModal } from './modal.js';

//переменные карточек

const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardBlock = cardTemplate.querySelector('.element').cloneNode(true);

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


 //добавление новой карточки из формы
 function addNewCard (evt) {
  evt.preventDefault();
  cardsList.prepend(createDefaultCard(linkInput.value, placeInput.value));
  closePopup(cardAddPopup);
  addFormElement.reset();
   };

   //обработчик кнопки сохранить для пользовательских карточек
addFormElement.addEventListener('submit', addNewCard);

export { cardsList, cardTemplate, cardBlock, createDefaultCard, likePlace, removeCard, addNewCard };
