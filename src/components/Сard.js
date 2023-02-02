export default class Card {
  constructor(data, userId, selector, {handleLike, handleImagePopup, deleteCallback}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleLike = handleLike;
    this._deleteCallback = deleteCallback;
    this._handleImagePopup = handleImagePopup;
    this._defaultCard = selector.querySelector('.element').cloneNode(true);
    this._defaultCardTitle = this._defaultCard.querySelector('.element__title');
    this._defaultCardImage = this._defaultCard.querySelector('.element__image');
    this._defaultCardLike = this._defaultCard.querySelector('.element__like');
    this._defaultCardLikeNumber = this._defaultCard.querySelector('.element__likes-number');
    this._defaultCardDel = this._defaultCard.querySelector('.element__remove');
  }

  createCard() {
    this._defaultCard.dataset.id = this._id;
    this._defaultCardImage.src = this._link;
    this._defaultCardImage.alt = this._name;
    this._defaultCardTitle.textContent = this._name;
    if(this._userId === this._ownerId) {
      this._defaultCardDel.classList.add('element__remove_active');
    }
    if(this._likes.length !== 0) {
      this._defaultCardLikeNumber.textContent = this._likes.length;
    } else {
      this._defaultCardLikeNumber.textContent = 0;
      this._defaultCardLikeNumber.style.opacity = '0';
    }
    this._setEventListeners();
    this._addLikeIcon();
    return this._defaultCard;
  };

  _checkLikes() {
    return this._likes.some((item) => {
      return item._id === this._userId;
    });
  }

  _addLikeIcon() {
    if(this._checkLikes()) {
      this._defaultCardLike.classList.add('element__like_active');
    } else {
      this._defaultCardLike.classList.remove('element__like_active');
    }
  };

  _isLiked() {
    return this._defaultCardLike.classList.contains('element__like_active');
  };

  toggleLikes(data) {
    if(data.likes.length === 0){
      this._defaultCardLikeNumber.textContent = 0;
      this._defaultCardLikeNumber.style.opacity = '0';
    } else {
      this._defaultCardLikeNumber.textContent = data.likes.length;
      this._defaultCardLikeNumber.style.opacity = '1';
    }
    this._defaultCardLike.classList.toggle('element__like_active');
  };

  _setEventListeners(){
    this._defaultCardImage.addEventListener('click', () => {
      this._handleImagePopup(this._name, this._link);
    });
    this._defaultCardLike.addEventListener('click', () => {
      this._handleLike(this._id, this._isLiked())
      this._defaultCardLikeNumber.style.visibility = 'visible';
    })
    this._defaultCardDel.addEventListener('click', (evt) => {this._deleteCallback(evt)});
  };
};
