const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__image-container');
const popupCloseButtons = document.querySelectorAll('.popup__close');

const popups = document.querySelectorAll('.popup');
const profileForm = document.querySelector('.popup__admin');
const acceptForm = document.querySelector('.popup__accept');
let userId;

editButton.addEventListener('click', function () {
  document.querySelector('#full-name').value = profileName.textContent;
  document.querySelector('#profession').value = profileProfession.textContent;
  openPopup(popupProfile);
});

addButton.addEventListener('click', () => openPopup(popupCard));

avatarButton.addEventListener('click', () => openPopup(popupAvatar));

popupAvatar.addEventListener('submit', replaceAvatar);

profileForm.addEventListener('submit', submitFormProfile);

//Слушатель на кнопку добавления новых карточек
cardForm.addEventListener('submit', submitFormAddCard);

acceptForm.addEventListener('submit', () => {
  const deletedCard = document.getElementById(`${cardIdDeleted}`);
  console.log(deletedCard);
  deletedCard.remove();
  deleteCard(deletedCard.id)
  .then (() => {
    closePopup(document.querySelector('.popup_type_accept'));
  })
  .catch(err => {
    renderError(`Ошибка ${err}`);
  })
})

//слушатели для закрытия попапа при нажатии на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => closeByClick(evt));
});

//инициализация валидации
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}); 


Promise.all([loadDateServer(), loadCards()])
.then(([userData, cards]) => {
  avatar.src = userData.avatar;
  profileName.textContent = userData.name;
  profileProfession.textContent = userData.about;
  document.querySelector('.profile__avatar').src = userData.avatar;
  userId = userData._id;

  const initialCards = [];
  let objectCard = new Object();
  cards.forEach((element, index) => {
    objectCard = {};
    objectCard.name = element.name;
    objectCard.link = element.link;
    objectCard.likes = element.likes.length;
    objectCard.arrlikes = element.likes;
    objectCard.cardUserId = element.owner._id;
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
.catch(err => {
  renderError(`Ошибка ${err}`);
}) 

import './index.css';
import {createCard, addCard, submitFormAddCard, popupCard, popupTypeImage, popupImage, cardForm, usersOnline, popupAccept, cardIdDeleted} from '../components/card.js';
import {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, enableValidation} from '../components/validate.js';
import {openPopup, closePopup, submitFormProfile, popupProfile, profileName, profileProfession, closeByClick, replaceAvatar, avatar, popupAvatar} from '../components/modal.js';
import { loadCards, addCardServer, deleteCard, addAvatar, addProfileServer, loadDateServer } from '../components/api.js';
export {userId}