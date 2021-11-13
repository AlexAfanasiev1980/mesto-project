const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popups = document.querySelectorAll('.popup');
const profileForm = document.querySelector('.popup__admin');
const cardForm = document.querySelector('.popup__card-content');
const profileName = document.querySelector('.profile__name');
const usersOnline = document.querySelector('.elements');
const formElements = document.querySelectorAll('.form');
let profileProfession = document.querySelector('.profile__profession');

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
    if (formElement.classList.contains('popup__card-content')) {
      formElement.reset();
    }
  }
}

editButton.addEventListener('click', function () {
  document.querySelector('#full-name').value = profileName.textContent;
  document.querySelector('#profession').value = profileProfession.textContent;
  popupOpened(popupProfile);
});

addButton.addEventListener('click', () => popupOpened(popupCard));

avatarButton.addEventListener('click', () => popupOpened(popupAvatar));

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => popupClosed(evt, popup));
  document.addEventListener('keydown', (evt) => popupClosed(evt, popup));
});

function submitFormProfile(evt) {
  const fullName = document.querySelector('#full-name');
  const profession = document.querySelector('#profession');
  popupClosed(evt, popupProfile);
  profileName.textContent = fullName.value;
  profileProfession.textContent = profession.value;
}

profileForm.addEventListener('submit', submitFormProfile);

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
    addCard(card);
    cardForm.reset();
  }
}

//Слушатель на кнопку добавления новых карточек
cardForm.addEventListener('submit', submitFormAddCard);

//Функция создания карточки
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

//Инициируем функцию добавления карточек при загрузке страницы
initialCards.forEach(cardData => {
  const newCard = createCard(cardData);
  usersOnline.prepend(newCard)
})

//валидация форм
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.classList.remove('popup__button_inactive');
  }
}

const enableValidation = () => {
  const formList = Array.from(formElements);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}

enableValidation();