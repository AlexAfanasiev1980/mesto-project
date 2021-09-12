const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popup = document.querySelectorAll('.popup');
const profileForm = document.querySelector('.popup__admin');
const cardForm = document.querySelector('.popup__card-content');
const profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 


editButton.addEventListener('click', function () {
  document.querySelector('#full-name').value = profileName.textContent;
  document.querySelector('#profession').value = profileProfession.textContent;
  popupProfile.classList.add('popup_opened');
});

addButton.addEventListener('click', function () {
  popupCard.classList.add('popup_opened');
});

for (let i=0; i < popupCloseButton.length; i++) {
  popupCloseButton[i].addEventListener('click', function () {
    popup[i].classList.remove('popup_opened');
  });
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  const fullName = document.querySelector('#full-name');
  const profession = document.querySelector('#profession');
  popupProfile.classList.remove('popup_opened');
  profileName.textContent = fullName.value;
  profileProfession.textContent = profession.value;
}

profileForm.addEventListener('submit', formSubmitHandler);

function formSubmitAddCard(evt) {
  evt.preventDefault();
  const title = document.querySelector('#title').value;
  const cardLink = document.querySelector('#link').value;
  popupCard.classList.remove('popup_opened');
  const card = [{
   name: title,
   link: cardLink
  }];
  addElements(card);
}

cardForm.addEventListener('submit', formSubmitAddCard);

function addElements(initialCards) {
  const userTemplate = document.querySelector("#element").content;
  const usersOnline = document.querySelector('.elements');
  for (let i=0; i<initialCards.length; i++) {
    const userElement = userTemplate.querySelector('.element').cloneNode(true);
    userElement.querySelector('.element__image').src = initialCards[i].link;
    userElement.querySelector('.element__title').textContent = initialCards[i].name;
    userElement.querySelector('.element__title').alt = 'Фото ' + initialCards[i].name;
    userElement.querySelector('.element__icon-heart').addEventListener('click', function () {
    userElement.querySelector('.element__icon-heart').classList.toggle('element__icon-heart_active');
    });
    const deleteButton = userElement.querySelector('.element__delete');
    deleteButton.addEventListener('click', function () {
      const listItem = deleteButton.closest('.element');
      listItem.remove();
      });
    usersOnline.prepend(userElement);
  }
};

addElements(initialCards);