const boxAdForm = document.querySelector('.ad-form');
const boxAdFormElements = boxAdForm.children;
const boxMapFilters = document.querySelector('.map__filters');
const boxMapFiltersElements = boxMapFilters.children;

const disableElements = (elements) => {
  [...elements].forEach((element) => {
    element.disabled = true;
  });
};

const disableAllFormBoxes = () => {
  boxAdForm.classList.add('ad-form--disabled');
  boxMapFilters.classList.add('ad-form--disabled');
  disableElements(boxAdFormElements);
  disableElements(boxMapFiltersElements);
};

const enableElements = (elements) => {
  [...elements].forEach((element) => {
    element.disabled = false;
  });
};

const enableAdFormBox = () => {
  boxAdForm.classList.remove('ad-form--disabled');
  enableElements(boxAdFormElements);
};

const enableMapFormBox = () => {
  boxMapFilters.classList.remove('ad-form--disabled');
  enableElements(boxMapFiltersElements);
};

export { disableAllFormBoxes, enableAdFormBox, enableMapFormBox };
