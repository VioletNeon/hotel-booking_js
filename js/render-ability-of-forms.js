const boxAdForm = document.querySelector('.ad-form');
const boxAdFormElements = boxAdForm.children;
const boxMapFilters = document.querySelector('.map__filters');
const boxMapFiltersElements = boxMapFilters.children;

const getDisabledElements = function (elements) {
  [...elements].forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const getDisabledAllFormBoxes = function () {
  boxAdForm.classList.add('ad-form--disabled');
  boxMapFilters.classList.add('ad-form--disabled');
  getDisabledElements(boxAdFormElements);
  getDisabledElements(boxMapFiltersElements);
};

const getAbleElements = function (elements) {
  [...elements].forEach((element) => {
    element.removeAttribute('disabled');
  });
}

const getAbleAdFormBox = function () {
  boxAdForm.classList.remove('ad-form--disabled');
  getAbleElements(boxAdFormElements);
};

const getAbleMapFormBox = function () {
  boxMapFilters.classList.remove('ad-form--disabled');
  getAbleElements(boxMapFiltersElements);
};

export { getDisabledAllFormBoxes, getAbleAdFormBox, getAbleMapFormBox };
