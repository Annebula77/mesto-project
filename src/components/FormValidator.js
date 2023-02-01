export default class FormValidator {
  constructor(settings, formElement){
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  enableValidation = () => {
     this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
      this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState(); //<== управляем кнопкой ==
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) //<==очищаем ошибки ==
    });
  }

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
  inputElement.setCustomValidity('');
}

if (!inputElement.validity.valid) {
  this._showInputError(inputElement, inputElement.validationMessage);
} else {
  this._hideInputError(inputElement);
}
};

_hasInvalidInput = () => {
  // проходим по этому массиву методом some
  return this._inputList.some((inputElement) => {
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
_toggleButtonState = () => {
  // Если есть хотя бы один невалидный инпут
  if (this._hasInvalidInput(this._inputList)) {
    // сделай кнопку неактивной
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      }
    };

       // Добавление слушателей к инпутам форм для управления состоянием кнопки
  _setEventListeners = () => {
       this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement);
          this._toggleButtonState(this._inputList, this._buttonElement);
        });
      });
    };
 }






