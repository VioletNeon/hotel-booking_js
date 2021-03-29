const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const SIMILAR_CARDS_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const AD_CARD_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(SIMILAR_CARDS_URL)
    .then((response) => response.json())
    .then((cards) => {
      onSuccess(cards);
    }).catch(() => {
      onFail('Не удалось получить данные с сервера. Попробуйте ещё раз');
    });
};

const sendData = (onSuccess, callMessage, body) => {
  fetch(
    AD_CARD_URL,
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
