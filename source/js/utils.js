const ERROR_TIME_BOX = 5000;
const MESSAGE_STYLE = 'z-index: 100; position: absolute; left: 0; top: 0; right: 0; padding: 10px 3px; font-size: 30px; text-align: center; background-color: red;';

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

export { showError, isEscEvent, debounce };
