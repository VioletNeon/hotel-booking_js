const boxAdForm = document.querySelector('.ad-form');
const boxAdFormElements = boxAdForm.children;
const boxMapFilters = document.querySelector('.map__filters');
const boxMapFiltersElements = boxMapFilters.children;

const disableElements = function (elements) {
  [...elements].forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const disableAllFormBoxes = function () {
  boxAdForm.classList.add('ad-form--disabled');
  boxMapFilters.classList.add('ad-form--disabled');
  disableElements(boxAdFormElements);
  disableElements(boxMapFiltersElements);
};

const ableElements = function (elements) {
  [...elements].forEach((element) => {
    element.removeAttribute('disabled');
  });
}

const ableAdFormBox = function () {
  boxAdForm.classList.remove('ad-form--disabled');
  ableElements(boxAdFormElements);
};

const ableMapFormBox = function () {
  boxMapFilters.classList.remove('ad-form--disabled');
  ableElements(boxMapFiltersElements);
};

export { disableAllFormBoxes, ableAdFormBox, ableMapFormBox };
