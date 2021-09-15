const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
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

function popupOpened(popupElement) {
  popupElement.classList.add('popup_opened');
}

function popupClosed(popupElement) {
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', function () {
  document.querySelector('#full-name').value = profileName.textContent;
  document.querySelector('#profession').value = profileProfession.textContent;
  popupOpened(popupProfile);
});

addButton.addEventListener('click', function () {
  popupOpened(popupCard);
});

for (let i=0; i < popupCloseButton.length; i++) {
  popupCloseButton[i].addEventListener('click', function () {
    popupClosed(popup[i]);
  });
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  const fullName = document.querySelector('#full-name');
  const profession = document.querySelector('#profession');
  popupClosed(popupProfile);
  profileName.textContent = fullName.value;
  profileProfession.textContent = profession.value;
}

profileForm.addEventListener('submit', formSubmitHandler);

//Добавление новых карточек
function formSubmitAddCard(evt) {
  evt.preventDefault();
  const title = document.querySelector('#title').value;
  const cardLink = document.querySelector('#link').value;
  if (title === '' || cardLink === '') {
    alert('Заполните все поля формы');
  } else {
    popupClosed(popupCard);
    const card = [{
      name: title,
      link: cardLink
    }];
    addElements(card);
  }
}

//Слушатель на кнопку добавления новых карточек
cardForm.addEventListener('submit', formSubmitAddCard);

//Добавление карточек при загрузке страницы
function addElements(initialCards) { 
  const userTemplate = document.querySelector("#element").content;
  const usersOnline = document.querySelector('.elements');
  initialCards.forEach(element => {
    const userElement = userTemplate.querySelector('.element').cloneNode(true);
    userElement.querySelector('.element__image').src = element.link;
    userElement.querySelector('.element__title').textContent = element.name;
    userElement.querySelector('.element__title').alt = 'Фото ' + element.name;
    userElement.querySelector('.element__icon-heart').addEventListener('click', function () {
    userElement.querySelector('.element__icon-heart').classList.toggle('element__icon-heart_active');
    });
    const deleteButton = userElement.querySelector('.element__delete');
    deleteButton.addEventListener('click', function () {
      const listItem = deleteButton.closest('.element');
      listItem.remove();
      });
    const image = userElement.querySelector('.element__image');
    image.addEventListener('click', function () {
      const popupText = document.querySelector('.popup__text');
      popupText.textContent = userElement.querySelector('.element__title').textContent;
      popupImage.src = image.src;
      popupImage.alt = image.alt;
      popupOpened(popupTypeImage);
      });
    usersOnline.prepend(userElement);
  });
};

//Инициируем функцию добавления карточек при загрузке страницы
addElements(initialCards);