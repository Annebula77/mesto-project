export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  };

  getUserData() {
      return fetch(`${this._url}users/me`, {headers: this._headers})
      .then(this._checkResponse);
  };

  editProfileData(data) {
    console.log(data);
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse);
  };

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkResponse)
  };

  getServerCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  };

  postNewCard(data) {
    console.log(data);
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._checkResponse)
  };

  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  };

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  };

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  };

};
