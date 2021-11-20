const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popups = document.querySelectorAll('.popup');
const profileForm = document.querySelector('.popup__admin');




let profileProfession = document.querySelector('.profile__profession');

editButton.addEventListener('click', function () {
  document.querySelector('#full-name').value = profileName.textContent;
  document.querySelector('#profession').value = profileProfession.textContent;
  popupOpened(popupProfile);
});



addButton.addEventListener('click', () => popupOpened(popupCard));

avatarButton.addEventListener('click', () => popupOpened(popupAvatar));

profileForm.addEventListener('submit', submitFormProfile);

//Слушатель на кнопку добавления новых карточек
cardForm.addEventListener('submit', submitFormAddCard);


//слушатели для закрытия попапа при нажатии на оверлей и Escape
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => popupClosed(evt, popup));
  document.addEventListener('keydown', (evt) => popupClosed(evt, popup));
});

//Инициируем функцию добавления карточек при загрузке страницы
initialCards.forEach(cardData => {
  const newCard = createCard(cardData);
  usersOnline.prepend(newCard)
})


//инициализация валидации
enableValidation();

import './index.css';
import {initialCards} from './components/initial-cards.js';
import {createCard, addCard, submitFormAddCard, popupCard, popupTypeImage, popupImage, cardForm, usersOnline} from './components/card.js';
import {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, enableValidation, formElements} from './components/validate.js';
import {popupOpened, popupClosed, submitFormProfile, popupProfile, profileName} from './components/modal.js';