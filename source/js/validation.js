const inputTitle = document.querySelector('#title');
const inputPriceValue = document.querySelector('#price');
const minTitleLength = inputTitle.getAttribute('minlength');
const maxTitleLength = inputTitle.getAttribute('maxlength');

inputTitle.addEventListener('input', () => {
  const valueLength = inputTitle.value.length;

  if (valueLength < minTitleLength) {
    inputTitle.setCustomValidity('Не хватает ещё ' + (minTitleLength - valueLength) +' симв.');
  } else if (valueLength > maxTitleLength) {
    inputTitle.setCustomValidity('Внесено ' + (valueLength - maxTitleLength) +' лишних симв.');
  } else {
    inputTitle.setCustomValidity('');
  }

  inputTitle.reportValidity();
});

inputPriceValue.addEventListener('input', () => {
  const minInputPrice = inputPriceValue.min;
  const maxInputPrice = inputPriceValue.max;

  if (inputPriceValue.validity.rangeUnderflow) {
    inputPriceValue.setCustomValidity('Укажите цену не ниже ' + minInputPrice);
  } else if (inputPriceValue.validity.rangeOverflow) {
    inputPriceValue.setCustomValidity('Цена должна быть не более ' + maxInputPrice);
  } else {
    inputPriceValue.setCustomValidity('');
  }

  inputPriceValue.reportValidity();
});
