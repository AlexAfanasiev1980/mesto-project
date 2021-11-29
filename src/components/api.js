const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    'authorization': 'e67bb179-254e-4b3c-8860-7a122085afb4',
    'Content-Type': 'application/json'
  }
}

export function loadDateServer() {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(checkResponse)
}

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

function addCardServer(card) {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(checkResponse)
}

export function likeAdd(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
    })
    .then(checkResponse)
}

export function likeRemove(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
    })
    .then(checkResponse)
}

export function addAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(checkResponse)
}

export function addProfileServer(name, profession) {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: profession
      })
    })
    .then(checkResponse)
}


function loadCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
}



export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
    })
    .then(checkResponse)
}

export {loadCards, addCardServer};