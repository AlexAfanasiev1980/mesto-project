const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');

function popupOpened(popupElement) {
  popupElement.classList.add('popup_opened');
}



function popupClosed(evt, popupElement) {
  if (evt.target.classList.contains("popup__close")||evt.target.classList.contains("popup")||evt.target.classList.contains("popup__button")||evt.key === 'Escape'){
    popupElement.classList.remove('popup_opened');
    const formElement = popupElement.querySelector('.form');
    const inputElements = formElement.querySelectorAll('.form__input');
    inputElements.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
    })
    if (formElement.classList.contains('popup__card-content') && (!evt.target.classList.contains('popup__button'))) {
      formElement.reset();
    }
  }
}

function submitFormProfile(evt) {
  const fullName = document.querySelector('#full-name');
  const profession = document.querySelector('#profession');
  popupClosed(evt, popupProfile);
  profileName.textContent = fullName.value;
  profileProfession.textContent = profession.value;
}

export {popupOpened, popupClosed, submitFormProfile, popupProfile, profileName};
import {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, enableValidation, formElements} from './validate.js';