
//данные для авторизации на сервере
const serverData = {
  serverUrl: 'https://nomoreparties.co/v1/plus-cohort-17',
  headers: {
    authorization: 'dc3d0102-85f5-46b6-8a3a-9a4f53b03533',
    'Content-Type': 'application/json',
  },
};

//получение своих данных с сервера
const getUserData = () => {
  return fetch(`${serverData.serverUrl}/users/me`, {
    headers: serverData.headers
   })
   .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//изменение личных данных
const editProfileData = (name, about) => {
  return fetch(`${serverData.serverUrl}/users/me`, {
    method: 'PATCH',
    headers: serverData.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
   })
   .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

//изменение аватара
const changeAvatar = (avatar) => {
  return fetch(`${serverData.serverUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: serverData.headers,
    body: JSON.stringify({
      avatar: avatar
    }),
   })
   .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

//получение дефолтных карточек с сервера
const getServerCards = () => {
  return fetch(`${serverData.serverUrl}/cards`, {
    headers: serverData.headers
   })
   .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//публикация новых карточек на сервер
 const postNewCard = (name, link) => {
  return fetch(`${serverData.serverUrl}/cards`, {
    method: 'POST',
    headers: serverData.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
   })
   .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

 //удаление карточек с сервера
 const deleteMyCard = (cardId) => {
  return fetch(`${serverData.serverUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: serverData.headers
    })
  }

  //поставить лайк на карточку
 const putLike = (cardId) => {
  return fetch(`${serverData.serverUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: serverData.headers
    })
   .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

 //убрать лайк с карточки
 const deleteLike = (cardId) => {
  return fetch(`${serverData.serverUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: serverData.headers
    })
   .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
 }


export { serverData, getUserData, getServerCards, editProfileData, changeAvatar, postNewCard, deleteMyCard, putLike, deleteLike };
