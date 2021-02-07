const getFractionalNumber = function(from, to, pointer = 0) {
  [from, to, pointer] = [Math.abs(from), Math.abs(to), Math.abs(pointer)];
  if (from >= to) {
    [from, to] = [to, from];
  }
  return +(Math.random() * Math.abs(to - from) + from).toFixed(pointer);
};

const TITLE = ['куплю', 'сниму', 'обменяю', 'продам', 'отдам', 'подарю', 'заберу', 'сдам', 'арендую', 'приму'];
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = ['просторный', 'уютный', 'чистый', 'милый', 'красочный', 'широкий', 'классический', 'стильный', 'брутальный', 'модный'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const createSomeArray = (array) => {
  let ARRAY = array.filter((item) => {
    if (getFractionalNumber(0, 1) === 1) {
      return item
    }
  });
  if (ARRAY.length === 0) {
    ARRAY = createSomeArray(array)
  }
  return ARRAY
}

const SOME_AD_COUNT = 10;

const getRandomElements = function (elements) {
  return elements[getFractionalNumber(0, elements.length - 1)]
}

const createSomeDescriptionAd = () => {
  const author = {
    avatar: 'img/avatars/user' + '0' + getFractionalNumber(1, 8) + '.png',
  };
  const location = {
    x: getFractionalNumber(35.65000, 35.70000, 5),
    y: getFractionalNumber(139.70000, 139.80000, 5),
  };
  const offer = {
    title: getRandomElements(TITLE),
    address: location.x + ', ' + location.y,
    price: getFractionalNumber(0, 1000),
    type: getRandomElements(TYPE),
    rooms: getFractionalNumber(1, 5),
    guests: getFractionalNumber(1, 10),
    checkin: getRandomElements(CHECKIN),
    checkout: getRandomElements(CHECKOUT),
    features: createSomeArray(FEATURES),
    description: getRandomElements(DESCRIPTION),
    photos: createSomeArray(PHOTOS),
  };
  return {
    author,
    offer,
    location,
  }
}

const someDescriptionAd = new Array(SOME_AD_COUNT).fill(null).map(() => createSomeDescriptionAd());

alert(someDescriptionAd);
