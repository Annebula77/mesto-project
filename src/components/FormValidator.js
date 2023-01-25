export default class FormValidator {
  constructor(settings, formElement){
    this._settings = settings;
    this._formElement = formElement;
  }

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._settings.formSelector));

    formList.forEach(() => {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
      this._setEventListeners();
  });
  };

 _showInputError = (inputElement, errorMessage) => {
   const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(this._settings.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(this._settings.errorClass);
};

_hideInputError = (inputElement) => {
   const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
     inputElement.classList.remove(this._settings.inputErrorClass);
  errorElement.classList.remove(this._settings.errorClass);
  errorElement.textContent = '';
};

_isValid = (inputElement) => {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {
  this._showInputError(inputElement, inputElement.validationMessage);
} else {
  this._hideInputError(inputElement);
}
};

_hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};
_blockSubmitButton = (cardSubmitButton) => {
  cardSubmitButton.disabled = true;
  cardSubmitButton.classList.add(this._settings.inactiveButtonClass);
};
_toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (this._hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(this._settings.inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._settings.inactiveButtonClass);
      }
    };

       // Добавление слушателей к инпутам форм для управления состоянием кнопки
  _setEventListeners = () => {
      const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
      const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    };


  }






