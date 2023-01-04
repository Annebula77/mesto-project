import { captionPop, imagePop, cardBlock} from './utils.js';
import { openImageModal } from './index.js';
import { deleteMyCard, putLike, deleteLike } from './api.js';


 // создание шаблона для карточек
 function createDefaultCard(card, me) {
  const defaultCard = cardBlock.cloneNode(true);
  const cardImage = defaultCard.querySelector('.element__image');
  const cardTitle = defaultCard.querySelector('.element__title');
  const likeCard = defaultCard.querySelector('.element__like');
  const likeNumber = defaultCard.querySelector('.element__likes-number');
  const wasteBin = defaultCard.querySelector('.element__remove');
      cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardImage.addEventListener('click', () => {
    imagePop.src = cardImage.src;
    imagePop.alt = cardTitle.textContent;
    captionPop.textContent = cardTitle.textContent;
    openImageModal (cardImage, cardTitle);
  });

  likeCard.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains('element__like_active')) {
      evt.target.classList.add('element__like_active');
      putLike(card._id)
        .then((userData) => {
          likeNumber.textContent = userData.likes.length
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      evt.target.classList.remove('element__like_active');
      deleteLike(card._id)
        .then((userData) => {
          likeNumber.textContent = userData.likes.length;
          })
        .catch((err) => {
          console.error(err);
        })
    }
  });
  likeNumber.textContent = card.likes.length;


  if (me.id === card.owner._id) {
     wasteBin.classList.add('element__remove_active');
  }
    wasteBin.addEventListener("click", () => {
      deleteMyCard(card._id)
    .then(data => {
      defaultCard.remove()
    })
    .catch((err) => {
      console.error(err);
    })
    });

        return defaultCard;
};


export { createDefaultCard};
