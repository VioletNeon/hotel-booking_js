const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const getData = function (onSuccess, onFail) {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((cards) => {
      onSuccess(cards);
    }).catch(() => {
      onFail('Не удалось получить данные с сервера. Попробуйте ещё раз');
    });
};

const sendData = (onSuccess, callMessage, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        callMessage(successMessageTemplate);
      } else {
        callMessage(errorMessageTemplate);
      }
    })
    .catch(() => {
      callMessage(errorMessageTemplate);
    });
};

export { getData, sendData }
