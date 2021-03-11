const formNotice = document.querySelector('.ad-form');
const inputPrice = formNotice.querySelector('#price');
const selectTypeBuilding = formNotice.querySelector('#type');
const buildingPrices = {flat: 1000, bungalow: 0, house: 5000, palace: 10000};
const timeIn = formNotice.querySelector('#timein');
const timeOut = formNotice.querySelector('#timeout');

const changePrice = function () {
  inputPrice.min = buildingPrices[selectTypeBuilding.value];
  inputPrice.placeholder = inputPrice.min;
  inputPrice.value = '';
  inputPrice.setAttribute('required', 'required');
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
