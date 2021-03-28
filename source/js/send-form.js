import { setDefaultCoordinatesOfMainMarker, renderUsualMarkers, loadCards } from './map.js';
import { isEscEvent } from './utils.js';
import { sendData } from './server-request-api.js';

const mainContainer = document.querySelector('main');
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const inputPrice = adForm.querySelector('#price');
const previewField = document.querySelector('.ad-form-header__preview img');
const previewAvatarField = document.querySelector('.ad-form__photo');
const resetButton = document.querySelector('.ad-form__reset');

const DEFAULT_BUILDING_PRICE = '1000';
const MESSAGE_INDEX_LAYER = 'z-index: 1000';

// Set submit listener and call request
const onAdFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(() => { clearForm();
      loadCards()
    }, showMessage, new FormData(evt.target));
  });
};

// Show message and set keyboard and click listeners for close message
const showMessage = (template) => {
  const alertMessage = template.cloneNode(true);
  alertMessage.style.cssText = MESSAGE_INDEX_LAYER;
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
  adForm.reset();
  inputPrice.placeholder = DEFAULT_BUILDING_PRICE;
  previewField.src = './img/muffin-grey.svg';
  previewAvatarField.innerHTML = '';
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
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearForm();
    renderUsualMarkers(cards);
  });
};

export { onAdFormSubmit, showMessage, onResetButtonClick };
