const ERROR_TIME_BOX = 5000;
const MESSAGE_STYLE = 'z-index: 100; position: absolute; left: 0; top: 0; right: 0; padding: 10px 3px; font-size: 30px; text-align: center; background-color: red;';

const getRandom = (from, to, pointer = 0) => {
  [from, to, pointer] = [Math.abs(from), Math.abs(to), Math.abs(pointer)];
  if (from >= to) {
    [from, to] = [to, from];
  }
  return +(Math.random() * Math.abs(to - from) + from).toFixed(pointer);
};

const getRandomArray = (array) => {
  return array.sort(() => { return Math.random() - 0.5}).slice(0, getRandom(0, array.length))
};

const getRandomElements = (elements) => {
  return elements[getRandom(0, elements.length - 1)]
};

const showError = (message) => {
  const errorBox = document.createElement('div');
  errorBox.style.cssText = MESSAGE_STYLE;
  errorBox.textContent = message;
  document.body.append(errorBox);
  setTimeout(() => {
    errorBox.remove();
  }, ERROR_TIME_BOX);
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const debounce = (cb, timeout) => {
  let timerId
  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(cb, timeout);
  };
};

export { getRandom, getRandomArray, getRandomElements, showError, isEscEvent, debounce };
