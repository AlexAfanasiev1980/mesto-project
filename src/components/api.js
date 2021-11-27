const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    'authorization': 'e67bb179-254e-4b3c-8860-7a122085afb4',
    'Content-Type': 'application/json'
  }
}

function addCardServer(card) {
  renderLoading(true);
  fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'e67bb179-254e-4b3c-8860-7a122085afb4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }) 
  .catch(err => {
    renderError(`Ошибка ${err}`);
  })
  .finally (() => {
    renderLoading(false);
  })
}

export function likeAdd(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }) 
}

export function likeRemove(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }) 
}

export function addAvatar(avatarUrl) {
  console.log(avatarUrl);
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName.textContent,
      about: profileProfession.textContent,
      avatar: avatarUrl
    })
  })
  .then(res => {
  if (res.ok) {
    console.log(res);
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`); 
  })
}

function loadCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-4/cards', {
    headers: {
      authorization: 'e67bb179-254e-4b3c-8860-7a122085afb4'
    }
  })
}



export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
    })
  
}

export {loadCards, addCardServer};
import { profileName, profileProfession, renderLoading } from "./modal.js";