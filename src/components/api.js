const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    'authorization': 'e67bb179-254e-4b3c-8860-7a122085afb4',
    'Content-Type': 'application/json'
  }
}

function addCardServer(card) {
  return fetch(`${config.baseUrl}/cards`, {
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
}

export function likeAdd(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
    })
  
}

export function likeRemove(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
    })
    
}

export function addAvatar(avatarUrl, nameprofile, profession) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameprofile,
      about: profession,
      avatar: avatarUrl
    })
  })
}

export function addProfileServer(name, profession) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'e67bb179-254e-4b3c-8860-7a122085afb4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: profession
      })
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