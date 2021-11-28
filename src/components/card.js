//Функция создания карточки
const popupCard = document.querySelector('.popup_type_card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const cardForm = document.querySelector('.popup__card-content');
const usersOnline = document.querySelector('.elements');
const popupText = document.querySelector('.popup__text');
const popupAccept = document.querySelector('.popup_type_accept');

function createCard(cardData) {
  const userTemplate = document.querySelector("#element").content;
  const userElement = userTemplate.querySelector('.element').cloneNode(true);
  const image = userElement.querySelector('.element__image');
  const like = userElement.querySelector('.element__icon-heart');
  const counterLikes = userElement.querySelector('.element__counter-likes');
  image.src = cardData.link;
  image.alt = 'Фото ' + cardData.name;
  counterLikes.textContent = cardData.likes;
  userElement.querySelector('.element__title').textContent = cardData.name;
  userElement.id = cardData.card_id;
  like.addEventListener('click', () => {
    if (like.classList.contains('element__icon-heart_active')) {
      likeRemove(cardData.card_id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      }) 
      counterLikes.textContent--;
    } else {
      likeAdd(cardData.card_id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      counterLikes.textContent++;
    }
    like.classList.toggle('element__icon-heart_active');
  });
  cardData.arrlikes.forEach((element) => {
    if (element.name === profileName.textContent) {
      like.classList.add('element__icon-heart_active');
    }
  })
  const deleteButton = userElement.querySelector('.element__delete');
  if (cardData.username === profileName.textContent) {
      deleteButton.addEventListener('click', function () {
      const listItem = deleteButton.closest('.element');
      listItem.classList.add('element__deletion');
      openPopup(popupAccept);
    });
  } else {
    deleteButton.classList.add('element__delete_inactive');
  }
  image.addEventListener('click', function () {
    popupText.textContent = userElement.querySelector('.element__title').textContent;
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    openPopup(popupTypeImage);
    });
  return userElement;
};

//Функция добавления новой карточки в DOM
function addCard(cardData) {
  const newCard = createCard(cardData);
  usersOnline.prepend(newCard);
}

//Добавление новых карточек
function submitFormAddCard(evt) {
  const title = document.querySelector('#title').value;
  const cardLink = document.querySelector('#link').value;
  if (title === '' || cardLink === '') {
    alert('Заполните все поля формы');
  } else {
    const card = {
      name: title,
      link: cardLink,
      arrlikes: [],
      username: profileName.textContent,
      likes: 0
    };
    renderLoading(true);
    addCardServer(card)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }) 
    .then ((res) => {
      card['card_id'] = res._id;
      addCard(card);
    })
    .catch(err => {
      renderError(`Ошибка ${err}`);
    })
    .finally (() => {
      renderLoading(false);
      cardForm.reset();
      cardForm.querySelector('.popup__button').classList.add('popup__button_inactive');
      closePopup(document.querySelector('.popup_opened'));
    })
    
  }
}

function addCards() {
  loadCards()
  .then(res => res.json())
  .then((result) => {
    let initialCards = [];
    let objectCard = new Object();
    result.forEach((element, index) => {
      objectCard = {};
      objectCard.name = element.name;
      objectCard.link = element.link;
      objectCard.likes = element.likes.length;
      objectCard.arrlikes = element.likes;
      objectCard.username = element.owner.name;
      objectCard.card_id = element._id;
      initialCards[index] = objectCard;
    });
    return initialCards;
  })
  .then((initialCards) => {
    initialCards.forEach(cardData => {
      const newCard = createCard(cardData);
      usersOnline.prepend(newCard)
    })
  })
}

export {addCards, createCard, addCard, submitFormAddCard, popupCard, popupTypeImage, popupImage, cardForm, usersOnline, popupAccept};
import {openPopup, closePopup, submitFormProfile, popupProfile, profileName, closeByClick, renderLoading} from './modal.js';
import {loadCards, addCardServer, deleteCard, likeAdd, likeRemove} from './api.js';