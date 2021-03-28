const formNotice = document.querySelector('.ad-form');
const inputPrice = formNotice.querySelector('#price');
const selectTypeBuilding = formNotice.querySelector('#type');
const buildingPrices = {flat: 1000, bungalow: 0, house: 5000, palace: 10000};
const timeIn = formNotice.querySelector('#timein');
const timeOut = formNotice.querySelector('#timeout');
const selectRoom = formNotice.querySelector('#room_number');
const selectGuest = formNotice.querySelector('#capacity');
const RoomsMap = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const changePrice = () => {
  inputPrice.min = buildingPrices[selectTypeBuilding.value];
  inputPrice.placeholder = inputPrice.min;
  inputPrice.value = '';
};

const changeTimeOut = (inTarget, outTarget) => {
  return () => {
    let n = inTarget.options.selectedIndex;
    outTarget.options[n].selected = inTarget.options[n].selected;
  }
};

changePrice();

selectTypeBuilding.addEventListener('change', changePrice);
timeIn.addEventListener('change', changeTimeOut(timeIn, timeOut));
timeOut.addEventListener('change', changeTimeOut(timeOut, timeIn));

const checkMatch = () => {
  const room = +selectRoom.value;
  const guest = +selectGuest.value;
  if (!RoomsMap[room].includes(guest)) {
    selectGuest.setCustomValidity('Выберите другое количество гостей');
  } else {
    selectGuest.setCustomValidity('');
  }
  selectGuest.reportValidity();
};

selectRoom.addEventListener('change', checkMatch);
selectGuest.addEventListener('change', checkMatch);
