const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const fullName = document.querySelector('#full-name');
const profession = document.querySelector('#profession');

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
  closePopup(document.querySelector('.popup_opened'));
  profileName.textContent = fullName.value;
  profileProfession.textContent = profession.value;
}

export {openPopup, closePopup, submitFormProfile, popupProfile, profileName, profileProfession, closeByClick};
import {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, enableValidation} from './validate.js';