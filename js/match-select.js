const formNotice = document.querySelector('.ad-form');
const inputPrice = formNotice.querySelector('#price');
const selectTypeBuilding = formNotice.querySelector('#type');
const buildingPrices = {flat: 1000, bungalow: 0, house: 5000, palace: 10000};
const timeIn = formNotice.querySelector('#timein');
const timeOut = formNotice.querySelector('#timeout');
const selectRoom = formNotice.querySelector('#room_number');
const selectGuest = formNotice.querySelector('#capacity');

const changePrice = function () {
  inputPrice.min = buildingPrices[selectTypeBuilding.value];
  inputPrice.placeholder = inputPrice.min;
  inputPrice.value = '';
};

const changeTimeOut = function (inTarget, outTarget) {
  return function () {
    let n = inTarget.options.selectedIndex;
    outTarget.options[n].selected = inTarget.options[n].selected;
  }
};

changePrice();

selectTypeBuilding.addEventListener('change', changePrice);
timeIn.addEventListener('change', changeTimeOut(timeIn, timeOut));
timeOut.addEventListener('change', changeTimeOut(timeOut, timeIn));

const checkMatch = function () {
  if (+selectRoom.value === 100 && +selectGuest.value !== 0) {
    selectGuest.setCustomValidity('Только не для гостей');
  } else if (+selectGuest.value === 0 && +selectRoom.value !== 100) {
    selectGuest.setCustomValidity('Только для гостей');
  } else if (+selectRoom.value !== 100 && +selectRoom.value < +selectGuest.value) {
    selectGuest.setCustomValidity(`Укажите не более ${selectRoom.value} гостей`);
  } else {
    selectGuest.setCustomValidity('');
  }
  selectGuest.reportValidity();
};

selectRoom.addEventListener('change', checkMatch);
selectGuest.addEventListener('change', checkMatch);
