//Функция создания карточки
const popupCard = document.querySelector('.popup_type_card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const cardForm = document.querySelector('.popup__card-content');
const usersOnline = document.querySelector('.elements');

function createCard(cardData) { 
  const userTemplate = document.querySelector("#element").content;
  const userElement = userTemplate.querySelector('.element').cloneNode(true);
  const image = userElement.querySelector('.element__image');
  const like = userElement.querySelector('.element__icon-heart');
  image.src = cardData.link;
  image.alt = 'Фото ' + cardData.name;
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
    const popupText = document.querySelector('.popup__text');
    popupText.textContent = userElement.querySelector('.element__title').textContent;
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupOpened(popupTypeImage);
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
    popupClosed(evt, popupCard);
    const card = {
      name: title,
      link: cardLink
    };
    console.log(card);
    addCard(card);
    cardForm.reset();
  }
}

export {createCard, addCard, submitFormAddCard, popupCard, popupTypeImage, popupImage, cardForm, usersOnline};
import {popupOpened, popupClosed, submitFormProfile, popupProfile, profileName} from './modal.js';