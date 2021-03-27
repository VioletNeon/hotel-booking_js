import { setDefaultCoordinatesOfMainMarker, renderUsualMarkers } from './map.js';
import { isEscEvent } from './utils.js';
import { sendData } from './server-request-api.js';

const mainContainer = document.querySelector('main');
const addForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const inputPrice = addForm.querySelector('#price');

const DEFAULT_BUILDING_PRICE = '1000';

// Set submit listener and call request
const onAddFormSubmit = () => {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(clearForm, showMessage, new FormData(evt.target));
  });
};

// Show message and set keyboard and click listeners for close message
const showMessage = (template) => {
  const alertMessage = template.cloneNode(true);
  mainContainer.appendChild(alertMessage);
  onAlertMessageKeydownClick();
};

// Check keyboard event and close message
const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeOnAlertMessageKeydownClick();
  }
};

// Clear form ane set default value
const clearForm = () => {
  mapFilters.reset();
  addForm.reset();
  inputPrice.placeholder = DEFAULT_BUILDING_PRICE;
  setDefaultCoordinatesOfMainMarker();
};

// Set listeners on alert message block
const onAlertMessageKeydownClick = () => {
  const errorButton = document.querySelector('.error__button');
  if (errorButton) {
    errorButton.addEventListener('click', removeOnAlertMessageKeydownClick);
  }
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.addEventListener('click', checkClickForRemoveMessage);
};

// Close alert message and remove listeners
const removeOnAlertMessageKeydownClick = () => {
  const boxMessageError = document.querySelector('.error');
  const boxMessageSuccess = document.querySelector('.success');
  if (boxMessageError) {
    boxMessageError.remove();
  } else if (boxMessageSuccess) {
    boxMessageSuccess.remove();
  }
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.body.removeEventListener('click', checkClickForRemoveMessage);
};

const checkClickForRemoveMessage = (evt) => {
  if (evt.target.className !== 'error__message' || evt.target.className !== 'success__message') {
    removeOnAlertMessageKeydownClick();
  }
};

// Set click listener on reset button forms
const onResetButtonClick = (cards) => {
  const resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearForm();
    renderUsualMarkers(cards);
  });
};

export { onAddFormSubmit, showMessage, onResetButtonClick };
