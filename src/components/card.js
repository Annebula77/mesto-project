

import { imagePop, captionPop, cardBlock, imageModal} from '../utils/utils.js';
import { handleBigImage } from '../pages/index.js';



//функция лайка карточки
function likePlace(defaultCard, likeCount, me) {
  const likeCard = defaultCard.querySelector('.element__like');
  const likeNumber = defaultCard.querySelector('.element__likes-number');
  if (likeCount.length !== 0) {
    likeCount.forEach((user) => {
      if (user._id.includes(me.id)) {
        likeCard.classList.add('element__like_active');
      } else {
        likeCard.classList.remove('element__like_active');
      }
    });
  } else {
    likeCard.classList.remove('element__like_active');
  }
  likeNumber.textContent = likeCount.length;
}


 // создание шаблона для карточек
 function createDefaultCard(card, me, handleLike, handleDislike) {
  //const defaultCard = cardBlock.cloneNode(true);
 // const cardImage = defaultCard.querySelector('.element__image');
 // const cardTitle = defaultCard.querySelector('.element__title');
 // const likeCard = defaultCard.querySelector('.element__like');
  //const wasteBin = defaultCard.querySelector('.element__remove');
      cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardImage.addEventListener('click', () => {
    imagePop.src = cardImage.src;
    imagePop.alt = cardImage.alt;
    captionPop.textContent = cardTitle.textContent;
        handleBigImage();
     });


/*
  if (me.id === card.owner._id) {
     wasteBin.classList.add('element__remove_active');
     defaultCard.dataset.id = card._id;
    }

    wasteBin.addEventListener('click', openConfirmDelete);
*/
      return defaultCard;
    };



export { createDefaultCard, likePlace };
