const FORM_NOTICE = document.querySelector('.ad-form');
const INPUT_PRICE = FORM_NOTICE.querySelector('#price');
const SELECT_TYPE_BUILDING = FORM_NOTICE.querySelector('#type');
const SELECT_TYPE_BUILDING_ITEMS = SELECT_TYPE_BUILDING.children;
const BUILDINGS_PRICES = {flat: 1000, bungalow: 0, house: 5000, palace: 10000};
const TIME_IN = FORM_NOTICE.querySelector('#timein');
const TIME_OUT = FORM_NOTICE.querySelector('#timeout');

for (let i = 0; i < SELECT_TYPE_BUILDING_ITEMS.length; i++) {
  for (let key in BUILDINGS_PRICES) {
    if (key === SELECT_TYPE_BUILDING_ITEMS[i].value) {
      SELECT_TYPE_BUILDING_ITEMS[i].setAttribute('data-value', BUILDINGS_PRICES[key])
    }
  }
}

const changePrice = function () {
  let indexSelectedItem = SELECT_TYPE_BUILDING.options.selectedIndex;
  INPUT_PRICE.min = SELECT_TYPE_BUILDING.options[indexSelectedItem].dataset.value;
  INPUT_PRICE.max = 1000000;
  INPUT_PRICE.placeholder = INPUT_PRICE.min;
  INPUT_PRICE.value = '';
  INPUT_PRICE.setAttribute('required', 'required');
};

const changeTimeOut = function (inTarget, outTarget) {
  return function () {
    let n = inTarget.options.selectedIndex;
    for (let i = 0; i < outTarget.options.length; i++) {
      if (inTarget.options[n].value === outTarget.options[i].value) {
        outTarget.options[i].selected = inTarget.options[n].selected;
      }
    }
  }
};

changePrice();

SELECT_TYPE_BUILDING.addEventListener('change', changePrice);
TIME_IN.addEventListener('change', changeTimeOut(TIME_IN, TIME_OUT));
TIME_OUT.addEventListener('change', changeTimeOut(TIME_OUT, TIME_IN));
