const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const fullName = document.querySelector('#full-name');
const profession = document.querySelector('#profession');

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    document.removeEventListener('keydown', closeByEscape);
  }
}

function closeByClick(evt) {
  
  if (evt.target.classList.contains("popup__close")||evt.target.classList.contains("popup")||evt.target.classList.contains("popup__button")) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  // document.addEventListener('keydown', cleanAddCard(popupElement));
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    // const formElement = popupElement.querySelector('.form');
    // const inputElements = formElement.querySelectorAll('.form__input');
    // inputElements.forEach((inputElement) => {
    //   hideInputError(formElement, inputElement);
    // })
    // if (formElement.classList.contains('popup__card-content') && (!evt.target.classList.contains('popup__button'))) {
    //   formElement.reset();
    // }
}

// function cleanAddCard(popupElement) {
//   console.log(popupElement);
//   const formElement = popupElement.querySelector('.form');
//   document.removeEventListener('keydown', cleanAddCard(popupElement));
//   console.log(formElement);
//   if (popupElement.classList.contains('popup__card-content') && (!evt.target.classList.contains('popup__button'))) {
//      formElement.reset();
//   }
// }

function submitFormProfile(evt) {
  closeByClick(evt);
  profileName.textContent = fullName.value;
  profileProfession.textContent = profession.value;
  fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'e67bb179-254e-4b3c-8860-7a122085afb4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profileName.textContent,
        about: profileProfession.textContent
      })
    }); 
}

export {openPopup, closePopup, submitFormProfile, popupProfile, profileName, profileProfession, closeByClick};
import {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, enableValidation} from './validate.js';