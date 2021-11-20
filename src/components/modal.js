const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

function popupOpened(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => popupClosed(evt, popupElement));
  // document.addEventListener('keydown', cleanAddCard(popupElement));
}

function popupClosed(evt, popupElement) {
  if (evt.target.classList.contains("popup__close")||evt.target.classList.contains("popup")||evt.target.classList.contains("popup__button")||evt.key === 'Escape'){
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => popupClosed(evt, popupElement));
    // const formElement = popupElement.querySelector('.form');
    // const inputElements = formElement.querySelectorAll('.form__input');
    // inputElements.forEach((inputElement) => {
    //   hideInputError(formElement, inputElement);
    // })
    // if (formElement.classList.contains('popup__card-content') && (!evt.target.classList.contains('popup__button'))) {
    //   formElement.reset();
    // }
  }
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
  const fullName = document.querySelector('#full-name');
  const profession = document.querySelector('#profession');
  popupClosed(evt, popupProfile);
  profileName.textContent = fullName.value;
  profileProfession.textContent = profession.value;
}

export {popupOpened, popupClosed, submitFormProfile, popupProfile, profileName, profileProfession};
import {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, enableValidation, formElements} from './validate.js';