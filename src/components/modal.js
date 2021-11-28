const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const fullName = document.querySelector('#full-name');
const profession = document.querySelector('#profession');
const avatarUrl = document.querySelector('#link-avatar');
const avatar = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup_type_avatar');


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByClick(evt) {
  if (evt.target.classList.contains("popup__close")||evt.target.classList.contains("popup")) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function submitFormProfile(evt) {
  renderLoading(true);
  addProfileServer(fullName.value, profession.value)
  .then ((res) => {
    profileName.textContent = fullName.value;
    profileProfession.textContent = profession.value;
    renderLoading(false);
    closePopup(popupProfile);
  })
  .catch(err => {
    renderError(`Ошибка ${err}`);
  })
}

function renderLoading(isLoading) {
  const openedPopup = document.querySelector('.popup_opened');
  const buttonPopup = openedPopup.querySelector('.popup__button');
  if (isLoading) {
    buttonPopup.textContent = 'Сохранение...';
  } else {
    if (openedPopup.classList.contains('popup_type_card')) {
      buttonPopup.textContent = 'Создать';
    } else {
      buttonPopup.textContent = 'Сохранить';
    }
  }
}

function replaceAvatar(evt) {
  renderLoading(true);
  addAvatar(avatarUrl.value)
  .then ((res) => {
    avatar.src = avatarUrl.value;
    renderLoading(false);
    closePopup(popupAvatar);
  })
  .catch(err => {
    renderError(`Ошибка ${err}`);
  })
}

export {openPopup, closePopup, submitFormProfile, popupProfile, profileName, profileProfession, closeByClick, replaceAvatar, avatar, renderLoading, popupAvatar};
import {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, enableValidation} from './validate.js';
import { addAvatar, addProfileServer } from './api.js';