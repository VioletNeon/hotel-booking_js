import { getRandom, getRandomArray, getRandomElements } from './utils.js';

const TITLES = ['куплю', 'сниму', 'обменяю', 'продам', 'отдам', 'подарю', 'заберу', 'сдам', 'арендую', 'приму'];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['просторный', 'уютный', 'чистый', 'милый', 'красочный', 'широкий', 'классический', 'стильный', 'брутальный', 'модный'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const ID_AVATAR_FROM = 1;
const ID_AVATAR_TO = 8;
const COORDINATE_X_FROM = 35.65000;
const COORDINATE_X_TO = 35.70000;
const COORDINATE_Y_FROM = 139.70000;
const COORDINATE_Y_TO = 139.80000;
const NUMBER_AFTER_POINT = 5;
const PRICE_ITEM_FROM = 0;
const PRICE_ITEM_TO = 1000;
const ROOMS_NUMBER_FROM = 1;
const ROOMS_NUMBER_TO = 5;
const GUESTS_NUMBER_FROM = 1;
const GUESTS_NUMBER_TO = 10;
const SOME_AD_COUNT = 10;

const createSomeDescriptionAd = function () {
  let author = {
    avatar: 'img/avatars/user' + '0' + getRandom(ID_AVATAR_FROM, ID_AVATAR_TO) + '.png',
  };
  let location = {
    x: getRandom(COORDINATE_X_FROM, COORDINATE_X_TO, NUMBER_AFTER_POINT),
    y: getRandom(COORDINATE_Y_FROM, COORDINATE_Y_TO, NUMBER_AFTER_POINT),
  };
  let offer = {
    title: getRandomElements(TITLES),
    address: location.x + ', ' + location.y,
    price: getRandom(PRICE_ITEM_FROM, PRICE_ITEM_TO),
    type: getRandomElements(TYPES),
    rooms: getRandom(ROOMS_NUMBER_FROM, ROOMS_NUMBER_TO),
    guests: getRandom(GUESTS_NUMBER_FROM, GUESTS_NUMBER_TO),
    checkin: getRandomElements(CHECKINS),
    checkout: getRandomElements(CHECKOUTS),
    features: getRandomArray(FEATURES),
    description: getRandomElements(DESCRIPTIONS),
    photos: getRandomArray(PHOTOS),
  };
  return {
    author,
    offer,
    location,
  }
}

const someDescriptionAd = new Array(SOME_AD_COUNT).fill(null).map(function() {return createSomeDescriptionAd()});

export { someDescriptionAd };
