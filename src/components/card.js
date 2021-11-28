//Функция создания карточки
const popupCard = document.querySelector('.popup_type_card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const cardForm = document.querySelector('.popup__card-content');
const usersOnline = document.querySelector('.elements');
const popupText = document.querySelector('.popup__text');
const popupAccept = document.querySelector('.popup_type_accept');
let cardIdDeleted;

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
      .then ((result) => {
        counterLikes.textContent = result.likes.length;
        like.classList.toggle('element__icon-heart_active');
      })
      .catch(err => {
        renderError(`Ошибка ${err}`);
      })
    } else {
      likeAdd(cardData.card_id)
      .then ((result) => {
        counterLikes.textContent = result.likes.length;
        like.classList.toggle('element__icon-heart_active');
      })
      .catch(err => {
        renderError(`Ошибка ${err}`);
      })
    }
  });
  cardData.arrlikes.forEach((element) => {
    if (element._id === userId) {
      like.classList.add('element__icon-heart_active');
    }
  })
  const deleteButton = userElement.querySelector('.element__delete');
  if (cardData.cardUserId === userId) {
      deleteButton.addEventListener('click', function () {
      const listItem = deleteButton.closest('.element');
      cardIdDeleted = listItem.id;
      openPopup(popupAccept);
    });
  } else {
    deleteButton.classList.add('element__delete_inactive');
  }
  image.addEventListener('click', function () {
    popupText.textContent = cardData.name;
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
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
    .then ((res) => {
      card['card_id'] = res._id;
      card['cardUserId'] = res.owner._id;
      addCard(card);
      renderLoading(false);
      cardForm.reset();
      cardForm.querySelector('.popup__button').classList.add('popup__button_inactive');
      closePopup(popupCard);
    })
    .catch(err => {
      renderError(`Ошибка ${err}`);
    })
  }
}

export {createCard, addCard, submitFormAddCard, popupCard, popupTypeImage, popupImage, cardForm, usersOnline, popupAccept, cardIdDeleted};
import {openPopup, closePopup, submitFormProfile, popupProfile, profileName, closeByClick, renderLoading} from './modal.js';
import {loadCards, addCardServer, deleteCard, likeAdd, likeRemove} from './api.js';
import { userId } from '../pages/index.js';