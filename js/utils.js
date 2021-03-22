const ERROR_TIME_BOX = 5000;

const getRandom = function (from, to, pointer = 0) {
  [from, to, pointer] = [Math.abs(from), Math.abs(to), Math.abs(pointer)];
  if (from >= to) {
    [from, to] = [to, from];
  }
  return +(Math.random() * Math.abs(to - from) + from).toFixed(pointer);
};

const getRandomArray = function (array) {
  return array.sort(function() {return Math.random() - 0.5}).slice(0, getRandom(0, array.length))
};

const getRandomElements = function (elements) {
  return elements[getRandom(0, elements.length - 1)]
};

const showError = (message) => {
  const errorBox = document.createElement('div');
  errorBox.style.zIndex = 100;
  errorBox.style.position = 'absolute';
  errorBox.style.left = 0;
  errorBox.style.top = 0;
  errorBox.style.right = 0;
  errorBox.style.padding = '10px 3px';
  errorBox.style.fontSize = '30px';
  errorBox.style.textAlign = 'center';
  errorBox.style.backgroundColor = 'red';

  errorBox.textContent = message;

  document.body.append(errorBox);

  setTimeout(() => {
    errorBox.remove();
  }, ERROR_TIME_BOX);
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export { getRandom, getRandomArray, getRandomElements, showError, isEscEvent };
