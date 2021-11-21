//валидация форм
const showInputError = (formElement, inputElement, errorMessage, objectForm) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objectForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectForm.errorClass);;
};

const hideInputError = (formElement, inputElement, objectForm) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objectForm.inputErrorClass);
  errorElement.classList.remove(objectForm.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, objectForm) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objectForm);
  } else {
    hideInputError(formElement, inputElement, objectForm);
  }
};

const setEventListeners = (formElement, objectForm) => {
  const inputList = Array.from(formElement.querySelectorAll(objectForm.inputSelector));
  const buttonElement = formElement.querySelector(objectForm.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, objectForm);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, objectForm);
      toggleButtonState(inputList, buttonElement, objectForm);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, objectForm) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objectForm.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(objectForm.inactiveButtonClass);
  }
}

const enableValidation = (objectForm) => {
  const formList = Array.from(document.querySelectorAll(objectForm.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, objectForm);
  })
}


export {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState, enableValidation};