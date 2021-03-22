import { setDefaultCoordinatesOfMainMarker } from './map.js';
import { isEscEvent } from './utils.js';
import { sendData } from './server-request-api.js';

const mainContainer = document.querySelector('main');
const addForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const inputAvatar = addForm.querySelector('#avatar');
const inputTitle = addForm.querySelector('#title');
const selectTypeBuilding = addForm.querySelector('#type');
const inputPrice = addForm.querySelector('#price');
const inputTimeIn = addForm.querySelector('#timein');
const inputTimeOut = addForm.querySelector('#timeout');
const selectRoomNumber = addForm.querySelector('#room_number');
const selectGuestNumber = addForm.querySelector('#capacity');
const featuresBox = addForm.querySelector('.features');
const featureElements = featuresBox.querySelectorAll('.feature__checkbox');
const inputImageField = addForm.querySelector('#images');
const descriptionBox = addForm.querySelector('#description');
const selectHouseType = mapFilters.querySelector('#housing-type');
const selectHousePrice = mapFilters.querySelector('#housing-price');
const selectHouseRooms = mapFilters.querySelector('#housing-rooms');
const selectHouseGuests = mapFilters.querySelector('#housing-guests');
const mapFeaturesBox = mapFilters.querySelector('#housing-features');
const mapFeaturesElements = mapFeaturesBox.querySelectorAll('.map__checkbox');

// Default value for select and input of filters
const DEFAULT_TYPE_BUILDING = 'flat';
const DEFAULT_BUILDING_PRICE = '1000';
const DEFAULT_TIME_IN = '12:00';
const DEFAULT_TIME_OUT = '12:00';
const DEFAULT_ROOM_NUMBER = '1';
const DEFAULT_GUEST_NUMBER = '1';
const DEFAULT_ITEM_SELECT_MAP_FILTER = 'any';

// Set submit listener and call request
const setUserFormSubmit = function () {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(clearForm, showMessage, new FormData(evt.target));
  });
};

// Show message and set keyboard and click listeners for close message
const showMessage = function (template) {
  const alertMessage = template.cloneNode(true);
  mainContainer.appendChild(alertMessage);
  setAlertMessageListener();
};

// Check keyboard event and close message
const onPopupEscKeydown = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeAlertMessage();
  }
};

// Clear form ane set default value
const clearForm = function () {
  setDefaultCoordinatesOfMainMarker();
  inputAvatar.value = '';
  inputTitle.value = '';
  selectTypeBuilding.value = DEFAULT_TYPE_BUILDING;
  inputPrice.value = '';
  inputPrice.min = DEFAULT_BUILDING_PRICE;
  inputPrice.placeholder = DEFAULT_BUILDING_PRICE;
  inputTimeIn.value = DEFAULT_TIME_IN;
  inputTimeOut.value = DEFAULT_TIME_OUT;
  selectRoomNumber.value = DEFAULT_ROOM_NUMBER;
  selectGuestNumber.value = DEFAULT_GUEST_NUMBER;
  featureElements.forEach((item) => {
    item.checked = false;
  });
  descriptionBox.value = '';
  inputImageField.value = '';
  selectHouseType.value = DEFAULT_ITEM_SELECT_MAP_FILTER;
  selectHousePrice.value = DEFAULT_ITEM_SELECT_MAP_FILTER;
  selectHouseRooms.value = DEFAULT_ITEM_SELECT_MAP_FILTER;
  selectHouseGuests.value = DEFAULT_ITEM_SELECT_MAP_FILTER;
  mapFeaturesElements.forEach((item) => {
    item.checked = false;
  });
};

// Set listeners on alert message block
const setAlertMessageListener = function () {
  const errorButton = document.querySelector('.error__button');
  if (errorButton) {
    errorButton.addEventListener('click', () => {
      closeAlertMessage();
    });
  }
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.addEventListener('click', checkClickForRemoveMessage);
};

// Close alert message and remove listeners
const closeAlertMessage = function () {
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

const checkClickForRemoveMessage = function (evt) {
  if (evt.target.className !== 'error__message' || evt.target.className !== 'success__message') {
    closeAlertMessage();
  }
};

// Set click listener on reset button forms
const setResetButton = function () {
  const resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearForm();
  });
}

export { setUserFormSubmit, showMessage, setResetButton };
