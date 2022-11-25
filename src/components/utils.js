import { profileName, profileJob, nameInput, jobInput, closePopup, profilePopup, openPopup, cardAddPopup, addButtonOpen, formElement } from './modal.js'
   //передача данных в профиль
   export function changeProfileData (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
    profileData.name = nameInput.value;
    profileData.occupation = jobInput.value;
    };

    // обработчик кнопки в форме изменения профиля
    formElement.addEventListener('submit', changeProfileData);

addButtonOpen.addEventListener('click', function () {
  openPopup(cardAddPopup);
});
