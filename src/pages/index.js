const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popups = document.querySelectorAll('.popup');
const profileForm = document.querySelector('.popup__admin');

editButton.addEventListener('click', function () {
  document.querySelector('#full-name').value = profileName.textContent;
  document.querySelector('#profession').value = profileProfession.textContent;
  openPopup(popupProfile);
});

addButton.addEventListener('click', () => openPopup(popupCard));

avatarButton.addEventListener('click', () => openPopup(popupAvatar));

profileForm.addEventListener('submit', submitFormProfile);

//Слушатель на кнопку добавления новых карточек
cardForm.addEventListener('submit', submitFormAddCard);

//слушатели для закрытия попапа при нажатии на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => closeByClick(evt));
});

//Инициируем функцию добавления карточек при загрузке страницы

// initialCards.forEach(cardData => {
//   const newCard = createCard(cardData);
//   usersOnline.prepend(newCard)
// })

//инициализация валидации
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}); 

fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me', {
    headers: {
      authorization: 'e67bb179-254e-4b3c-8860-7a122085afb4'
    }
  })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name;
      profileProfession.textContent = result.about;
      document.querySelector('.profile__avatar').src = result.avatar;
    }); 




import './index.css';
import {loadCards} from '../components/initial-cards.js';
import {createCard, addCard, submitFormAddCard, popupCard, popupTypeImage, popupImage, cardForm, usersOnline} from '../components/card.js';
import {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, enableValidation} from '../components/validate.js';
import {openPopup, closePopup, submitFormProfile, popupProfile, profileName, profileProfession, closeByClick} from '../components/modal.js';