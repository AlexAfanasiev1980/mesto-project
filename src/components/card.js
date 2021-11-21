//Функция создания карточки
const popupCard = document.querySelector('.popup_type_card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const cardForm = document.querySelector('.popup__card-content');
const usersOnline = document.querySelector('.elements');
const popupText = document.querySelector('.popup__text');

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
  like.addEventListener('click', () => {
  like.classList.toggle('element__icon-heart_active');
  });
  const deleteButton = userElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.element');
    listItem.remove();
  });
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
    closeByClick(evt);
    const card = {
      name: title,
      link: cardLink,
      likes: 0
    };
    addCard(card);
    cardForm.reset();
    cardForm.querySelector('.popup__button').classList.add('popup__button_inactive');
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

addCards();

export {createCard, addCard, submitFormAddCard, popupCard, popupTypeImage, popupImage, cardForm, usersOnline};
import {openPopup, closePopup, submitFormProfile, popupProfile, profileName, closeByClick} from './modal.js';
import {loadCards} from './initial-cards.js';