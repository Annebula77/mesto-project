/*Поработайте с функциональностью работы карточек и валидации форм.
Всю валидацию форм вы до этого писали в отдельном файле, а работу карточек —
в другом. Теперь преобразуйте функции, которые существовали ранее, в единое целое
— классы Card и FormValidator. В этом пункте задания поговорим про класс Card.
Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой на изображение:
принимает в конструктор её данные и селектор её template-элемента;
содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
содержит приватные методы для каждого обработчика;
содержит один публичный метод, который возвращает
полностью работоспособный и наполненный данными элемент карточки.
Для каждой карточки создайте экземпляр класса Card. К
огда дойдёте до реализации классов Popup, свяжите класс Card c попапом.
Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick.
При клике на карточку эта функция должна открывать попап с картинкой.

*/

export default class Card {
    constructor(data, me, selector, {handleLike, handleImagePopup, deleteCallback}) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._myId = me._id;
        this._selector = selector;
        this._handleLike = handleLike;
        this._deleteCallback = deleteCallback;
        this._handleImagePopup = handleImagePopup;
        this._defaultCard = this._selector.querySelector('.element').cloneNode(true);
        this._defaultCardTitle = this._defaultCard.querySelector('.element__title');
        this._defaultCardImage = this._defaultCard.querySelector('.element__image');
        this._defaultCardLike = this._defaultCard.querySelector('.element__like');
        this._defaultCardLikeNumber = this._defaultCard.querySelector('.element__likes-number');
        this._defaultCardDel = this._defaultCard.querySelector('.element__remove');
    }
createCard() {
  this._defaultCard.dataset.id = this._ownerId;
  this._defaultCardImage.src = this._link;
  this._defaultCardImage.alt = this._name;
  this._defaultCardTitle.textContent = this._name;
  this._defaultCardLikeNumber.textContent = this._likes.length;
  if(this._myId === this._ownerId) {
    this._defaultCardDel.classList.add('element__remove_active');
  }
  this._managelikes();
  this.setEventListeners();
  this._deleteCard();
  return this._defaultCard;
}
_managelikes() {
  if (this._likes.length !== 0) {
    this._like.forEach((user) => {
      if (user._id.includes(this._myId)) {
        this._defaultCardLike.classList.add('element__like_active');
      } else {
        this._defaultCardLike.classList.remove('element__like_active');
      }
    });
  } else {
    this._defaultCardLike.classList.remove('element__like_active');
  }
  this._defaultCardLikeNumber.textContent = this._likes.length;
}

_isLiked() {
    return this._defaultCardLike.classList.contains('element__like_active');
}

toggleLikes(data) {
    this._defaultCardLikeNumber.textContent = data.likes.length;
    this._defaultCardLike.classList.toggle('element__like_active');
}
_deleteCard(){
  if(this._myId === this._ownerId) {
    this._defaultCardDel.classList.add('element__remove_active');
  }
}
  setEventListeners(){ //
    this._defaultCardImage.addEventListener('click', () => {
        this._handleImagePopup(this._name, this._link);
    })
    this._defaultCardLike.addEventListener('click', () => {
        this._handleLike(this._isLiked(), this._myId);
    })
    this._defaultCardDel.addEventListener('click', (evt) => {this._deleteCallback(evt)});
  }

}

 cardImage.addEventListener('click', () => {
    imagePop.src = cardImage.src;
    imagePop.alt = cardImage.alt;
    captionPop.textContent = cardTitle.textContent;
        handleBigImage();
     });

     wasteBin.addEventListener('click', openConfirmDelete);
